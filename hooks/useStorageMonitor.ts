import { useState, useEffect } from 'react';

export const useStorageMonitor = () => {
  const [storageUsage, setStorageUsage] = useState({
    used: 0,
    total: 5 * 1024 * 1024, // 5MB localStorage limit
    percentage: 0
  });

  const calculateStorageUsage = () => {
    try {
      let totalSize = 0;
      
      // Calculate size of all localStorage items
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          const item = localStorage.getItem(key);
          if (item) {
            // Rough estimate: 2 bytes per character (UTF-16)
            totalSize += item.length * 2;
          }
        }
      }

      const percentage = (totalSize / (5 * 1024 * 1024)) * 100;

      setStorageUsage({
        used: totalSize,
        total: 5 * 1024 * 1024,
        percentage: Math.round(percentage)
      });

      return { used: totalSize, percentage };
    } catch (error) {
      console.error('Error calculating storage usage:', error);
      return { used: 0, percentage: 0 };
    }
  };

  useEffect(() => {
    // Initial calculation
    calculateStorageUsage();

    // Set up interval to check periodically
    const interval = setInterval(calculateStorageUsage, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    storageUsage,
    checkStorage: calculateStorageUsage
  };
};