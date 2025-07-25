import { useCallback } from 'react';

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

export const useAnalytics = () => {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Store events locally for MVP
    // In production, this would send to an analytics service
    try {
      const existingEvents = localStorage.getItem('gtm-analytics-events');
      const events = existingEvents ? JSON.parse(existingEvents) : [];
      
      const newEvent = {
        ...event,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId()
      };
      
      events.push(newEvent);
      
      // Keep only last 1000 events to prevent storage overflow
      if (events.length > 1000) {
        events.splice(0, events.length - 1000);
      }
      
      localStorage.setItem('gtm-analytics-events', JSON.stringify(events));
      
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics Event:', newEvent);
      }
    } catch (error) {
      console.error('Failed to track analytics event:', error);
    }
  }, []);

  const trackActivation = useCallback((projectId: string) => {
    trackEvent({
      category: 'User',
      action: 'Activation',
      label: projectId,
      metadata: {
        activatedAt: new Date().toISOString()
      }
    });
  }, [trackEvent]);

  const trackTimeToValue = useCallback((projectId: string, timeInMinutes: number) => {
    trackEvent({
      category: 'Performance',
      action: 'TimeToValue',
      label: projectId,
      value: timeInMinutes
    });
  }, [trackEvent]);

  const trackCycleCompletion = useCallback((projectId: string, stageIndex: number) => {
    trackEvent({
      category: 'Engagement',
      action: 'CycleCompletion',
      label: `Stage ${stageIndex}`,
      metadata: { projectId }
    });
  }, [trackEvent]);

  const trackReturnVisit = useCallback((projectId: string, daysSinceLastVisit: number) => {
    trackEvent({
      category: 'Retention',
      action: 'ReturnVisit',
      label: projectId,
      value: daysSinceLastVisit
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackActivation,
    trackTimeToValue,
    trackCycleCompletion,
    trackReturnVisit
  };
};

// Helper function to get or create session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('gtm-session-id');
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('gtm-session-id', sessionId);
  }
  return sessionId;
}