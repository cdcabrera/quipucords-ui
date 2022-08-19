import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import _isEqual from 'lodash/isEqual';
// import _size from 'lodash/size';
// import { Alert, AlertVariant, Button, ButtonVariant, EmptyState } from '@patternfly/react-core';
import { Alert, AlertVariant, Button, ButtonVariant, EmptyState, Spinner } from '@patternfly/react-core';
import { IconSize } from '@patternfly/react-icons';
// import { Grid, Icon, ListView, Spinner } from 'patternfly-react';
// import { Spinner } from 'patternfly-react';
// import _get from 'lodash/get';
// import cx from 'classnames';
import { useShallowCompareEffect } from 'react-use';
import { Modal, ModalVariant } from '../modal/modal';
// import { connect, reduxActions, reduxTypes, store } from '../../redux';
import {
  // connect,
  reduxActions,
  reduxTypes,
  // store,
  storeHooks
} from '../../redux';
import helpers from '../../common/helpers';
import ViewToolbar from '../viewToolbar/viewToolbar';
import ViewPaginationRow from '../viewPaginationRow/viewPaginationRow';
import SourcesEmptyState from './sourcesEmptyState';
import { SourceFilterFields, SourceSortFields } from './sourceConstants';
import { translate } from '../i18n/i18n';
import { Table } from '../table/table';
import { sourcesTableCells } from './sourcesTableCells';
import { useOnDelete, useOnEdit, useOnScan, usePoll } from './sourcesContext';

// import _size from 'lodash/size'
// import useGetSources from './sourcesContext'
// import { Tooltip } from '../tooltip/tooltip';
// import { dictionary } from '../../constants/dictionaryConstants';
// import SourceCredentialsList from './sourceCredentialsList';
// import ScanHostList from '../scanHostList/scanHostList';
// import { apiTypes } from '../../constants/apiConstants';

/**
 * A sources view.
 *
 * @param {object} props
 * @param {boolean} props.error
 * @param {string} props.errorMessage
 * @param {Function} props.getSources
 * @param {number} props.lastRefresh
 * @param {boolean} props.pending
 * @param {Array} props.sources
 * @param {Function} props.t
 * @param {boolean} props.updateSources
 * @param {Function} props.useDispatch
 * @param {object} props.viewOptions
 * @param props.data
 * @param props.useOnEdit
 * @param props.useOnDelete
 * @param props.date
 * @param props.update
 * @param props.useOnScan
 * @param props.usePoll
 * @param props.useSelectors
 * @param props.useSelectorsResponse
 * @returns {React.ReactNode}
 */
