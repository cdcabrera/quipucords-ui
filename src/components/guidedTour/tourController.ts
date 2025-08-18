import { GuidedTourStep } from './types';

interface TourState {
  isActive: boolean;
  currentStep: number;
  steps: GuidedTourStep[];
}

class TourController {
  private state: TourState = {
    isActive: false,
    currentStep: 0,
    steps: []
  };

  private listeners: Set<() => void> = new Set();

  start(steps: GuidedTourStep[]): void {
    this.state = {
      isActive: true,
      currentStep: 0,
      steps
    };
    this.notifyListeners();
  }

  next(): void {
    if (this.state.currentStep < this.state.steps.length - 1) {
      this.state.currentStep++;
      this.notifyListeners();
    }
  }

  previous(): void {
    if (this.state.currentStep > 0) {
      this.state.currentStep--;
      this.notifyListeners();
    }
  }

  end(): void {
    this.state.isActive = false;
    this.state.currentStep = 0;
    this.notifyListeners();
  }

  getCurrentStep(): GuidedTourStep | null {
    if (!this.state.isActive || this.state.currentStep >= this.state.steps.length) {
      return null;
    }
    return this.state.steps[this.state.currentStep];
  }

  isActive(): boolean {
    return this.state.isActive;
  }

  getCurrentStepIndex(): number {
    return this.state.currentStep;
  }

  getTotalSteps(): number {
    return this.state.steps.length;
  }

  getStepAt(index: number): GuidedTourStep | null {
    if (index >= 0 && index < this.state.steps.length) {
      return this.state.steps[index];
    }
    return null;
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.state.steps.length) {
      this.state.currentStep = index;
      this.notifyListeners();
    }
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}

// Export singleton instance
export const tourController = new TourController();
