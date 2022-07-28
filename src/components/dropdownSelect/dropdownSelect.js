import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useShallowCompareEffect } from 'react-use';
import {
  Button,
  ButtonVariant,
  DropdownDirection,
  DropdownPosition,
  Flex,
  FlexItem,
  Select as PfSelect,
  SelectOption as PfSelectOption,
  SelectVariant
} from '@patternfly/react-core';
import { CaretDownIcon, CaretUpIcon } from '@patternfly/react-icons';
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';
import _isPlainObject from 'lodash/isPlainObject';
import { helpers } from '../../common';

/**
 * Pass button variant as a select component option.
 *
 * @type {ButtonVariant}
 */
const SelectButtonVariant = ButtonVariant;

/**
 * Pass direction as select component variant option.
 *
 * @type {DropdownDirection}
 */
const SelectDirection = DropdownDirection;

/**
 * Pass position as select component variant option.
 *
 * @type {DropdownPosition}
 */
const SelectPosition = DropdownPosition;

// FixMe: attributes filtered on PF select component. allow data- attributes
/**
 * Format options into a consumable array of objects format.
 * Note: It is understood that for line 60'ish around "updatedOptions" we dump all values regardless
 * of whether they are plain objects, or not, into updatedOptions. This has been done for speed only,
 * one less check to perform.
 *
 * @param {object} params
 * @param {*|React.ReactNode} params.selectField
 * @param {object|Array} params.options
 * @param {string|number|Array} params.selectedOptions
 * @param {string} params.variant
 * @param {object} params.props
 * @returns {{options: *[]|*, selected: *[]}}
 */
const formatOptions = ({ selectField = { current: null }, options, selectedOptions, variant, ...props } = {}) => {
  const { current: domElement = {} } = selectField;
  // const { options, selectedOptions, variant } = props;
  const dataAttributes = Object.entries(props).filter(([key]) => /^data-/i.test(key));
  const updatedOptions = _isPlainObject(options)
    ? Object.entries(options).map(([key, value]) => ({ ...value, title: key, value }))
    : _cloneDeep(options);

  const activateOptions =
    (selectedOptions && typeof selectedOptions === 'string') || typeof selectedOptions === 'number'
      ? [selectedOptions]
      : selectedOptions;

  updatedOptions.forEach((option, index) => {
    let convertedOption = option;

    if (typeof convertedOption === 'string') {
      convertedOption = {
        title: option,
        value: option
      };

      updatedOptions[index] = convertedOption;
    } else if (typeof convertedOption.title === 'function') {
      convertedOption.title = convertedOption.title();
    }

    convertedOption.text = convertedOption.text || convertedOption.title;
    convertedOption.textContent = convertedOption.textContent || convertedOption.title;
    convertedOption.label = convertedOption.label || convertedOption.title;

    if (activateOptions) {
      let isSelected;

      if (_isPlainObject(convertedOption.value)) {
        isSelected = _findIndex(activateOptions, convertedOption.value) > -1;

        if (!isSelected) {
          const tempSearch = activateOptions.find(activeOption =>
            Object.values(convertedOption.value).includes(activeOption)
          );
          isSelected = !!tempSearch;
        }
      } else {
        isSelected = activateOptions.includes(convertedOption.value);
      }

      if (!isSelected) {
        isSelected = activateOptions.includes(convertedOption.title);
      }

      updatedOptions[index].selected = isSelected;
    }
  });

  let updateSelected;

  if (variant === SelectVariant.single) {
    updateSelected = (updatedOptions.find(opt => opt.selected === true) || {}).title;
  } else {
    updateSelected = updatedOptions.filter(opt => opt.selected === true).map(opt => opt.title);
  }

  if (domElement?.parentRef?.current) {
    dataAttributes.forEach(([key, value]) => domElement?.parentRef?.current.setAttribute(key, value));
  }

  return {
    options: updatedOptions,
    selected: updateSelected
  };
};

/**
 * Return assumed/expected PF select props.
 *
 * @param {object} params
 * @param {boolean} params.isDisabled
 * @param {string} params.placeholder
 * @param {object|Array} params.options
 * @returns {{}}
 */
const formatPfProps = ({ isDisabled, placeholder, options } = {}) => {
  const updatedProps = {};

  // FixMe: investigate "isDisabled", PFReact quirks?
  if (!options || !options.length || isDisabled) {
    updatedProps.isDisabled = true;
  }

  if (placeholder) {
    updatedProps.hasPlaceholderStyle = true;
  }

  return updatedProps;
};

