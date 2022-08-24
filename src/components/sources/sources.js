import React from 'react';
import PropTypes from 'prop-types';
import { Alert, AlertVariant, Button, ButtonVariant, EmptyState, Spinner } from '@patternfly/react-core';
import { IconSize } from '@patternfly/react-icons';
import { useShallowCompareEffect } from 'react-use';
import { Modal, ModalVariant } from '../modal/modal';
import { reduxActions, reduxTypes, storeHooks } from '../../redux';
import helpers from '../../common/helpers';
import ViewToolbar from '../viewToolbar/viewToolbar';
import ViewPaginationRow from '../viewPaginationRow/viewPaginationRow';
import SourcesEmptyState from './sourcesEmptyState';
import { SourceFilterFields, SourceSortFields } from './sourceConstants';
import { translate } from '../i18n/i18n';
import { Table } from '../table/table-temp';
import { sourcesTableCells } from './sourcesTableCells';
import { useOnDelete, useOnEdit, useOnScan, usePoll } from './sourcesContext';

/**
 * A sources view.
 *
 * @param {object} props
 * @param {Function} props.getSources
 * @param {Function} props.t
 * @param {Function} props.useOnEdit
 * @param {Function} props.useOnDelete
 * @param {Function} props.useOnScan
 * @param {Function} props.useDispatch
 * @param {Function} props.useSelectors
 * @param {Function} props.useSelectorsResponse
 * @param {Function} props.usePoll
 * @returns {React.ReactNode}
 */
const Sources = ({
  getSources,
  t,
  useOnEdit: useAliasOnEdit,
  useOnDelete: useAliasOnDelete,
  useOnScan: useAliasOnScan,
  useDispatch: useAliasDispatch,
  useSelectors: useAliasSelectors,
  useSelectorsResponse: useAliasSelectorsResponse,
  usePoll: useAliasPoll
}) => {
  const pollUpdate = useAliasPoll();
  const dispatch = useAliasDispatch();
  const onDelete = useAliasOnDelete();
  const onEdit = useAliasOnEdit();
  const onScan = useAliasOnScan();

  const [refreshUpdate, selectedSources, expandedSources, viewOptions] = useAliasSelectors([
    ({ sources }) => sources.update,
    ({ sources }) => sources.selected,
    ({ sources }) => sources.expanded,
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
  const query = helpers.createViewQueryObject(viewOptions);
  const filtersOrSourcesActive = viewOptions?.activeFilters?.length > 0 || sources?.length > 0 || false;

  useShallowCompareEffect(() => {
    getSources(query)(dispatch);
  }, [dispatch, getSources, pollUpdate, query, refreshUpdate]);

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
  };

  const onExpand = ({ isExpanded, cellIndex, data: sourceData }) => {
    dispatch({
      type: isExpanded ? reduxTypes.sources.EXPANDED_SOURCE : reduxTypes.sources.NOT_EXPANDED_SOURCE,
      viewType: reduxTypes.view.SOURCES_VIEW,
      source: sourceData.source,
      cellIndex
    });
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
          onExpand={onExpand}
          onSelect={onSelect}
          rows={sources.map(item => ({
            isSelected: (selectedSources?.[item.id] && true) || false,
            source: item,
            cells: [
              {
                content: sourcesTableCells.description(item),
                dataLabel: 'Description'
              },
              {
                content: sourcesTableCells.scanStatus(item),
                width: 20,
                dataLabel: 'Scan'
              },
              {
                ...sourcesTableCells.credentialsCellContent(item),
                isExpanded: expandedSources?.[item.id] === 2,
                width: 8,
                dataLabel: 'Credentials'
              },
              {
                ...sourcesTableCells.okHostsCellContent(item),
                isExpanded: expandedSources?.[item.id] === 3,
                width: 8,
                dataLabel: 'Ok hosts'
              },
              {
                ...sourcesTableCells.failedHostsCellContent(item),
                isExpanded: expandedSources?.[item.id] === 4,
                width: 8,
                dataLabel: 'Failed hosts'
              },
              {
                ...sourcesTableCells.unreachableHostsCellContent(item),
                isExpanded: expandedSources?.[item.id] === 5,
                width: 8,
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
 * @type {{useOnEdit: Function, t: Function, useOnScan: Function, useDispatch: Function, useOnDelete: Function,
 *     useSelectorsResponse: Function, getSources: Function, useSelectors: Function, usePoll: Function}}
 */
Sources.propTypes = {
  getSources: PropTypes.func,
  t: PropTypes.func,
  useDispatch: PropTypes.func,
  useOnDelete: PropTypes.func,
  useOnEdit: PropTypes.func,
  useOnScan: PropTypes.func,
  usePoll: PropTypes.func,
  useSelectors: PropTypes.func,
  useSelectorsResponse: PropTypes.func
};

/**
 * Default props
 *
 * @type {{useOnEdit: Function, t: translate, useOnScan: Function, useDispatch: Function, useOnDelete: Function,
 *     useSelectorsResponse: Function, getSources: Function, useSelectors: Function, usePoll: Function}}
 */
Sources.defaultProps = {
  getSources: reduxActions.sources.getSources,
  t: translate,
  useDispatch: storeHooks.reactRedux.useDispatch,
  useOnDelete,
  useOnEdit,
  useOnScan,
  usePoll,
  useSelectors: storeHooks.reactRedux.useSelectors,
  useSelectorsResponse: storeHooks.reactRedux.useSelectorsResponse
};

const ConnectedSources = Sources;

export { Sources as default, ConnectedSources, Sources };
