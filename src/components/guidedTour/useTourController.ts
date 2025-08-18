import { useState, useCallback, useRef, useEffect } from 'react';
import { GuidedTourStep } from './types';

interface TourState {
  isActive: boolean;
  currentStep: number;
  steps: GuidedTourStep[];
}

export const useTourController = () => {
  const [state, setState] = useState<TourState>({
    isActive: false,
    currentStep: 0,
    steps: []
  });

  const listenersRef = useRef<Set<() => void>>(new Set());

  const notifyListeners = useCallback(() => {
    listenersRef.current.forEach(listener => listener());
  }, []);

  const start = useCallback((steps: GuidedTourStep[]) => {
    setState({
      isActive: true,
      currentStep: 0,
      steps
    });
    notifyListeners();
  }, [notifyListeners]);

  const next = useCallback(() => {
    setState(prevState => {
      if (prevState.currentStep < prevState.steps.length - 1) {
        return {
          ...prevState,
          currentStep: prevState.currentStep + 1
        };
      }
      return prevState;
    });
    notifyListeners();
  }, [notifyListeners]);

  const previous = useCallback(() => {
    setState(prevState => {
      if (prevState.currentStep > 0) {
        return {
          ...prevState,
          currentStep: prevState.currentStep - 1
        };
      }
      return prevState;
    });
    notifyListeners();
  }, [notifyListeners]);

  const end = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      isActive: false,
      currentStep: 0
    }));
    notifyListeners();
  }, [notifyListeners]);

  const getCurrentStep = useCallback((): GuidedTourStep | null => {
    if (!state.isActive || state.currentStep >= state.steps.length) {
      return null;
    }
    return state.steps[state.currentStep];
  }, [state.isActive, state.currentStep, state.steps]);

  const isActive = useCallback((): boolean => {
    return state.isActive;
  }, [state.isActive]);

  const getCurrentStepIndex = useCallback((): number => {
    return state.currentStep;
  }, [state.currentStep]);

  const getTotalSteps = useCallback((): number => {
    return state.steps.length;
  }, [state.steps.length]);

  const getStepAt = useCallback((index: number): GuidedTourStep | null => {
    if (index >= 0 && index < state.steps.length) {
      return state.steps[index];
    }
    return null;
  }, [state.steps]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < state.steps.length) {
      setState(prevState => ({
        ...prevState,
        currentStep: index
      }));
      notifyListeners();
    }
  }, [notifyListeners, state.steps.length]);

  const subscribe = useCallback((listener: () => void): () => void => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  return {
    start,
    next,
    previous,
    end,
    getCurrentStep,
    isActive,
    getCurrentStepIndex,
    getTotalSteps,
    getStepAt,
    goTo,
    subscribe
  };
};
