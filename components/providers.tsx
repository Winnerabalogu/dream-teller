'use client';

import { DreamProvider } from '@/context/DreamContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <DreamProvider>{children}</DreamProvider>;
}