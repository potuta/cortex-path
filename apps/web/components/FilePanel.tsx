'use client';

import { useState } from 'react';
import { FileCode, Play } from 'lucide-react';

type FilePanelProps = {
  onInterpret: (fileName: string, code: string) => void;
  isLoading: boolean;
};

export function FilePanel({ onInterpret, isLoading }: FilePanelProps) {
  const [fileName, setFileName] = useState('');
  const [code, setCode] = useState('');

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2 border-b border-cx-card-border pb-3">
        <FileCode size={13} className="text-cx-text-3" />
        <input
          value={fileName}
          onChange={e => setFileName(e.target.value)}
          placeholder="filename.ts"
          className="flex-1 bg-transparent font-mono text-xs text-foreground outline-none placeholder:text-cx-text-3"
        />
      </div>

      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder={`// paste your code here...\nexport function example() {\n  // ...\n}`}
        spellCheck={false}
        className="flex-1 resize-none bg-transparent font-mono text-xs leading-relaxed text-cx-text-2 outline-none placeholder:text-cx-text-3"
      />

      <button
        onClick={() => onInterpret(fileName || 'untitled.ts', code)}
        disabled={isLoading || !code.trim()}
        className="flex items-center justify-center gap-2 rounded border border-cx-card-border bg-cx-card-raised px-4 py-2 font-mono text-xs text-cx-text-2 transition-colors hover:border-cx-accent-border hover:bg-cx-card-raised hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Play size={11} />
        {isLoading ? 'interpreting...' : 'interpret logic'}
      </button>
    </div>
  );
}
