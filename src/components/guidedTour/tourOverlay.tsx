import React, { useEffect, useState } from 'react';
import { Popover, Button, ButtonVariant } from '@patternfly/react-core';
import { Modal, ModalVariant } from '@patternfly/react-core/deprecated';
import Spotlight from './spotlight';
import { tourController } from './tourController';

export const TourOverlay: React.FC = () => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = tourController.subscribe(() => {
      forceUpdate({});
    });
    return unsubscribe;
  }, []);

  const currentStep = tourController.getCurrentStep();
  const isActive = tourController.isActive();
  const currentIndex = tourController.getCurrentStepIndex();
  const totalSteps = tourController.getTotalSteps();

  if (!isActive || !currentStep) {
    return null;
  }

  const handleNext = () => {
    if (currentIndex < totalSteps - 1) {
      tourController.next();
    } else {
      tourController.end();
    }
  };

  const handlePrevious = () => {
    tourController.previous();
  };

  const handleEnd = () => {
    tourController.end();
  };

  // For steps that don't have a specific target element, use a fallback
  let targetElement: HTMLElement | null = null;
  
  if (currentStep.stepId === 'welcome') {
    // Welcome step doesn't need a specific target, use body
    targetElement = document.body;
  } else {
    targetElement = document.querySelector(`[data-tour-id="${currentStep.stepId}"]`) as HTMLElement;
  }

  if (!targetElement) {
    console.warn(`Tour step target not found: ${currentStep.stepId}`);
    return null;
  }

  // Render welcome step as a modal, others as popovers
  if (currentStep.stepId === 'welcome') {
    return (
      <Modal
        isOpen={true}
        onClose={handleEnd}
        variant={ModalVariant.small}
        title="Welcome to Quipucords"
        actions={[
          <Button key="next" variant={ButtonVariant.primary} onClick={handleNext}>
            {currentIndex === totalSteps - 1 ? 'Finish' : 'Next'}
          </Button>,
          <Button key="skip" variant={ButtonVariant.link} onClick={handleEnd}>
            Skip Tour
          </Button>
        ]}
      >
        <div>
          <div>{currentStep.content}</div>
          <div style={{ marginTop: '1rem', textAlign: 'center', color: '#666' }}>
            {currentIndex + 1} of {totalSteps}
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <React.Fragment>
      <Spotlight selector={`[data-tour-id="${currentStep.stepId}"]`} />
      <Popover
        isVisible={true}
        shouldClose={() => false}
        position={currentStep.position || 'bottom'}
        appendTo="inline"
        triggerRef={() => targetElement}
        bodyContent={
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{currentStep.header}</div>
            <div>{currentStep.content}</div>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                {currentIndex + 1} of {totalSteps}
              </div>
              <div>
                {currentIndex > 0 && (
                  <Button variant={ButtonVariant.secondary} onClick={handlePrevious} style={{ marginRight: '0.5rem' }}>
                    Previous
                  </Button>
                )}
                <Button variant={ButtonVariant.primary} onClick={handleNext}>
                  {currentIndex === totalSteps - 1 ? 'Finish' : 'Next'}
                </Button>
                <Button variant={ButtonVariant.link} onClick={handleEnd} style={{ marginLeft: '0.5rem' }}>
                  Skip Tour
                </Button>
              </div>
            </div>
          </div>
        }
      />
    </React.Fragment>
  );
};
