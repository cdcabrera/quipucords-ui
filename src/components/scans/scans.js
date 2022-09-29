import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  AlertVariant,
  Button,
  ButtonVariant,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStatePrimary,
  EmptyStateVariant,
  Spinner,
  Title,
  TitleSizes
} from '@patternfly/react-core';
import { AddCircleOIcon, IconSize, SearchIcon } from '@patternfly/react-icons';
import { Modal, ModalVariant } from '../modal/modal';
import { Tooltip } from '../tooltip/tooltip';
import { reduxTypes, storeHooks } from '../../redux';
import { useView } from '../view/viewContext';
import { useToolbarFieldClearAll } from '../viewToolbar/viewToolbarContext';
import { ViewToolbar } from '../viewToolbar/viewToolbar';
import { ViewPaginationRow } from '../viewPaginationRow/viewPaginationRow';
import { Table } from '../table/table';
import { scansTableCells } from './scansTableCells';
import { VIEW_ID, INITIAL_QUERY, useGetScans, useOnAddSource, useOnExpand, useOnScanAction, useOnSelect } from './scansContext';
import { ScansToolbar } from './scansToolbar';
import { translate } from '../i18n/i18n';
import { helpers } from '../../common';

const CONFIG = {
  viewId: VIEW_ID,
  initialQuery: INITIAL_QUERY,
  toolbar: ScansToolbar
};

/**
 * A scans view.
 *
 * @param {object} props
 * @param {Function} props.t
 * @param {Function} props.useGetScans
 * @param {Function} props.useOnExpand
 * @param {Function} props.useOnScanAction
 * @param {Function} props.useOnSelect
 * @param {Function} props.useDispatch
 * @param {Function} props.useToolbarFieldClearAll
 * @param {Function} props.useView
 * @param props.uiShortName
 * @returns {React.ReactNode}
 */
const Scans = ({
  t,
  uiShortName,
  useGetScans: useAliasGetScans,
  useOnAddSource: useAliasOnAddSource,
  useOnExpand: useAliasOnExpand,
  useOnScanAction: useAliasOnScanAction,
  useOnSelect: useAliasOnSelect,
  useDispatch: useAliasDispatch,
  useToolbarFieldClearAll: useAliasToolbarFieldClearAll,
  useView: useAliasView
}) => {
  const onToolbarFieldClearAll = useAliasToolbarFieldClearAll();
  const { isFilteringActive, viewId } = useAliasView();
  const dispatch = useAliasDispatch();
  const onExpand = useAliasOnExpand();
  const { onCancel, onDownload, onPause, onRestart, onStart } = useAliasOnScanAction();
  const onSelect = useAliasOnSelect();
  const onAddSource = useAliasOnAddSource();
  const {
    pending,
    error,
    errorMessage,
    fulfilled,
    date,
    data,
    selectedRows = {},
    expandedRows = {},
    totalResults
  } = useAliasGetScans();
  const isActive = isFilteringActive || data?.length > 0 || false;

  /**
   * Toolbar actions onScanSources
   *
   * @event onMergeReports
   */
  const onMergeReports = () => {
    dispatch({
      type: reduxTypes.scans.MERGE_SCAN_DIALOG_SHOW,
      show: true,
      scans: Object.values(selectedRows).filter(val => val !== null)
    });
  };

  /**
   * Return toolbar actions.
   *
   * @returns {React.ReactNode}
   */
  const renderToolbarActions = () => (
    <Tooltip content={t('table.tooltip', { context: ['merge-reports'] })}>
      <Button
        variant={ButtonVariant.primary}
        isDisabled={Object.values(selectedRows).filter(val => val !== null).length <= 1}
        onClick={onMergeReports}
      >
        {t('table.label', { context: ['merge-reports'] })}
      </Button>
    </Tooltip>
  );

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
          {t('view.error-message', {
            context: [viewId],
            message: errorMessage
          })}
        </Alert>
      </EmptyState>
    );
  }

  return (
    <div className="quipucords-content">
      <div className="quipucords-view-container">
        {isActive && (
          <React.Fragment>
            <ViewToolbar lastRefresh={new Date(date).getTime()} secondaryFields={renderToolbarActions()} />
            <ViewPaginationRow totalResults={totalResults} />
          </React.Fragment>
        )}
        <div className="quipucords-list-container">
          <Table
            onExpand={onExpand}
            onSelect={onSelect}
            rows={data?.map((item, index) => ({
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
                    onCancel: () => onCancel(item),
                    onDownload: () => onDownload(item),
                    onRestart: () => onRestart(item),
                    onPause: () => onPause(item),
                    onStart: () => onStart(item)
                  }),
                  isActionCell: true
                }
              ]
            }))}
          >
            {fulfilled && isActive && (
              <EmptyState className="quipucords-empty-state" variant={EmptyStateVariant.large}>
                <EmptyStateIcon icon={SearchIcon} />
                <Title size={TitleSizes.lg} headingLevel="h1">
                  {t('view.empty-state', { context: ['filter', 'title'] })}
                </Title>
                <EmptyStateBody>{t('view.empty-state', { context: ['filter', 'description'] })}</EmptyStateBody>
                <EmptyStatePrimary>
                  <Button variant={ButtonVariant.link} onClick={onToolbarFieldClearAll}>
                    {t('view.empty-state', { context: ['label', 'clear'] })}
                  </Button>
                </EmptyStatePrimary>
              </EmptyState>
            )}
            {fulfilled && !isActive && (
              <EmptyState className="quipucords-empty-state" variant={EmptyStateVariant.large}>
                <EmptyStateIcon icon={AddCircleOIcon} />
                <Title headingLevel="h1">
                  {t('view.empty-state', { context: ['title', viewId], count: totalResults, name: uiShortName })}
                </Title>
                <EmptyStateBody>
                  {t('view.empty-state', { context: ['description', viewId], count: totalResults })}
                </EmptyStateBody>
                <EmptyStatePrimary>
                  <Button onClick={onAddSource}>
                    {t('view.empty-state', { context: ['label', 'source-navigate'], count: totalResults })}
                  </Button>
                </EmptyStatePrimary>
              </EmptyState>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

/**
 * Prop types
 *
 * @type {{useOnSelect: Function, useView: Function, t: Function, useOnScanAction: Function,
 *     useDispatch: Function, useGetScans: Function, useOnExpand: Function, useToolbarFieldClearAll: Function}}
 */
Scans.propTypes = {
  t: PropTypes.func,
  uiShortName: PropTypes.string,
  useDispatch: PropTypes.func,
  useGetScans: PropTypes.func,
  useOnAddSource: PropTypes.func,
  useOnExpand: PropTypes.func,
  useOnScanAction: PropTypes.func,
  useOnSelect: PropTypes.func,
  useToolbarFieldClearAll: PropTypes.func,
  useView: PropTypes.func
};

/**
 * Default props
 *
 * @type {{useOnSelect: Function, useView: Function, t: translate, useOnScanAction: Function,
 *     useDispatch: Function, useGetScans: Function, useOnExpand: Function, useToolbarFieldClearAll: Function}}
 */
Scans.defaultProps = {
  t: translate,
  uiShortName: helpers.UI_SHORT_NAME,
  useDispatch: storeHooks.reactRedux.useDispatch,
  useOnAddSource,
  useGetScans,
  useOnExpand,
  useOnScanAction,
  useOnSelect,
  useToolbarFieldClearAll,
  useView
};

export { Scans as default, Scans, CONFIG };
