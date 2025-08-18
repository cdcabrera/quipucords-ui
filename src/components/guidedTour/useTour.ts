import { useSyncExternalStore, useMemo } from 'react';
import { tourStore } from './tourStore';

export const useTour = () => {
  const snapshot = useSyncExternalStore(tourStore.subscribe, tourStore.getSnapshot, tourStore.getSnapshot);

  const api = useMemo(() => ({
    start: tourStore.start,
    next: tourStore.next,
    previous: tourStore.previous,
    end: tourStore.end,
    goTo: tourStore.goTo
  }), []);

  return {
    ...snapshot,
    currentStepData: snapshot.isActive && snapshot.currentStep < snapshot.steps.length
      ? snapshot.steps[snapshot.currentStep]
      : null,
    ...api
  };
};
