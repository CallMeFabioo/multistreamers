import type { ReactNode } from 'react';

export const KeyShortcut = ({ children }: { children: ReactNode }) => {
  return (
    <kbd className="rounded-lg border-slate-700 bg-indigo-600 px-2 text-xs text-white">
      {children}
    </kbd>
  );
};
