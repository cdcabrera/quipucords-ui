import React from 'react';
import PropTypes from 'prop-types';
import { Alert, AlertVariant, EmptyState, Spinner } from '@patternfly/react-core';
import { IconSize } from '@patternfly/react-icons';
import { Modal, ModalVariant } from '../modal/modal';
import { reduxTypes, storeHooks } from '../../redux';
import ViewToolbar from '../viewToolbar/viewToolbar';
import ViewPaginationRow from '../viewPaginationRow/viewPaginationRow';
import { ScansEmptyState } from './scansEmptyState';
import { ScanFilterFields, ScanSortFields } from './scanConstants';
import { translate } from '../i18n/i18n';
import { Table } from '../table/table';
import { scansTableCells } from './scansTableCells';
import { useGetScans, useOnExpand, useOnRefresh, useOnSelect } from './scansContext';

const VIEW_ID = 'scans';

/**
 * A scans view.
 *
 * @param {object} props
 * @param {Function} props.t
 * @param {Function} props.useGetSources
 * @param {Function} props.useOnDelete
 * @param {Function} props.useOnEdit
 * @param {Function} props.useOnExpand
 * @param {Function} props.useOnRefresh
 * @param {Function} props.useOnScan
 * @param {Function} props.useOnSelect
 * @param {Function} props.useOnShowAddSourceWizard
 * @param {Function} props.useDispatch
 * @param {Function} props.useSelectors
 * @param {string} props.viewId
 * @param props.useGetScans
 * @returns {React.ReactNode}
 */
const Scans = ({
  t,
  useGetScans: useAliasGetScans,
  // useOnDelete: useAliasOnDelete,
  // useOnEdit: useAliasOnEdit,
  useOnExpand: useAliasOnExpand,
  useOnRefresh: useAliasOnRefresh,
  // useOnScan: useAliasOnScan,
  useOnSelect: useAliasOnSelect,
  // useOnShowAddSourceWizard: useAliasOnShowAddSourceWizard,
  // useDispatch: useAliasDispatch,
  useSelectors: useAliasSelectors,
  viewId
}) => {
  // const dispatch = useAliasDispatch();
  // const onDelete = useAliasOnDelete();
  // const onEdit = useAliasOnEdit();
  const onExpand = useAliasOnExpand();
  const onRefresh = useAliasOnRefresh();
  // const onScan = useAliasOnScan();
  const onSelect = useAliasOnSelect();
  // const onShowAddSourceWizard = useAliasOnShowAddSourceWizard();
  const { pending, error, errorMessage, date, data, selectedRows = {}, expandedRows = {} } = useAliasGetScans();
  const [viewOptions = {}] = useAliasSelectors([
    ({ viewOptions: stateViewOptions }) => stateViewOptions[reduxTypes.view.SOURCES_VIEW]
  ]);
  const isActive = viewOptions?.activeFilters?.length > 0 || data?.length > 0 || false;

  console.log('data', data);

  // ToDo: review onScanSources, renderToolbarActions being standalone with upcoming toolbar updates
  /**
   * Toolbar actions onScanSources
   *
   * @event onScanSources
   */
  /*
  const onScanSources = () => {
    dispatch({
      type: reduxTypes.scans.EDIT_SCAN_SHOW,
      sources: Object.values(selectedRows).filter(val => val !== null)
    });
  };
  */

  /**
   * Return toolbar actions.
   *
   * @returns {React.ReactNode}
   */
  /*
  const renderToolbarActions = () => (
    <React.Fragment>
      <Button onClick={onShowAddSourceWizard}>{t('table.label', { context: 'add' })}</Button>{' '}
      <Button
        variant={ButtonVariant.secondary}
        isDisabled={Object.values(selectedRows).filter(val => val !== null).length === 0}
        onClick={onScanSources}
      >
        {t('table.label', { context: 'scan' })}
      </Button>
    </React.Fragment>
  );
   */
  const renderToolbarActions = () => <React.Fragment>actions</React.Fragment>;

  if (pending) {
    return (
      <Modal variant={ModalVariant.medium} backdrop={false} isOpen disableFocusTrap>
        <Spinner isSVG size={IconSize.lg} />
        <div className="text-center">{t('view.loading', { context: viewId })}</div>
      </Modal>
    );
  }

  if (error) {
    return (
      <EmptyState className="quipucords-empty-state__alert">
        <Alert variant={AlertVariant.danger} title={t('view.error', { context: viewId })}>
          {t('view.error-message', { context: [viewId], message: errorMessage })}
        </Alert>
      </EmptyState>
    );
  }

  return (
    <div className="quipucords-view-container">
      {isActive && (
        <React.Fragment>
          <ViewToolbar
            viewType={reduxTypes.view.SOURCES_VIEW}
            filterFields={ScanFilterFields}
            sortFields={ScanSortFields}
            onRefresh={() => onRefresh()}
            lastRefresh={new Date(date).getTime()}
            actions={renderToolbarActions()}
            itemsType="Scan"
            itemsTypePlural="Scans"
            selectedCount={viewOptions.selectedItems?.length}
            {...viewOptions}
          />
          <ViewPaginationRow viewType={reduxTypes.view.SOURCES_VIEW} {...viewOptions} />
        </React.Fragment>
      )}
      <div className="quipucords-list-container">
        <Table
          onExpand={onExpand}
          onSelect={onSelect}
          rows={data?.map((item, index) => {
            console.log('item >>>>', item);
            return {
              isSelected: (selectedRows?.[item.id] && true) || false,
              item,
              cells: [
                {
                  content: scansTableCells.description(item),
                  dataLabel: t('table.header', { context: ['description'] })
                },
                {
                  content: scansTableCells.scanStatus(item, { viewId }),
                  width: 20,
                  dataLabel: t('table.header', { context: ['scan'] })
                },
                {
                  ...scansTableCells.okHostsCellContent(item, { viewId }),
                  isExpanded: expandedRows?.[item.id] === 2,
                  width: 8,
                  dataLabel: t('table.header', { context: ['success', viewId] })
                },
                {
                  ...scansTableCells.failedHostsCellContent(item, { viewId }),
                  isExpanded: expandedRows?.[item.id] === 3,
                  width: 8,
                  dataLabel: t('table.header', { context: ['failed', viewId] })
                },
                {
                  ...scansTableCells.sourcesCellContent(item, { viewId }),
                  isExpanded: expandedRows?.[item.id] === 4,
                  width: 8,
                  dataLabel: t('table.header', { context: ['sources'] })
                },
                {
                  ...scansTableCells.scansCellContent(item, { viewId }),
                  isExpanded: expandedRows?.[item.id] === 5,
                  width: 8,
                  dataLabel: t('table.header', { context: ['scan-jobs'] })
                },
                {
                  style: { textAlign: 'right' },
                  content: scansTableCells.actionsCell({
                    isFirst: index === 0,
                    isLast: index === data.length - 1,
                    item,
                    onCancel: () => console.log('on cancel'),
                    onDownload: () => console.log('on download'),
                    onResume: () => console.log('on resume'),
                    onPause: () => console.log('on pause'),
                    onStart: () => console.log('on start')
                  }),
                  isActionCell: true
                }
              ]
            };
          })}
        >
          <ScansEmptyState viewId={viewId} />
        </Table>
      </div>
    </div>
  );
};

