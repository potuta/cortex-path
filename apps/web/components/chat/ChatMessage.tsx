'use client';

import type { ChatMessage as ChatMessageType } from '@/hooks/useAIChat';

export function ChatMessage({ role, content }: ChatMessageType) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded px-3 py-2 font-mono text-xs leading-relaxed ${
          isUser
            ? 'bg-cx-card-raised text-foreground'
            : 'border border-cx-card-border bg-cx-card text-cx-text-2'
        }`}
      >
        {!isUser && (
          <span className="mb-1 block text-[10px] text-cx-text-3">cortex://</span>
        )}
        {content || <span className="animate-pulse text-cx-text-3">▊</span>}
      </div>
    </div>
  );
}
