import React from 'react';
import PropTypes from 'prop-types';
import { PaginationRow, PAGINATION_VIEW } from 'patternfly-react';
import { reduxTypes, store } from '../../redux';

const ViewPaginationRow = ({ currentPage, pageSize, perPageOptions, totalCount, totalPages, viewType }) => {
  const onFirstPage = () => {
    store.dispatch({
      type: reduxTypes.viewPagination.VIEW_FIRST_PAGE,
      viewType
    });
  };

  const onLastPage = () => {
    store.dispatch({
      type: reduxTypes.viewPagination.VIEW_LAST_PAGE,
      viewType
    });
  };

  const onPreviousPage = () => {
    store.dispatch({
      type: reduxTypes.viewPagination.VIEW_PREVIOUS_PAGE,
      viewType
    });
  };

  const onNextPage = () => {
    store.dispatch({
      type: reduxTypes.viewPagination.VIEW_NEXT_PAGE,
      viewType
    });
  };

  const onPageInput = e => {
    store.dispatch({
      type: reduxTypes.viewPagination.VIEW_PAGE_NUMBER,
      viewType,
      pageNumber: parseInt(e.target.value, 10)
    });
  };

  const onPerPageSelect = eventKey => {
    store.dispatch({
      type: reduxTypes.viewPagination.SET_PER_PAGE,
      viewType,
      pageSize: eventKey
    });
  };

  const rowPagination = {
    page: currentPage,
    perPage: pageSize,
    perPageOptions
  };

  const itemsStart = (currentPage - 1) * pageSize + 1;
  const itemsEnd = Math.min(currentPage * pageSize, totalCount);

  return (
    <React.Fragment>
      <PaginationRow
        className="list-view-pagination-top"
        viewType={PAGINATION_VIEW.LIST}
        pagination={rowPagination}
        amountOfPages={totalPages}
        pageSizeDropUp={false}
        pageInputValue={currentPage}
        itemCount={totalCount}
        itemsStart={itemsStart}
        itemsEnd={itemsEnd}
        onFirstPage={onFirstPage}
        onLastPage={onLastPage}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onPageInput={onPageInput}
        onPerPageSelect={onPerPageSelect}
      />
    </React.Fragment>
  );
};

ViewPaginationRow.propTypes = {
  viewType: PropTypes.string,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  perPageOptions: PropTypes.arrayOf(PropTypes.number),
  totalCount: PropTypes.number,
  totalPages: PropTypes.number
};

ViewPaginationRow.defaultProps = {
  viewType: null,
  currentPage: 0,
  pageSize: 0,
  perPageOptions: [10, 15, 25, 50, 100],
  totalCount: 0,
  totalPages: 0
};

export { ViewPaginationRow as default, ViewPaginationRow };
