import React from 'react';
import { Button, ButtonVariant } from '@patternfly/react-core';
import { SortAmountDownAltIcon, SortAmountUpIcon } from '@patternfly/react-icons';
import PropTypes from 'prop-types';
import { reduxTypes, storeHooks } from '../../redux';

/**
 * On click sorting.
 *
 * @param {string} viewType
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnClick = (viewType, { useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return value =>
    dispatch([
      {
        type: reduxTypes.viewToolbar.TOGGLE_SORT_ASCENDING,
        viewType,
        sortAscending: value
      }
    ]);
};

/**
 * Toolbar sort button wrapper.
 *
 * @param {object} props
 * @param {boolean} props.isAscending
 * @param {Function} props.useOnClick
 * @param {Function} props.useSelector
 * @param {string} props.viewType
 * @param {object} props.props
 * @returns {React.ReactNode}
 */
const ViewToolbarFieldSortButton = ({
  isAscending,
  useOnClick: useAliasOnClick,
  useSelector: useAliasSelector,
  viewType,
  ...props
}) => {
  const updatedIsAscending = useAliasSelector(({ viewOptions }) => viewOptions?.[viewType]?.sortAscending, isAscending);
  const onClick = useAliasOnClick(viewType);

  return (
    <Button onClick={() => onClick(!updatedIsAscending)} variant={ButtonVariant.plain} {...props}>
      {(updatedIsAscending && <SortAmountDownAltIcon />) || <SortAmountUpIcon />}
    </Button>
  );
};

/**
 * Prop types
 *
 * @type {{useSelector: Function, viewType: string, useOnClick: Function, isAscending: boolean}}
 */
ViewToolbarFieldSortButton.propTypes = {
  isAscending: PropTypes.bool,
  useOnClick: PropTypes.func,
  useSelector: PropTypes.func,
  viewType: PropTypes.string
};

/**
 * Default props
 *
 * @type {{useSelector: Function, viewType: null, useOnClick: Function, isAscending: boolean}}
 */
ViewToolbarFieldSortButton.defaultProps = {
  isAscending: true,
  useOnClick,
  useSelector: storeHooks.reactRedux.useSelector,
  viewType: null
};

export { ViewToolbarFieldSortButton as default, ViewToolbarFieldSortButton, useOnClick };
