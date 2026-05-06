'use client';

import { CortexIcon } from './CortexIcon';
import type { ChatMessage as ChatMessageType } from '@/hooks/useChatSessions';

export function ChatMessage({ role, content }: ChatMessageType) {
  const isUser = role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-foreground px-3.5 py-2.5 text-xs leading-relaxed text-background">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cx-accent-bg text-cx-accent ring-1 ring-cx-accent-border">
        <CortexIcon size={11} />
      </div>
      <div className="min-w-0 flex-1 text-xs leading-relaxed text-cx-text-2">
        {content ? (
          <span className="whitespace-pre-wrap wrap-break-word">{content}</span>
        ) : (
          <span className="animate-pulse text-cx-accent">▊</span>
        )}
      </div>
    </div>
  );
}