/**
 * A wrapper for Pf Select, and emulator for Pf Dropdown. Provides consistent restructured event data for onSelect callback
 * for both select and dropdown.
 *
 * @fires onDropdownSelect
 * @fires onToggle
 * @param {object} props
 * @param {string} props.ariaLabel
 * @param {string} props.buttonVariant
 * @param {string} props.className
 * @param {string} props.direction
 * @param {string} props.id
 * @param {boolean} props.isDisabled
 * @param {boolean} props.isDropdownButton
 * @param {boolean} props.isInline
 * @param {boolean} props.isToggleText
 * @param {number} props.maxHeight
 * @param {string} props.name
 * @param {Function} props.onSelect
 * @param {object|Array} props.options
 * @param {string} props.placeholder
 * @param {string} props.position
 * @param {number|string|Array} props.selectedOptions
 * @param {React.ReactNode|Function} props.toggleIcon
 * @param {string} props.variant
 * @param {object} props.props
 * @returns {React.ReactNode}
 */
const DropdownSelect = ({
  ariaLabel,
  buttonVariant,
  className,
  direction,
  id,
  isDisabled,
  isDropdownButton,
  isInline,
  isToggleText,
  maxHeight,
  name,
  onSelect,
  options: baseOptions,
  placeholder,
  position,
  selectedOptions,
  toggleIcon,
  variant,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [options, setOptions] = useState(baseOptions);
  const [selected, setSelected] = useState([]);
  const selectField = useRef();

  useShallowCompareEffect(() => {
    const { options: updatedOptions, selected: updatedSelected } = formatOptions({
      selectField,
      options: baseOptions,
      selectedOptions,
      variant,
      ...props
    });

    setOptions(updatedOptions);
    setSelected(updatedSelected);
  }, [baseOptions, props, selectField, selectedOptions, variant]);

  /**
   * Open/closed state.
   *
   * @event onToggle
   * @param {boolean} expanded
   */
  const onToggle = expanded => {
    const updatedIsExpanded = isDropdownButton ? !isExpanded : expanded;
    setIsExpanded(updatedIsExpanded);
  };

  /**
   * Emulate select event object, apply to provided onSelect prop.
   *
   * @event onDropdownSelect
   * @param {object} event
   * @param {string} titleSelection
   */
  const onDropdownSelect = (event, titleSelection) => {
    const updatedOptions = options;
    const optionsIndex = updatedOptions.findIndex(option => option.title === titleSelection);

    updatedOptions[optionsIndex].selected =
      variant === SelectVariant.single ? true : !updatedOptions[optionsIndex].selected;

    if (variant === SelectVariant.single) {
      updatedOptions.forEach((option, index) => {
        if (optionsIndex !== index) {
          updatedOptions[index].selected = false;
        }
      });
    }

    const updateSelected =
      variant === SelectVariant.single
        ? titleSelection
        : updatedOptions.filter(opt => opt.selected === true).map(opt => opt.title);

    const mockUpdatedOptions = _cloneDeep(updatedOptions);

    const mockTarget = {
      id,
      name: name || id,
      value: mockUpdatedOptions[optionsIndex].value,
      selected: (variant === SelectVariant.single && mockUpdatedOptions[optionsIndex]) || _cloneDeep(updateSelected),
      selectedIndex: optionsIndex,
      type: `select-${(variant === SelectVariant.single && 'one') || 'multiple'}`,
      options: mockUpdatedOptions
    };

    if (variant === SelectVariant.checkbox) {
      mockTarget.checked = mockUpdatedOptions[optionsIndex].selected;
    }

    const mockEvent = {
      ...mockTarget,
      target: { ...mockTarget },
      currentTarget: { ...mockTarget },
      persist: helpers.noop
    };

    setOptions(updatedOptions);
    setSelected(updateSelected);

    onSelect({ ...mockEvent }, optionsIndex, mockUpdatedOptions);

    if (variant === SelectVariant.single) {
      setIsExpanded(false);
    }
  };

  const pfProps = { direction, maxHeight, ...formatPfProps({ isDisabled, options: baseOptions, placeholder }) };

  return (
    <div className={`quipucords-select${((isInline || isDropdownButton) && ' quipucords-select__inline') || ''}`}>
      {isDropdownButton && (
        <Button className="quiucords-select__dropdown-button" variant={buttonVariant} onClick={onToggle}>
          <Flex component="span">
            <FlexItem component="span" grow={{ default: 'grow' }} spacer={{ default: 'none' }}>
              {placeholder || ariaLabel}
            </FlexItem>
            <FlexItem component="span" spacer={{ default: 'none' }}>
              {(isExpanded && direction === SelectDirection.up && <CaretUpIcon />) || <CaretDownIcon />}
            </FlexItem>
          </Flex>
        </Button>
      )}
      <PfSelect
        menuAppendTo="parent"
        className={`quipucords-select-pf${(!isToggleText && '__no-toggle-text') || ''} ${`quipucords-select-pf${
          (isDropdownButton && '__button') || ''
        }`} ${(direction === SelectDirection.down && 'quipucords-select-pf__position-down') || ''} ${
          (position === SelectPosition.right && 'quipucords-select-pf__position-right') || ''
        } ${className}`}
        variant={variant}
        aria-label={ariaLabel}
        onToggle={onToggle}
        onSelect={onDropdownSelect}
        selections={selected}
        isOpen={isExpanded}
        toggleIcon={toggleIcon}
        placeholderText={placeholder}
        ref={selectField}
        {...pfProps}
      >
        {(options &&
          options.map(option => (
            <PfSelectOption
              key={window.btoa(`${option.title}-${option.value}`)}
              id={window.btoa(`${option.title}-${option.value}`)}
              value={option.title}
              data-value={(_isPlainObject(option.value) && JSON.stringify([option.value])) || option.value}
              data-title={option.title}
            />
          ))) ||
          []}
      </PfSelect>
    </div>
  );
};

/**
 * Prop types.
 *
 * @type {{toggleIcon: (React.ReactNode|Function), className: string, ariaLabel: string, onSelect: Function, isToggleText: boolean,
 *     isDropdownButton: boolean, maxHeight: number, buttonVariant: string, name: string, options: Array|object,
 *     selectedOptions: Array|number|string, isInline: boolean, id: string, isDisabled: boolean, placeholder: string,
 *     position: string, direction: string}}
 */
DropdownSelect.propTypes = {
  ariaLabel: PropTypes.string,
  buttonVariant: PropTypes.oneOf(Object.values(SelectButtonVariant)),
  className: PropTypes.string,
  direction: PropTypes.oneOf(Object.values(SelectDirection)),
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  isDropdownButton: PropTypes.bool,
  isInline: PropTypes.bool,
  isToggleText: PropTypes.bool,
  maxHeight: PropTypes.number,
  name: PropTypes.string,
  onSelect: PropTypes.func,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.any,
        value: PropTypes.any.isRequired,
        selected: PropTypes.bool
      })
    ),
    PropTypes.shape({
      title: PropTypes.any,
      value: PropTypes.any.isRequired,
      selected: PropTypes.bool
    }),
    PropTypes.object
  ]),
  placeholder: PropTypes.string,
  position: PropTypes.oneOf(Object.values(SelectPosition)),
  selectedOptions: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  ]),
  toggleIcon: PropTypes.element,
  variant: PropTypes.oneOf([...Object.values(SelectVariant)])
};

/**
 * Default props.
 *
 * @type {{toggleIcon: null, className: string, ariaLabel: string, onSelect: Function, isToggleText: boolean, isDropdownButton: boolean,
 *     maxHeight: null, buttonVariant: ButtonVariant.primary, name: null, options: *[], selectedOptions: null, variant: SelectVariant.single,
 *     isInline: boolean, id: string, isDisabled: boolean, placeholder: string, position: DropdownPosition.left,
 *     direction: DropdownDirection.down}}
 */
DropdownSelect.defaultProps = {
  ariaLabel: 'Select option',
  buttonVariant: ButtonVariant.primary,
  className: '',
  direction: SelectDirection.down,
  id: helpers.generateId(),
  isDisabled: false,
  isDropdownButton: false,
  isInline: true,
  isToggleText: true,
  maxHeight: null,
  name: null,
  onSelect: helpers.noop,
  options: [],
  placeholder: 'Select option',
  position: SelectPosition.left,
  selectedOptions: null,
  toggleIcon: null,
  variant: SelectVariant.single
};

export {
  DropdownSelect as default,
  DropdownSelect,
  formatOptions,
  formatPfProps,
  SelectDirection,
  SelectPosition,
  SelectVariant,
  SelectButtonVariant
};
