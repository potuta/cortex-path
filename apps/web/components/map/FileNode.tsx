'use client';

import { Handle, Position, NodeProps } from 'reactflow';

export type FileNodeData = {
  label: string;
  path: string;
  summary: string | null;
  isBlastRadius?: boolean;
};

export function FileNode({ data, selected }: NodeProps<FileNodeData>) {
  const isHit = data.isBlastRadius;
  const isSelected = selected;

  return (
    <div
      className={`
        w-52 rounded border px-3 py-2 font-mono text-xs transition-colors
        ${isHit
          ? 'border-red-500 bg-red-950/80 text-red-200 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
          : isSelected
            ? 'border-cx-accent bg-cx-card-raised text-foreground'
            : 'border-cx-card-border bg-cx-card text-cx-text-2'
        }
      `}
    >
      <Handle type="target" position={Position.Top} className="bg-cx-card-raised! border-cx-accent-border!" />
      <div className={`truncate font-semibold ${isHit ? 'text-red-100' : 'text-foreground'}`}>
        {data.label}
      </div>
      {data.summary ? (
        <div className={`mt-1 line-clamp-2 leading-relaxed ${isHit ? 'text-red-300' : 'text-cx-text-3'}`}>
          {data.summary}
        </div>
      ) : (
        <div className="mt-1 text-cx-text-3 italic">no summary yet</div>
      )}
      <Handle type="source" position={Position.Bottom} className="bg-cx-card-raised! border-cx-accent-border!" />
    </div>
  );
}
