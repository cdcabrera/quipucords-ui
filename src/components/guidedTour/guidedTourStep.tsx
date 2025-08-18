import React from 'react';

interface GuidedTourStepProps {
  stepId: string;
  children: React.ReactElement;
}

const GuidedTourStep: React.FC<GuidedTourStepProps> = ({ stepId, children }) =>
  React.cloneElement(children, {
    'data-tour-id': stepId,
    ...children.props
  });

export { GuidedTourStep as default, GuidedTourStep, type GuidedTourStepProps };
