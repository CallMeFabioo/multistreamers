import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import clsx from 'clsx';

export const StreamButton = ({
  active,
  children,
  className,
  ...props
}: { active?: boolean; children: ReactNode } & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      className={clsx(
        'flex items-center gap-2 rounded-md text-white hover:bg-slate-800 transition px-4 py-2 text-sm shadow-sm focus:relative',
        { 'bg-slate-800': active },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
