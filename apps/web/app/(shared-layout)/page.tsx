'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Map } from 'lucide-react';
import { FolderIngestor } from '@/components/FolderIngestor';
import { LogicCard } from '@/components/LogicCard';
import { useIngestor } from '@/hooks/useIngestor';
import { extractImportsFromCode } from '@/lib/context/golden-prompt';

export default function Home() {
  const { status, progress, results, currentFile, selectFolder, reset } = useIngestor();
  const [activeFile, setActiveFile] = useState('');
  const [activeSummary, setActiveSummary] = useState('');
  const [activeCode, setActiveCode] = useState('');
  const [activeImports, setActiveImports] = useState<string[]>([]);

  useEffect(() => {
    if (results.length > 0) {
      const last = results[results.length - 1];
      setActiveFile(last.name);
      setActiveSummary(last.summary ?? '');
      setActiveImports(extractImportsFromCode(activeCode));
    }
  }, [results.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex h-screen flex-col bg-[#09090b] text-zinc-100">
      <header className="flex items-center gap-3 border-b border-zinc-800/70 px-6 py-2">
        <Image
          src="/cortexpath_logo.png"
          alt="CortexPath"
          width={130}
          height={40}
          className="h-8 w-auto rounded"
          priority
        />
        <span className="font-mono text-xs text-zinc-600">/ ingester</span>
        <nav className="ml-auto flex items-center gap-4">
          <Link
            href="/map"
            className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 transition-colors hover:text-teal-400"
          >
            <Map size={11} />
            architecture map
          </Link>
        </nav>
      </header>

      <main className="flex flex-1 divide-x divide-zinc-800/70 overflow-hidden">
        <section className="flex w-1/2 flex-col p-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-teal-700/80">
            project
          </p>
          <FolderIngestor
            status={status}
            progress={progress}
            results={results}
            currentFile={currentFile}
            onSelect={selectFolder}
            onReset={reset}
          />
        </section>

        <section className="flex w-1/2 flex-col p-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-teal-700/80">
            logic summary
          </p>
          <LogicCard
            fileName={activeFile}
            summary={activeSummary}
            isLoading={status === 'processing'}
            code={activeCode}
            imports={activeImports}
          />
        </section>
      </main>
    </div>
  );
}
