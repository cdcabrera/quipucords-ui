import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonVariant,
  DropdownDirection,
  DropdownPosition,
  Select as PfSelect,
  SelectOption as PfSelectOption,
  SelectVariant
} from '@patternfly/react-core';
import { CaretDownIcon, CaretUpIcon } from '@patternfly/react-icons';
import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';
import _findIndex from 'lodash/findIndex';
import _isPlainObject from 'lodash/isPlainObject';
import { helpers } from '../../common/helpers';

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

/**
 * A wrapper for Pf Select, and emulator for Pf Dropdown. Provides consistent restructured event data for onSelect callback
 * for both select and dropdown.
 *
 * @augments React.Component
 * @fires onSelect
 * @fires onToggle
 */
class DropdownSelect extends React.Component {
  state = { isExpanded: false, options: null, selected: null };

  selectField = React.createRef();

  componentDidMount() {
    const { options } = this.state;

    if (options === null) {
      this.formatOptions();
    }
  }

  componentDidUpdate(prevProps) {
    const { options, selectedOptions } = this.props;

    if (!_isEqual(prevProps.options, options) || !_isEqual(prevProps.selectedOptions, selectedOptions)) {
      this.formatOptions();
    }
  }

  /**
   * Emulate select event object, apply to provided onSelect prop.
   *
   * @event onSelect
   * @param {object} event
   * @param {string} titleSelection
   */
  onSelect = (event, titleSelection) => {
    const { options } = this.state;
    const { id, name, onSelect, variant } = this.props;

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

    this.setState(
      {
        options: updatedOptions,
        selected: updateSelected
      },
      () => {
        const mockUpdatedOptions = _cloneDeep(updatedOptions);

        const mockTarget = {
          id,
          name: name || id,
          value: mockUpdatedOptions[optionsIndex].value,
          selected:
            (variant === SelectVariant.single && mockUpdatedOptions[optionsIndex]) || _cloneDeep(updateSelected),
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

        onSelect({ ...mockEvent }, optionsIndex, mockUpdatedOptions);

        if (variant === SelectVariant.single) {
          this.setState({
            isExpanded: false
          });
        }
      }
    );
  };

  /**
   * Patternfly Select's open/closed state.
   *
   * @event onToggle
   * @param {boolean} expanded
   */
  onToggle = expanded => {
    const { isExpanded } = this.state;
    const { isDropdownButton } = this.props;
    const updatedIsExpanded = isDropdownButton ? !isExpanded : expanded;

    this.setState({
      isExpanded: updatedIsExpanded
    });
  };

  // FixMe: attributes filtered on PF select component. allow data- attributes
  /**
   * Format options into a consumable array of objects format.
   * Note: It is understood that for line 151'ish around "updatedOptions" we dump all values regardless
   * of whether they are plain objects, or not, into updatedOptions. This has been done for speed only,
   * one less check to perform.
   */
  formatOptions() {
    const { current: domElement = {} } = this.selectField;
    const { options, selectedOptions, variant } = this.props;
    const dataAttributes = Object.entries(this.props).filter(([key]) => /^data-/i.test(key));
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

    this.setState({
      options: updatedOptions,
      selected: updateSelected
    });
  }

  /**
   * Render a select/dropdown list.
   *
   * @returns {Node}
   */
  render() {
    const { options, selected, isExpanded } = this.state;
    const {
      ariaLabel,
      buttonVariant,
      className,
      direction,
      isDisabled,
      isDropdownButton,
      isInline,
      isToggleText,
      maxHeight,
      placeholder,
      position,
      toggleIcon,
      variant
    } = this.props;

    const pfSelectOptions = {
      direction,
      maxHeight
    };

    // FixMe: investigate "isDisabled", PFReact quirks?
    if (!options || !options.length || isDisabled) {
      pfSelectOptions.isDisabled = true;
    }

    if (placeholder) {
      pfSelectOptions.hasPlaceholderStyle = true;
    }

    /**
     * FixMe: PFReact quirks around PfSelect, requires children
     * "Null" is a typical fallback we use across the board on a multitude of React apps.
     * In this case "null" is a fallback for scenarios where an "undefined" list is passed
     * during initial mount. Converted to an empty list/array "[]" to compensate.
     */
    /**
     * Note: PFReact missing select border on compile
     * Related https://github.com/patternfly/patternfly-react/issues/5650 and
     * https://github.com/cssnano/cssnano/issues/1051
     */
    return (
      <div className={`quipucords-select${((isInline || isDropdownButton) && ' quipucords-select__inline') || ''}`}>
        {isDropdownButton && (
          <Button variant={buttonVariant} onClick={this.onToggle}>
            {placeholder || ariaLabel}{' '}
            {(isExpanded && direction === SelectDirection.up && <CaretUpIcon />) || <CaretDownIcon />}
          </Button>
        )}
        <PfSelect
          menuAppendTo="parent"
          className={`quipucords-select-pf${(!isToggleText && '__no-toggle-text') || ''} ${`quipucords-select-pf${
            (isDropdownButton && '__button') || ''
          }`} ${(direction === SelectDirection.down && 'quipucords-select-pf__position-down') || ''} ${
            (position === DropdownPosition.right && 'quipucords-select-pf__position-right') || ''
          } ${className}`}
          variant={variant}
          aria-label={ariaLabel}
          onToggle={(isDropdownButton && Function.prototype) || this.onToggle}
          onSelect={this.onSelect}
          selections={selected}
          isOpen={isExpanded}
          toggleIcon={toggleIcon}
          placeholderText={placeholder}
          ref={this.selectField}
          {...pfSelectOptions}
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
  }
}

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
  SelectDirection,
  SelectPosition,
  SelectVariant,
  SelectButtonVariant
};
