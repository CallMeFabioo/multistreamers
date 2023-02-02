'use client';

import { Plus, UserPlus } from 'lucide-react';
import React from 'react';

import clsx from 'clsx';

import { useStore } from '@src/store/store';

import { KeyShortcut } from '@components/KeyShortchut';
import { StreamButton } from '@components/StreamButton';

export function HomePage() {
  const isAdding = useStore((state) => state.isAdding);
  const setIsAdding = useStore((state) => state.setIsAdding);

  return (
    <main className="grid h-stream-item transition-all">
      <section className="gap-1 relative grid h-full">
        <div className="w-full h-full border-2 border-dashed border-gray-800 rounded flex items-center justify-center group">
          <div className="flex items-center flex-col gap-4">
            <UserPlus className="w-12 h-12 text-indigo-600" size={48} />
            <p className="text-white">Get started by adding a streaming.</p>

            <StreamButton
              onClick={() => {
                setIsAdding(!isAdding);
              }}
              className={clsx('rounded-md border border-slate-600', {
                'bg-gray-700': !!isAdding,
                'cursor-not-allowed': !!isAdding,
                'disabled:bg-indigo-500': !!isAdding,
              })}
              disabled={!!isAdding}
            >
              <Plus className="h-4 w-4" size={16} />
              <span className="text-xs">Add Stream</span>
              <KeyShortcut>Ctrl+K</KeyShortcut>
            </StreamButton>
          </div>
        </div>
      </section>
    </main>
  );
}
