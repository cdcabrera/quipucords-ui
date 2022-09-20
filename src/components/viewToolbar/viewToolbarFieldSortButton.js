import React from 'react';
import { Button, ButtonVariant } from '@patternfly/react-core';
import { SortAmountDownAltIcon, SortAmountUpIcon } from '@patternfly/react-icons';
import PropTypes from 'prop-types';
import { reduxTypes, storeHooks } from '../../redux';
import { API_QUERY_TYPES } from '../../constants/apiConstants';

/**
 * On click sorting.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @param {string} options.viewId
 * @returns {Function}
 */
const useOnClick = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch, viewId } = {}) => {
  const dispatch = useAliasDispatch();

  return value =>
    dispatch([
      {
        type: reduxTypes.query.SET_QUERY_TYPES[(value && API_QUERY_TYPES.ORDERING_DSC) || API_QUERY_TYPES.ORDERING_ASC],
        viewId
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
  const updatedOrdering = useAliasSelector(
    ({ view }) => view?.query?.[viewId]?.[API_QUERY_TYPES.ORDERING],
    isAscending
  );
  const updatedIsAscending = !/^-/.test(updatedOrdering);
  const onClick = useAliasOnClick({ viewId });

  return (
    <Button
      onClick={() => onClick(!updatedIsAscending)}
      variant={ButtonVariant.plain}
      data-test="toolbarSortButton"
      {...props}
    >
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
