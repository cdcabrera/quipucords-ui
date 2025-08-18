/**
 * Main component for the Quipucords guided tour functionality.
 * This component provides tour controller context to the application
 * and manages the tour state.
 *
 * @module guidedTour
 */
import React, { ReactNode } from 'react';
import { GuidedTourOverlay } from './guidedTourOverlay';
import { TourControllerContext, useTourController } from './useGuidedTour';

interface GuidedTourProps {
  children: ReactNode;
}

const GuidedTour: React.FC<GuidedTourProps> = ({ children }) => {
  const tourController = useTourController();

  return (
    <TourControllerContext.Provider value={tourController}>
      {children}
      <GuidedTourOverlay />
    </TourControllerContext.Provider>
  );
};

export { GuidedTour as default, GuidedTour, type GuidedTourProps };
