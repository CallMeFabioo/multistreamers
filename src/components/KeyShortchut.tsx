import type { ReactNode } from 'react';

export const KeyShortcut = ({ children }: { children: ReactNode }) => {
  return (
    <kbd className="px-2 text-xs text-white bg-indigo-600 border-slate-700 rounded-lg">
      {children}
    </kbd>
  );
};
