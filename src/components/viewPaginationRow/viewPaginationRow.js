import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@patternfly/react-core';
import { reduxTypes, store } from '../../redux';

class ViewPaginationRow extends React.Component {
  onFirstPage = () => {
    const { viewType } = this.props;
    store.dispatch({
      type: reduxTypes.viewPagination.VIEW_FIRST_PAGE,
      viewType
    });
  };

  onLastPage = () => {
    const { viewType } = this.props;
    store.dispatch({
      type: reduxTypes.viewPagination.VIEW_LAST_PAGE,
      viewType
    });
  };

  onPreviousPage = () => {
    const { viewType } = this.props;
    store.dispatch({
      type: reduxTypes.viewPagination.VIEW_PREVIOUS_PAGE,
      viewType
    });
  };

  onNextPage = () => {
    const { viewType } = this.props;
    store.dispatch({
      type: reduxTypes.viewPagination.VIEW_NEXT_PAGE,
      viewType
    });
  };

  onPageInput = e => {
    const { viewType } = this.props;
    store.dispatch({
      type: reduxTypes.viewPagination.VIEW_PAGE_NUMBER,
      viewType,
      pageNumber: parseInt(e.target.value, 10)
    });
  };

  onPerPageSelect = (_e, perPage) => {
    const { viewType } = this.props;
    store.dispatch({
      type: reduxTypes.viewPagination.SET_PER_PAGE,
      viewType,
      pageSize: perPage
    });
  };

  onSetPage = () => {
    const { viewType } = this.props;
    store.dispatch({
      viewType
    });
  };

  render() {
    const { currentPage, pageSize, totalCount } = this.props;

    const itemsStart = (currentPage - 1) * pageSize + 1;
    const itemsEnd = Math.min(currentPage * pageSize, totalCount);

    return (
      <Pagination
        className="list-view-pagination-top"
        perPageComponent="button"
        perPage={pageSize}
        page={currentPage}
        onSetPage={this.onSetPage}
        itemCount={totalCount}
        itemsStart={itemsStart}
        itemsEnd={itemsEnd}
        onFirstClick={this.onFirstPage}
        onLastClick={this.onLastPage}
        onPreviousClick={this.onPreviousPage}
        onNextClick={this.onNextPage}
        onPageInput={this.onPageInput}
        onPerPageSelect={this.onPerPageSelect}
      />
    );
  }
}

ViewPaginationRow.propTypes = {
  viewType: PropTypes.string,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalCount: PropTypes.number
};

ViewPaginationRow.defaultProps = {
  viewType: null,
  currentPage: 0,
  pageSize: 0,
  totalCount: 0
};

export { ViewPaginationRow as default, ViewPaginationRow };
