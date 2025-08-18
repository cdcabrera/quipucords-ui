import { createContext, useContext, useState, useCallback } from 'react';
import { helpers } from '../../helpers';
import { type GuidedTourStep, guidedTourSteps } from './guidedTourSteps';

interface TourState {
  isActive: boolean;
  currentStep: number;
  steps: GuidedTourStep[];
}

const TourControllerContext = createContext<ReturnType<typeof useTourController> | null>(null);

const useTourControllerContext = () => {
  const context = useContext(TourControllerContext);
  if (!helpers.TEST_MODE && !context) {
    console.warn('useTourControllerContext must be used within a GuidedTour component');
  }
  return context;
};

const useTourController = ({ defaultSteps = guidedTourSteps }: { defaultSteps?: GuidedTourStep[] } = {}) => {
  const [state, setState] = useState<TourState>({
    isActive: false,
    currentStep: 0,
    steps: []
  });

  const onStart = useCallback(
    (steps: GuidedTourStep[] = defaultSteps) => {
      setState({
        isActive: true,
        currentStep: 0,
        steps
      });
    },
    [defaultSteps]
  );

  const onNext = useCallback(() => {
    setState(prevState => {
      if (prevState.currentStep < prevState.steps.length - 1) {
        return {
          ...prevState,
          currentStep: prevState.currentStep + 1
        };
      }
      return prevState;
    });
  }, []);

  const onPrevious = useCallback(() => {
    setState(prevState => {
      if (prevState.currentStep > 0) {
        return {
          ...prevState,
          currentStep: prevState.currentStep - 1
        };
      }
      return prevState;
    });
  }, []);

  const onEnd = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      isActive: false,
      currentStep: 0
    }));
  }, []);

  const getCurrentStep = useCallback(() => {
    if (!state.isActive || state.currentStep >= state.steps.length) {
      return null;
    }
    return state.steps[state.currentStep];
  }, [state.isActive, state.currentStep, state.steps]);

  const isActive = useCallback(() => state.isActive, [state.isActive]);

  const getCurrentStepIndex = useCallback(() => state.currentStep, [state.currentStep]);

  const getTotalSteps = useCallback(() => state.steps.length, [state.steps.length]);

  const getStepAt = useCallback(
    (index: number) => {
      if (index >= 0 && index < state.steps.length) {
        return state.steps[index];
      }
      return null;
    },
    [state.steps]
  );

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < state.steps.length) {
        setState(prevState => ({
          ...prevState,
          currentStep: index
        }));
      }
    },
    [state.steps.length]
  );

  return {
    onStart,
    onNext,
    onPrevious,
    onEnd,
    getCurrentStep,
    isActive,
    getCurrentStepIndex,
    getTotalSteps,
    getStepAt,
    goTo
  };
};

export { TourControllerContext, useTourController, useTourControllerContext, type TourState };