// const Sources = ({ lastRefresh, t, useGetSources: useAliasGetSources, viewOptions }) => {
const Sources = ({
  // date,
  // error,
  // errorMessage,
  getSources,
  // lastRefresh,
  // pending,
  // data: tempData,
  t,
  // update: refreshUpdate,
  // updateSources,
  useOnEdit: useAliasOnEdit,
  useOnDelete: useAliasOnDelete,
  useOnScan: useAliasOnScan,
  useDispatch: useAliasDispatch,
  useSelectors: useAliasSelectors,
  useSelectorsResponse: useAliasSelectorsResponse,
  usePoll: useAliasPoll
}) => {
  // const [selectedSources, setSelectedSources] = useState();
  const [refreshUpdate, selectedSources, viewOptions] = useAliasSelectors([
    ({ sources }) => sources.update,
    ({ sources }) => sources.selected,
    ({ viewOptions: stateViewOptions }) => stateViewOptions[reduxTypes.view.SOURCES_VIEW]
  ]);
  const {
    data: responseData,
    error,
    message: errorMessage,
    pending,
    responses = {}
  } = useAliasSelectorsResponse({ id: 'view', selector: ({ sources }) => sources.view });
  const [{ date } = {}] = responses.list || [];
  const { results: sources = [] } = responseData.view || {};
  const updatedSelectedSources = Object.values(selectedSources).filter(val => val !== null);

  console.log('>>>>>>>>> RESPONSES', sources, useState);

  // const [updatedSources, setUpdatedSources] = useState([]);
  const pollUpdate = useAliasPoll();
  // const setPoll = useAliasPoll();
  const dispatch = useAliasDispatch();
  const query = helpers.createViewQueryObject(viewOptions);
  const filtersOrSourcesActive = viewOptions?.activeFilters?.length > 0 || sources?.length > 0 || false;
  const onDelete = useAliasOnDelete();
  const onEdit = useAliasOnEdit();
  const onScan = useAliasOnScan();

  useShallowCompareEffect(() => {
    getSources(query)(dispatch);
    // }, [dispatch, getSources, query]);
  }, [dispatch, getSources, pollUpdate, query, refreshUpdate]);

  // useShallowCompareEffect(() => {
  // setUpdatedSources(sources);
  // }, [sources]);
  /*
  useShallowCompareEffect(() => {
    const parsedSources = [];

    sources.forEach(item =>
      parsedSources.push({
        source: item,
        cells: [
          {
            content: sourcesTableCells.description(item),
            width: 20,
            dataLabel: 'Description'
          }
        ]
      })
    );

    setUpdatedSources(parsedSources);
    / *
    setUpdatedSources(() =>
      )
    );
    * /
  }, [onDelete, onEdit, onScan]);
  */

  const onRefresh = () => {
    dispatch({
      type: reduxTypes.sources.UPDATE_SOURCES
    });
  };

  const onSelect = ({ isSelected, data: sourceData }) => {
    dispatch({
      type: isSelected ? reduxTypes.sources.SELECT_SOURCE : reduxTypes.sources.DESELECT_SOURCE,
      viewType: reduxTypes.view.SOURCES_VIEW,
      source: sourceData.source
    });
    /*
    dispatch({
      type: isSelected ? reduxTypes.view.SELECT_ITEM : reduxTypes.view.DESELECT_ITEM,
      viewType: reduxTypes.view.SOURCES_VIEW,
      item: sourceData.source
    });
     */
  };

  const onScanSources = () => {
    dispatch({
      type: reduxTypes.scans.EDIT_SCAN_SHOW,
      sources: updatedSelectedSources
    });
  };

  const onShowAddSourceWizard = () => {
    dispatch({
      type: reduxTypes.sources.CREATE_SOURCE_SHOW
    });
  };

  const renderToolbarActions = () => (
    <React.Fragment>
      <Button onClick={onShowAddSourceWizard}>Add</Button>{' '}
      <Button
        variant={ButtonVariant.secondary}
        isDisabled={updatedSelectedSources.length === 0}
        onClick={onScanSources}
      >
        Scan
      </Button>
    </React.Fragment>
  );

  // const renderActions = () => {};

  if (pending) {
    return (
      <Modal variant={ModalVariant.medium} backdrop={false} isOpen disableFocusTrap>
        <Spinner isSVG size={IconSize.lg} />
        <div className="text-center">{t('view.loading', { context: 'sources' })}</div>
      </Modal>
    );
  }

  if (error) {
    return (
      <EmptyState className="quipucords-empty-state__alert">
        <Alert variant={AlertVariant.danger} title={t('view.error', { context: 'sources' })}>
          {t('view.error-message', { context: ['sources'], message: errorMessage })}
        </Alert>
      </EmptyState>
    );
  }

  return (
    <div className="quipucords-view-container">
      {filtersOrSourcesActive && (
        <React.Fragment>
          <ViewToolbar
            viewType={reduxTypes.view.SOURCES_VIEW}
            filterFields={SourceFilterFields}
            sortFields={SourceSortFields}
            onRefresh={() => onRefresh()}
            lastRefresh={new Date(date).getTime()}
            actions={renderToolbarActions()}
            itemsType="Source"
            itemsTypePlural="Sources"
            selectedCount={viewOptions.selectedItems.length}
            {...viewOptions}
          />
          <ViewPaginationRow viewType={reduxTypes.view.SOURCES_VIEW} {...viewOptions} />
        </React.Fragment>
      )}
      <div className="quipucords-list-container">
        <Table
          onSelect={onSelect}
          rows={sources.map(item => ({
            isSelected: (selectedSources?.[item.id] && true) || false,
            source: item,
            cells: [
              {
                content: sourcesTableCells.description(item),
                width: 20,
                dataLabel: 'Description'
              },
              {
                content: sourcesTableCells.scanStatus(item),
                width: 15,
                dataLabel: 'Scan'
              },
              {
                ...sourcesTableCells.credentialsStatusContent(item),
                width: 10,
                dataLabel: 'Credentials'
              },
              {
                ...sourcesTableCells.okHostsCellContent(item),
                width: 10,
                dataLabel: 'Ok hosts'
              },
              {
                ...sourcesTableCells.failedHostsCellContent(item),
                width: 10,
                dataLabel: 'Failed hosts'
              },
              {
                ...sourcesTableCells.unreachableHostsCellContent(item),
                width: 10,
                dataLabel: 'Unreachable hosts'
              },
              {
                content: sourcesTableCells.actionsCell({
                  item,
                  onDelete: () => onDelete(item),
                  onEdit: () => onEdit(item),
                  onScan: () => onScan(item)
                }),
                isActionCell: true
              }
            ]
          }))}
        >
          <SourcesEmptyState onAddSource={onShowAddSourceWizard} />
        </Table>
      </div>
    </div>
  );
};

