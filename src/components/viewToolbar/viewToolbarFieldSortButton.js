import React from 'react';
import { Button, ButtonVariant } from '@patternfly/react-core';
import { SortAmountDownAltIcon, SortAmountUpIcon } from '@patternfly/react-icons';
import PropTypes from 'prop-types';
import { reduxTypes, storeHooks } from '../../redux';

/**
 * On click sorting.
 *
 * @param {string} viewId
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnClick = (viewId, { useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return value =>
    dispatch([
      {
        type: reduxTypes.viewToolbar.TOGGLE_SORT_ASCENDING,
        viewId,
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
 * @param {string} props.viewId
 * @param {object} props.props
 * @returns {React.ReactNode}
 */
const ViewToolbarFieldSortButton = ({
  isAscending,
  useOnClick: useAliasOnClick,
  useSelector: useAliasSelector,
  viewId,
  ...props
}) => {
  const updatedIsAscending = useAliasSelector(({ viewOptions }) => viewOptions?.[viewId]?.sortAscending, isAscending);
  const onClick = useAliasOnClick(viewId);

  return (
    <Button onClick={() => onClick(!updatedIsAscending)} variant={ButtonVariant.plain} {...props}>
      {(updatedIsAscending && <SortAmountDownAltIcon />) || <SortAmountUpIcon />}
    </Button>
  );
};

/**
 * Prop types
 *
 * @type {{useSelector: Function, viewId: string, useOnClick: Function, isAscending: boolean}}
 */
ViewToolbarFieldSortButton.propTypes = {
  isAscending: PropTypes.bool,
  useOnClick: PropTypes.func,
  useSelector: PropTypes.func,
  viewId: PropTypes.string
};

/**
 * Default props
 *
 * @type {{useSelector: Function, viewId: null, useOnClick: Function, isAscending: boolean}}
 */
ViewToolbarFieldSortButton.defaultProps = {
  isAscending: true,
  useOnClick,
  useSelector: storeHooks.reactRedux.useSelector,
  viewId: null
};

export { ViewToolbarFieldSortButton as default, ViewToolbarFieldSortButton, useOnClick };
