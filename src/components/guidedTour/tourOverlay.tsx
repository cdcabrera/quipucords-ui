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

  // Resolve a selector for the current step
  const targetSelector =
    currentStep.stepId === 'welcome'
      ? 'body'
      : currentStep.spotlightSelector || `[data-tour-id="${currentStep.stepId}"]`;

  // Find the target element via resolved selector
  const targetElement: HTMLElement | null = document.querySelector(targetSelector) as HTMLElement;

  if (!targetElement) {
    console.warn(`Tour step target not found: ${currentStep.stepId}. Auto-advancing to next step.`);
    // Auto-advance to the next step that can render
    setTimeout(() => tourController.next(), 0);
    return null;
  }

  // Render welcome/completion steps as modals, others as popovers
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
  if (currentStep.stepId === 'completion') {
    return (
      <Modal
        isOpen={true}
        onClose={handleEnd}
        variant={ModalVariant.small}
        title="You're all set!"
        actions={[
          <Button key="finish" variant={ButtonVariant.primary} onClick={handleEnd}>
            Finish
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
      <Spotlight selector={targetSelector} resizeSelector={currentStep.spotlightResizeSelector} />
      <Popover
        isVisible={true}
        shouldClose={() => false}
        position={currentStep.position || 'bottom'}
        appendTo="inline"
        triggerRef={() => targetElement as HTMLElement}
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
