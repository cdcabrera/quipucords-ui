/**
 * Renders the guided tour overlay with popovers and modals.
 * This component displays tour steps as either popovers attached to specific elements
 * or as modal dialogs for welcome and completion steps. It handles navigation between
 * steps and automatically highlights the target elements using the Spotlight component.
 *
 * @module tourOverlay
 */
import React from 'react';
import { Popover, Button, ButtonVariant, FlexItem, Flex } from '@patternfly/react-core';
import { Modal, ModalVariant } from '@patternfly/react-core/deprecated';
import { GuidedTourSpotlight } from './guidedTourSpotlight';
import { useTourControllerContext } from './useGuidedTour';
import './guidedTour.css';

const GuidedTourOverlay: React.FC = () => {
  const tourController = useTourControllerContext();

  if (!tourController) {
    return null;
  }

  const currentStep = tourController.getCurrentStep();
  const isActive = tourController.isActive();
  const currentIndex = tourController.getCurrentStepIndex();
  const totalSteps = tourController.getTotalSteps();

  const handleNext = () => {
    if (currentIndex < totalSteps - 1) {
      tourController.onNext();
    } else {
      tourController.onEnd();
    }
  };

  const handlePrevious = () => {
    tourController.onPrevious();
  };

  const handleEnd = () => {
    tourController.onEnd();
  };

  const onStart = () => {
    tourController.onStart();
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
    setTimeout(() => tourController.onNext(), 0);
    return null;
  }

  // Welcome step as Modal
  if (currentStep.stepId === 'welcome') {
    return (
      <Modal
        isOpen
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
        isOpen
        variant={ModalVariant.small}
        title="Tour Complete!"
        actions={[
          <Button key="finish" variant={ButtonVariant.primary} onClick={handleEnd}>
            End tour
          </Button>,
          <Button key="finish" variant={ButtonVariant.plain} onClick={onStart}>
            Restart
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
    <React.Fragment>
      <div className="guided-tour__overlay">
        <Popover
          isVisible
          hideOnOutsideClick={false}
          shouldClose={() => {
            handleEnd();
          }}
          headerContent={currentStep.header}
          bodyContent={currentStep.content}
          appendTo="inline"
          triggerRef={() => targetElement as HTMLElement}
          footerContent={
            <Flex spaceItems={{ default: 'spaceItemsMd' }} justifyContent={{ default: 'justifyContentSpaceBetween' }}>
              <FlexItem>
                Step {currentIndex + 1}/{totalSteps}
              </FlexItem>
              <FlexItem>
                <Flex spaceItems={{ default: 'spaceItemsMd' }}>
                  <FlexItem>
                    <Button variant={ButtonVariant.secondary} onClick={handlePrevious} isDisabled={currentIndex === 0}>
                      Back
                    </Button>
                  </FlexItem>
                  <FlexItem>
                    <Button variant={ButtonVariant.primary} onClick={handleNext}>
                      Next
                    </Button>
                  </FlexItem>
                </Flex>
              </FlexItem>
            </Flex>
          }
        />
      </div>
      {targetElement && (
        <GuidedTourSpotlight selector={currentStep.spotlightSelector || `[data-tour-id="${currentStep.stepId}"]`} />
      )}
    </React.Fragment>
  );
};

export { GuidedTourOverlay as default, GuidedTourOverlay };
