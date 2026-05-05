"use client";

import { Handle, Position } from "@xyflow/react";
import { Folder, File, ChevronDown, ChevronRight } from "lucide-react";

type FileNodeProps = {
  id: string;
  data: {
    name: string;
    summary?: string;
    open?: boolean;
    toggle?: (id: string) => void;
  };
};

const isFile = (name: string) =>
  /\.[a-z]+$/i.test(name);

export default function FileNode({ id, data }: FileNodeProps) {

  const file = isFile(data.name);
  const folder = !file;

  return (
    <div
      onClick={(e) => {
        // e.stopPropagation();
        data.toggle?.(id);
      }}
      className="relative rounded-2xl border border-cx-card-border bg-cx-card p-4 w-64 shadow-lg cursor-pointer wrap-break-word"
    >
      <Handle type="target" position={Position.Top} />

      {/* header */}
      <div className="flex items-start gap-2 text-foreground font-semibold wrap-break-word">

        {folder ? (
          <Folder size={16} className="text-yellow-400 mt-0.5 shrink-0" />
        ) : (
          <File size={16} className="text-blue-400 mt-0.5 shrink-0" />
        )}

        {/* name */}
        <div className="flex-1 min-w-0">
          <div className="wrap-break-word whitespace-normal">
            {data.name}
          </div>
        </div>

        <div className="text-cx-text-3 mt-0.5 shrink-0">
            {data.open ? (
                <ChevronDown size={16} />
            ) : (
                <ChevronRight size={16} />
            )}
        </div>
      </div>

      {/* summary */}
      {data.open && data.summary && (
        <div className="text-sm text-cx-text-3 mt-2 wrap-break-word">
          {data.summary}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}