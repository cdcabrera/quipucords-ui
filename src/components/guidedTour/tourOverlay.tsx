import React from 'react';
import { Popover, Button, ButtonVariant } from '@patternfly/react-core';
import { Modal, ModalVariant } from '@patternfly/react-core/deprecated';
import Spotlight from './spotlight';
import { useTourControllerContext } from './tourControllerProvider';
import './guidedTour.css';

export const TourOverlay: React.FC = () => {
  const tourController = useTourControllerContext();
  
  const currentStep = tourController.getCurrentStep();
  const isActive = tourController.isActive();
  const currentIndex = tourController.getCurrentStepIndex();
  const totalSteps = tourController.getTotalSteps();

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

  if (!isActive || !currentStep) {
    return null;
  }

  // Auto-skip steps if target element is not found
  let targetElement: HTMLElement | null = null;
  if (currentStep.spotlightSelector) {
    targetElement = document.querySelector(currentStep.spotlightSelector) as HTMLElement;
  } else {
    targetElement = document.querySelector(`[data-tour-id="${currentStep.stepId}"]`) as HTMLElement;
  }

  if (!targetElement && currentStep.stepId !== 'welcome' && currentStep.stepId !== 'completion') {
    // Auto-advance to next step if target not found
    setTimeout(() => tourController.next(), 0);
    return null;
  }

  // Welcome step as Modal
  if (currentStep.stepId === 'welcome') {
    return (
      <Modal
        isOpen={true}
        variant={ModalVariant.small}
        title="Welcome to Quipucords"
        actions={[
          <Button key="next" variant={ButtonVariant.primary} onClick={handleNext}>
            Next
          </Button>,
          <Button key="skip" variant={ButtonVariant.secondary} onClick={handleEnd}>
            Skip Tour
          </Button>
        ]}
        onClose={handleEnd}
      >
        <div>{currentStep.content}</div>
      </Modal>
    );
  }

  // Completion step as Modal
  if (currentStep.stepId === 'completion') {
    return (
      <Modal
        isOpen={true}
        variant={ModalVariant.small}
        title="Tour Complete!"
        actions={[
          <Button key="finish" variant={ButtonVariant.primary} onClick={handleEnd}>
            Finish
          </Button>
        ]}
        onClose={handleEnd}
      >
        <div>{currentStep.content}</div>
      </Modal>
    );
  }

  // Regular steps as Popover
  return (
    <>
      <div className="guided-tour__overlay">
        <Popover
          isVisible={true}
          shouldClose={() => false}
          bodyContent={
            <div className="guided-tour__popover">
              <div className="guided-tour__popover--header">
                {currentStep.header}
              </div>
              <div>
                {currentStep.content}
              </div>
              <div className="guided-tour__popover--footer">
                <div>
                  Step {currentIndex + 1} of {totalSteps}
                </div>
                <div>
                  {currentIndex > 0 && (
                    <Button 
                      variant={ButtonVariant.secondary} 
                      onClick={handlePrevious} 
                      className="guided-tour__popover--button"
                    >
                      Previous
                    </Button>
                  )}
                  <Button 
                    variant={ButtonVariant.primary} 
                    onClick={handleNext} 
                    className="guided-tour__popover--button"
                  >
                    {currentIndex === totalSteps - 1 ? 'Finish' : 'Next'}
                  </Button>
                  <Button 
                    variant={ButtonVariant.secondary} 
                    onClick={handleEnd}
                    className="guided-tour__popover--button"
                  >
                    Skip Tour
                  </Button>
                </div>
              </div>
            </div>
          }
          appendTo="inline"
          triggerRef={() => targetElement}
        />
      </div>
      {targetElement && <Spotlight selector={currentStep.spotlightSelector || `[data-tour-id="${currentStep.stepId}"]`} />}
    </>
  );
};
