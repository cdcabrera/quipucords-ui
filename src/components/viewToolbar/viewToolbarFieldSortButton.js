import React from 'react';
import { Button, ButtonVariant } from '@patternfly/react-core';
import { SortAmountDownAltIcon, SortAmountUpIcon } from '@patternfly/react-icons';
import PropTypes from 'prop-types';
import { reduxTypes, storeHooks } from '../../redux';
import { API_QUERY_TYPES } from '../../constants/apiConstants';
import { useQuery, useView } from '../view/viewContext';

/**
 * On click sorting.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @param {Function} options.useView
 * @returns {Function}
 */
const useOnClick = ({
  useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
  useView: useAliasView = useView
} = {}) => {
  const { viewId } = useAliasView();
  const dispatch = useAliasDispatch();

  return value => {
    dispatch([
      {
        type: reduxTypes.query.SET_QUERY,
        viewId,
        filter: API_QUERY_TYPES.ORDERING,
        value
      }
    ]);
  };
};

/**
 * Toolbar sort button wrapper.
 *
 * @param {object} props
 * @param {Function} props.useOnClick
 * @param {Function} props.useQuery
 * @param {object} props.props
 * @returns {React.ReactNode}
 */
const ViewToolbarFieldSortButton = ({
  // isAscending,
  useOnClick: useAliasOnClick,
  useQuery: useAliasQuery,
  ...props
}) => {
  const onClick = useAliasOnClick();
  const { [API_QUERY_TYPES.ORDERING]: ordering } = useAliasQuery();

  const isDescending = /^-/.test(ordering);
  let updatedDirection = ordering.replace(/^-/, '');
  updatedDirection = isDescending ? updatedDirection : `-${updatedDirection}`;

  return (
    <Button
      onClick={() => onClick(updatedDirection)}
      variant={ButtonVariant.plain}
      data-test="toolbarSortButton"
      {...props}
    >
      {(isDescending && <SortAmountUpIcon />) || <SortAmountDownAltIcon />}
    </Button>
  );
};

/**
 * Prop types
 *
 * @type {{useQuery: Function, viewId: string, useOnClick: Function}}
 */
ViewToolbarFieldSortButton.propTypes = {
  // isAscending: PropTypes.bool,
  useOnClick: PropTypes.func,
  useQuery: PropTypes.func
};

/**
 * Default props
 *
 * @type {{useQuery: Function, useOnClick: Function}}
 */
ViewToolbarFieldSortButton.defaultProps = {
  // isAscending: true,
  useOnClick,
  useQuery
};

export { ViewToolbarFieldSortButton as default, ViewToolbarFieldSortButton, useOnClick };
