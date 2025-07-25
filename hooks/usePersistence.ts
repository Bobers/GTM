import { useEffect } from 'react';
import { useProjectStore } from '@/state/projectStore';

const STORAGE_KEY = 'gtm-navigator-state';

export const usePersistence = () => {
  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        
        // Restore dates as Date objects
        if (parsedState.projects) {
          parsedState.projects = parsedState.projects.map((project: any) => ({
            ...project,
            metadata: {
              createdAt: new Date(project.metadata.createdAt),
              lastUpdated: new Date(project.metadata.lastUpdated)
            }
          }));
        }

        useProjectStore.setState(parsedState);
      }
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
    }
  }, []);

  // Subscribe to state changes and save to localStorage
  useEffect(() => {
    const unsubscribe = useProjectStore.subscribe((state) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save state to localStorage:', error);
      }
    });

    return unsubscribe;
  }, []);
};