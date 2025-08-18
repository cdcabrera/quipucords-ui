import { GuidedTourStep } from './types';

interface TourState {
  isActive: boolean;
  currentStep: number;
  steps: GuidedTourStep[];
}

const state: TourState = {
  isActive: false,
  currentStep: 0,
  steps: []
};

const listeners = new Set<() => void>();

const notify = () => {
  listeners.forEach(l => l());
};

export const tourStore = {
  // subscription hooks
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): TourState {
    return { ...state, steps: state.steps };
  },
  // actions
  start(steps: GuidedTourStep[]) {
    state.isActive = true;
    state.currentStep = 0;
    state.steps = steps;
    notify();
  },
  next() {
    if (state.currentStep < state.steps.length - 1) {
      state.currentStep += 1;
      notify();
    }
  },
  previous() {
    if (state.currentStep > 0) {
      state.currentStep -= 1;
      notify();
    }
  },
  end() {
    state.isActive = false;
    state.currentStep = 0;
    notify();
  },
  goTo(index: number) {
    if (index >= 0 && index < state.steps.length) {
      state.currentStep = index;
      notify();
    }
  }
};
