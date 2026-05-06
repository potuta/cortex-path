'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ShieldCheck, X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'warning' | 'confirmation';
}

export function ProjectModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Allow',
  cancelLabel = "Don't Allow",
  type = 'confirmation'
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[60] w-full max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-cx-card-border bg-cx-card p-6 shadow-2xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
                type === 'warning' ? 'bg-red-500/10 text-red-500' : 'bg-cx-accent/10 text-cx-accent'
              }`}>
                {type === 'warning' ? <AlertTriangle size={24} /> : <ShieldCheck size={24} />}
              </div>
              
              <h3 className="mb-2 font-mono text-lg font-bold text-foreground">
                {title}
              </h3>
              
              <p className="mb-8 font-mono text-sm leading-relaxed text-cx-text-3">
                {description}
              </p>

              <div className="flex w-full gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-xl border border-cx-card-border bg-cx-card-raised px-4 py-3 font-mono text-sm font-semibold text-cx-text-2 transition-all hover:bg-cx-card-border hover:text-foreground"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 rounded-xl px-4 py-3 font-mono text-sm font-bold text-black transition-all hover:opacity-90 ${
                    type === 'warning' ? 'bg-red-500' : 'bg-cx-accent'
                  }`}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-cx-text-3 transition-colors hover:text-foreground"
            >
              <X size={18} />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, siteName }: { isOpen: boolean, onClose: () => void, onConfirm: () => void, siteName: string }) {
  return (
    <ProjectModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Allow this site to view and copy files?"
      description={`${siteName} will be able to view and make its own copies of files in the project folder.`}
    />
  );
}

export function WarningModal({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: () => void }) {
  return (
    <ProjectModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      type="warning"
      title="Replace current project?"
      description="Starting a new ingestion will replace the current project folder. The old metadata and summaries will be deleted permanently."
      confirmLabel="Replace Project"
      cancelLabel="Cancel"
    />
  );
}
