import React from 'react';
import { useGuidedTour } from './guidedTourContext';

interface TourStepProps {
  stepId: string;
  children: React.ReactElement;
}

export const TourStep: React.FC<TourStepProps> = ({ stepId, children }) => {
  const { renderTourStepElement } = useGuidedTour();
  return renderTourStepElement(stepId, children);
};
