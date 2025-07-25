'use client';

import { usePersistence } from '@/hooks/usePersistence';

export default function PersistenceProvider({ children }: { children: React.ReactNode }) {
  usePersistence();
  return <>{children}</>;
}