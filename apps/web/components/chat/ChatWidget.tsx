'use client';

import { useState } from 'react';
import { CortexIcon } from './CortexIcon';
import { ChatPanel } from './ChatPanel';
import { useChatSessions } from '@/hooks/useChatSessions';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    sessions,
    activeId,
    activeSession,
    isLoading,
    send,
    newSession,
    switchSession,
    deleteSession,
  } = useChatSessions();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <ChatPanel
          sessions={sessions}
          activeId={activeId}
          activeSession={activeSession}
          isLoading={isLoading}
          onSend={send}
          onNewSession={newSession}
          onSwitchSession={switchSession}
          onDeleteSession={deleteSession}
          onClose={() => setIsOpen(false)}
        />
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close Cortex' : 'Open Cortex'}
        title="Cortex — AI assistant"
        className={`group relative flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-all duration-200 ${
          isOpen
            ? 'border-cx-accent bg-cx-card text-cx-accent shadow-cx-accent/20'
            : 'border-cx-card-border bg-cx-card text-cx-text-2 hover:border-cx-accent-border hover:text-cx-accent hover:shadow-cx-accent/10'
        }`}
      >
        <CortexIcon size={20} />
        {/* Pulse ring when panel is closed and there are existing messages */}
        {!isOpen && sessions.some(s => s.messages.length > 0) && (
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-cx-accent ring-2 ring-cx-card" />
        )}
      </button>
    </div>
  );
}
