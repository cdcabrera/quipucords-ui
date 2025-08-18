import React, { createContext, useContext, ReactNode } from 'react';
import { useTourController } from './useTourController';

const TourControllerContext = createContext<ReturnType<typeof useTourController> | null>(null);

interface TourControllerProviderProps {
  children: ReactNode;
}

export const TourControllerProvider: React.FC<TourControllerProviderProps> = ({ children }) => {
  const tourController = useTourController();

  return (
    <TourControllerContext.Provider value={tourController}>
      {children}
    </TourControllerContext.Provider>
  );
};

export const useTourControllerContext = () => {
  const context = useContext(TourControllerContext);
  if (!context) {
    throw new Error('useTourControllerContext must be used within a TourControllerProvider');
  }
  return context;
};