/**
 * Prop types
 *
 * @type {{useOnEdit: Function, useOnSelect: Function, viewId: string, t: Function, useOnRefresh: Function, useOnScan: Function,
 *     useDispatch: Function, useOnDelete: Function, useOnExpand: Function, useGetSources: Function, useSelectors: Function,
 *     useOnShowAddSourceWizard: Function}}
 */
Scans.propTypes = {
  t: PropTypes.func,
  // useDispatch: PropTypes.func,
  useGetScans: PropTypes.func,
  // useOnDelete: PropTypes.func,
  // useOnEdit: PropTypes.func,
  useOnExpand: PropTypes.func,
  useOnRefresh: PropTypes.func,
  // useOnScan: PropTypes.func,
  useOnSelect: PropTypes.func,
  // useOnShowAddSourceWizard: PropTypes.func,
  useSelectors: PropTypes.func,
  viewId: PropTypes.string
};

/**
 * Default props
 *
 * @type {{useOnEdit: Function, useOnSelect: Function, viewId: string, t: translate, useOnRefresh: Function, useOnScan: Function,
 *     useDispatch: Function, useOnDelete: Function, useOnExpand: Function, useGetSources: Function, useSelectors: Function,
 *     useOnShowAddSourceWizard: Function}}
 */
Scans.defaultProps = {
  t: translate,
  // useDispatch: storeHooks.reactRedux.useDispatch,
  useGetScans,
  // useOnDelete,
  // useOnEdit,
  useOnExpand,
  useOnRefresh,
  // useOnScan,
  useOnSelect,
  // useOnShowAddSourceWizard,
  useSelectors: storeHooks.reactRedux.useSelectors,
  viewId: VIEW_ID
};

export { Scans as default, Scans, VIEW_ID };
