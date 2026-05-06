import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { type ModelName } from '@/lib/ai/groq';

const LS_PREFIX = 'cortex:interp:';

function lsKey(filePath: string, model: string) {
  return `${LS_PREFIX}${model}:${filePath}`;
}

export function useInterpret() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelName>('qwen/qwen3-32b');
  const [rateLimitInfo, setRateLimitInfo] = useState<{ status: 'safe' | 'verge' | 'denied', message?: string } | null>(null);
  const queryClient = useQueryClient();

  const interpret = useCallback(async (
    fileName: string,
    codeSnippet: string,
    filePath: string,
    savedLogicSummary?: string | null,
    model: ModelName = selectedModel,
  ) => {
    if (!filePath && !codeSnippet.trim()) return;

    const cacheKey = ['interpretation', model, filePath];

    // 1. React Query in-memory cache
    const cached = queryClient.getQueryData<string>(cacheKey);
    if (cached) {
      setSummary(cached);
      return;
    }

    // 2. localStorage
    try {
      const stored = localStorage.getItem(lsKey(filePath, model));
      if (stored) {
        setSummary(stored);
        queryClient.setQueryData(cacheKey, stored);
        return;
      }
    } catch { /* ignore */ }

    // 3. DB-persisted logicSummary (only if model matches primary default)
    if (savedLogicSummary && model === 'qwen/qwen3-32b') {
      setSummary(savedLogicSummary);
      queryClient.setQueryData(cacheKey, savedLogicSummary);
      try { localStorage.setItem(lsKey(filePath, model), savedLogicSummary); } catch { /* ignore */ }
      return;
    }

    setIsLoading(true);
    setSummary('');
    setRateLimitInfo(null);

    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, filePath, codeSnippet, model }),
      });

      if (res.status === 429) {
        const data = await res.json();
        // Auto-fallback if the primary model is denied
        if (model === 'qwen/qwen3-32b') {
          console.warn("[useInterpret] Qwen limit hit, falling back to Llama.");
          interpret(fileName, codeSnippet, filePath, savedLogicSummary, 'llama-3.3-70b-versatile');
          return;
        }
        setRateLimitInfo({ status: 'denied', message: data.error });
        return;
      }

      if (!res.ok || !res.body) return;

      const status = res.headers.get('X-Usage-Status') as 'safe' | 'verge' | 'denied';
      if (status) {
        setRateLimitInfo({ status });
        // If we are on the verge, we might want to suggest a switch or auto-switch next time
        if (status === 'verge' && model === 'qwen/qwen3-32b') {
          console.warn("[useInterpret] Qwen nearing limit.");
        }
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        full += chunk;
        setSummary(full);
      }

      if (full) {
        queryClient.setQueryData(cacheKey, full);
        try { localStorage.setItem(lsKey(filePath, model), full); } catch { /* ignore */ }

        if (model === 'qwen/qwen3-32b') {
          fetch('/api/files', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: filePath, interpretation: full }),
          }).catch(() => {});
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [queryClient, selectedModel]);

  const reset = useCallback(() => {
    setSummary('');
    setIsLoading(false);
    setRateLimitInfo(null);
  }, []);

  return { summary, isLoading, interpret, reset, selectedModel, setSelectedModel, rateLimitInfo };
}
