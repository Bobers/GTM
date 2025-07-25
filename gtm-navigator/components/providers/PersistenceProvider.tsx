'use client';

import { usePersistence } from '@/hooks/usePersistence';
import { useStorageMonitor } from '@/hooks/useStorageMonitor';
import StorageWarning from '@/components/ui/StorageWarning';

export default function PersistenceProvider({ children }: { children: React.ReactNode }) {
  usePersistence();
  const { storageUsage } = useStorageMonitor();
  
  return (
    <>
      {children}
      <StorageWarning percentage={storageUsage.percentage} />
    </>
  );
}