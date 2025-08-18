import React from 'react';

interface TourStepMarkerProps {
  stepId: string;
  children: React.ReactElement;
}

export const TourStepMarker: React.FC<TourStepMarkerProps> = ({ stepId, children }) => {
  return React.cloneElement(children, {
    'data-tour-id': stepId,
    ...children.props
  });
};