/**
 * Prop types
 *
 * @type {{sources: Array, t: Function, lastRefresh: number, pending: boolean, errorMessage: string,
 *     getSources: Function, error: boolean, updateSources: boolean, viewOptions: object}}
 */
Sources.propTypes = {
  // error: PropTypes.bool,
  // errorMessage: PropTypes.string,
  // date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  getSources: PropTypes.func,
  // lastRefresh: PropTypes.number,
  // pending: PropTypes.bool,
  // data: PropTypes.object,
  t: PropTypes.func,
  // updateSources: PropTypes.bool,
  // update: PropTypes.number,
  useDispatch: PropTypes.func,
  useOnDelete: PropTypes.func,
  useOnEdit: PropTypes.func,
  useOnScan: PropTypes.func,
  usePoll: PropTypes.func,
  useSelectors: PropTypes.func,
  useSelectorsResponse: PropTypes.func
  // viewOptions: PropTypes.object
};

/**
 * Default props
 *
 * @type {{sources: *[], t: Function, lastRefresh: number, pending: boolean, errorMessage: null,
 *     getSources: Function, error: boolean, updateSources: boolean, viewOptions: {}}}
 */
Sources.defaultProps = {
  // date: null,
  // error: false,
  // errorMessage: null,
  getSources: reduxActions.sources.getSources,
  // lastRefresh: 0,
  // pending: false,
  // sources: [],
  // data: {},
  t: translate,
  // update: 0,
  // updateSources: false,
  useDispatch: storeHooks.reactRedux.useDispatch,
  useOnDelete,
  useOnEdit,
  useOnScan,
  usePoll,
  // viewOptions: {}
  useSelectors: storeHooks.reactRedux.useSelectors,
  useSelectorsResponse: storeHooks.reactRedux.useSelectorsResponse
};

// const mapDispatchToProps = dispatch => ({
//  getSources: queryObj => dispatch(reduxActions.sources.getSources(queryObj))
// });
/*
const mapStateToProps = state => ({
  ...state.sources.view,
  // lastRefresh: state.sources.lastRefresh,
  update: state.sources.update,
  viewOptions: state.viewOptions[reduxTypes.view.SOURCES_VIEW]
});
 */

// const ConnectedSources = connect(mapStateToProps, mapDispatchToProps)(Sources);
const ConnectedSources = Sources;

export { Sources as default, ConnectedSources, Sources };
