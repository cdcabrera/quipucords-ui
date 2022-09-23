import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationVariant } from '@patternfly/react-core';
import { reduxTypes, storeHooks } from '../../redux';
import { useView } from '../view/viewContext';
import { API_QUERY_TYPES } from '../../constants/apiConstants';
import { helpers } from '../../common';

/**
 * View pagination
 *
 * @fires onPerPageSelect
 * @fires onSetPage
 * @param {object} props
 * @param {number} props.totalResults
 * @param {Function} props.useDispatch
 * @param {Function} props.useView
 * @returns {React.ReactNode}
 */
const ViewPaginationRow = ({ totalResults, useDispatch: useAliasDispatch, useView: useAliasView }) => {
  const dispatch = useAliasDispatch();
  const { query, viewId } = useAliasView();
  const { [API_QUERY_TYPES.PAGE]: currentPage = 0, [API_QUERY_TYPES.PAGE_SIZE]: pageSize = 0 } = query || {};
  let updatedTotalResults = totalResults;

  if (helpers.DEV_MODE) {
    updatedTotalResults = helpers.devModeNormalizeCount(totalResults);
  }

  /**
   * Select entries per page
   *
   * @event onPerPageSelect
   * @param {*|string|number} value
   */
  const onPerPageSelect = value => {
    dispatch([
      {
        type: reduxTypes.view.RESET_PAGE,
        viewId
      },
      {
        type: reduxTypes.view.SET_QUERY,
        viewId,
        filter: API_QUERY_TYPES.PAGE_SIZE,
        value
      }
    ]);
  };

  /**
   * Set page
   *
   * @event onSetPage
   * @param {*|string|number} value
   */
  const onSetPage = value => {
    dispatch({
      type: reduxTypes.view.SET_QUERY,
      viewId,
      filter: API_QUERY_TYPES.PAGE,
      value
    });
  };

  const itemsStart = (currentPage - 1) * pageSize + 1;
  const itemsEnd = Math.min(currentPage * pageSize, updatedTotalResults);

  return (
    <Pagination
      className="quipucords-view__pagination"
      perPageComponent="button"
      dropDirection="down"
      perPage={pageSize}
      page={currentPage}
      onSetPage={(_, value) => onSetPage(value)}
      itemCount={updatedTotalResults}
      itemsStart={itemsStart}
      itemsEnd={itemsEnd}
      onPerPageSelect={(_, value) => onPerPageSelect(value)}
      variant={PaginationVariant.bottom}
    />
  );
};

/**
 * Prop types
 *
 * @type {{totalResults: number, useView: Function, useDispatch: Function}}
 */
ViewPaginationRow.propTypes = {
  totalResults: PropTypes.number,
  useDispatch: PropTypes.func,
  useView: PropTypes.func
};

/**
 * Default props
 *
 * @type {{totalResults: number, useView: Function, useDispatch: Function}}
 */
ViewPaginationRow.defaultProps = {
  totalResults: 0,
  useDispatch: storeHooks.reactRedux.useDispatch,
  useView
};

export { ViewPaginationRow as default, ViewPaginationRow };
