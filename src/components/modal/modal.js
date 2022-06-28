import React from 'react';
import PropTypes from 'prop-types';
import { Modal as PfModal, ModalVariant } from '@patternfly/react-core';

/**
 * Wrapper for adjusting PF Modal styling.
 *
 * @param {string} ariaLabel
 * @param {boolean} backdrop
 * @param {React.ReactNode} children
 * @param {string} position
 * @param {string} positionOffset
 * @param {boolean} showClose
 * @param {string} variant
 * @param {PfModal.props} props
 * @returns {React.ReactNode}
 */
const Modal = ({
  'aria-label': ariaLabel,
  backdrop,
  children,
  position,
  positionOffset,
  showClose,
  variant,
  ...props
}) => {
  const cssClassName = `quipucords-modal${backdrop === false ? '__hide-backdrop' : ''}`;
  let elem = document.querySelector(cssClassName);

  if (!elem) {
    elem = document.createElement('div');
    document.getElementsByTagName('body')[0].appendChild(elem);
    elem.className = cssClassName;
  }

  return (
    <PfModal
      appendTo={elem}
      aria-label={ariaLabel}
      position={position}
      positionOffset={positionOffset}
      showClose={showClose}
      variant={variant}
      {...props}
    >
      {children}
    </PfModal>
  );
};

/**
 * Prop types
 *
 * @type {{backdrop: boolean, children: React.ReactNode}}
 */
Modal.propTypes = {
  'aria-label': PropTypes.string,
  backdrop: PropTypes.bool,
  children: PropTypes.node,
  position: PropTypes.oneOf(['top', null]),
  positionOffset: PropTypes.string,
  showClose: PropTypes.bool,
  variant: PropTypes.oneOf([...Object.values(ModalVariant)])
};

/**
 * Default props.
 *
 * @type {{backdrop: boolean, children: null}}
 */
Modal.defaultProps = {
  'aria-label': 'modal',
  backdrop: true,
  children: null,
  position: 'top',
  positionOffset: '5%',
  showClose: false,
  variant: 'medium'
};

export { Modal as default, Modal };
