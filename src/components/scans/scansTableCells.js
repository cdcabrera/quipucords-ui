import React from 'react';
import {
  Button,
  ButtonVariant,
  Grid,
  GridItem,
  // List,
  // ListItem,
  OverflowMenu,
  OverflowMenuControl,
  OverflowMenuContent,
  OverflowMenuGroup,
  OverflowMenuItem
} from '@patternfly/react-core';
import { PencilAltIcon, TrashIcon, EllipsisVIcon } from '@patternfly/react-icons';
import { ContextIcon, ContextIconVariant } from '../contextIcon/contextIcon';
import { Tooltip } from '../tooltip/tooltip';
// import { dictionary } from '../../constants/dictionaryConstants';
import { ConnectedScanHostList as ScanHostList } from '../scanHostList/scanHostList';
import { apiTypes } from '../../constants/apiConstants';
import { translate } from '../i18n/i18n';
import { helpers } from '../../common';
import { DropdownSelect, SelectButtonVariant, SelectDirection, SelectPosition } from '../dropdownSelect/dropdownSelect';

/**
 * Source description and type icon
 *
 * @param {object} params
 * @param {string} params.name
 * @param params.id
 * @returns {React.ReactNode}
 */
const description = ({ id, name } = {}) => (
  <Grid hasGutter={false}>
    <GridItem sm={2} />
    <GridItem sm={10}>
      <div>
        <strong>{name || id}</strong>
      </div>
    </GridItem>
  </Grid>
);

/**
 * Scan status, icon and description
 *
 * @param {object} params
 * @param {object} params.most_recent
 * @param {object} options
 * @param {Function} options.t
 * @param options.viewId
 * @returns {React.ReactNode|null}
 */
// const scanStatus = ({ connection: scan = {} } = {}, { t = translate } = {}) => {
const scanStatus = ({ [apiTypes.API_RESPONSE_SCAN_MOST_RECENT]: scan = {} } = {}, { t = translate, viewId } = {}) => {
  const {
    // end_time: endTime,
    // start_time: startTime,
    // status,
    [apiTypes.API_RESPONSE_SCAN_MOST_RECENT_STATUS]: status,
    [apiTypes.API_RESPONSE_SCAN_MOST_RECENT_END_TIME]: endTime,
    [apiTypes.API_RESPONSE_SCAN_MOST_RECENT_START_TIME]: startTime
  } = scan;
  const isPending = status === 'created' || status === 'pending' || status === 'running';
  const scanTime = (isPending && startTime) || endTime;

  return (
    <Grid hasGutter={false}>
      <GridItem sm={2}>
        <ContextIcon symbol={ContextIconVariant[status]} />
      </GridItem>
      <GridItem sm={10}>
        <div>{t('table.label', { context: ['status', status, viewId] })}</div>
        {helpers.getTimeDisplayHowLongAgo(scanTime)}
      </GridItem>
    </Grid>
  );

  /*
  const { scan } = this.props;
  const scanStatus = scan.mostRecentStatus;
  const statusIconInfo = helpers.scanStatusIcon(scanStatus);

  const icon = statusIconInfo ? (
    <Icon
      className={cx('scan-status-icon', ...statusIconInfo.classNames)}
      type={statusIconInfo.type}
      name={statusIconInfo.name}
    />
  ) : null;

  let scanTime = scan.mostRecentEndTime;

  if (scanStatus === 'pending' || scanStatus === 'running') {
    scanTime = scan.mostRecentStartTime;
  }

  return (
    <div className="scan-description">
      {icon}
      <div className="scan-status-text">
        <div>{(scan.mostRecentStatusMessage && scan.mostRecentStatusMessage) || 'Scan created'}</div>
        <div className="text-muted">{scanTime && helpers.getTimeDisplayHowLongAgo(scanTime)}</div>
      </div>
    </div>
  );
   */
};

/**
 * Generate a consistent status cell.
 *
 * @param {object} params
 * @param {number} params.count
 * @param {string} params.status
 * @param {Function} params.t
 * @param {string} params.viewId
 * @returns {React.ReactNode}
 */
const statusCell = ({ count, status = ContextIconVariant.unknown, t = translate, viewId } = {}) => {
  let updatedCount = count || 0;

  if (helpers.DEV_MODE) {
    updatedCount = helpers.devModeNormalizeCount(updatedCount);
  }

  return (
    <Tooltip content={t('table.label', { context: ['status', 'tooltip', status, viewId], count: updatedCount })}>
      {t('table.label', { context: ['status', 'cell', viewId], count: updatedCount }, [
        <ContextIcon symbol={status} />,
        <strong />
      ])}
    </Tooltip>
  );
};

/**
 * Generate a consistent display row for expandable content.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.status
 * @param {object} options
 * @param {boolean} options.useConnectionResults
 * @param {boolean} options.useInspectionResults
 * @returns {React.ReactNode}
 */
const statusContent = ({ id, status } = {}, { useConnectionResults = false, useInspectionResults = false } = {}) => (
  <ScanHostList
    key={`status-content-${id}-${status}`}
    id={id}
    filter={{ [apiTypes.API_QUERY_STATUS]: status }}
    useConnectionResults={useConnectionResults}
    useInspectionResults={useInspectionResults}
  >
    {({ host }) => (
      <Grid key={`hostsRow-${host?.credentialName}`}>
        <GridItem xs={6} sm={4} md={3}>
          <ContextIcon symbol={ContextIconVariant[host?.status]} /> {host?.name}
        </GridItem>
        <GridItem xs={6} sm={8} md={9}>
          {host?.sourceName}
        </GridItem>
      </Grid>
    )}
  </ScanHostList>
);
/**
 * Failed hosts cell and expandable content.
 *
 * @param {object} params
 * @param {object} options
 * @param {string} options.viewId
 * @returns {{cell: React.ReactNode, content: React.ReactNode}}
 */
const failedHostsCellContent = ({ [apiTypes.API_RESPONSE_SCAN_MOST_RECENT]: mostRecent } = {}, { viewId } = {}) => {
  const {
    [apiTypes.API_RESPONSE_SCAN_MOST_RECENT_SYS_FAILED]: systemsScanned,
    [apiTypes.API_RESPONSE_SCAN_MOST_RECENT_ID]: mostRecentId
  } = mostRecent;
  const count = Number.parseInt(systemsScanned, 10);

  return {
    content: statusCell({ count, status: ContextIconVariant.failed, viewId }),
    expandedContent:
      (count &&
        statusContent({ id: mostRecentId, status: ContextIconVariant.failed }, { useInspectionResults: true })) ||
      undefined
  };
};

/**
 * Ok hosts cell and expandable content.
 *
 * @param {object} params
 * @param {object} options
 * @param {string} options.viewId
 * @returns {{cell: React.ReactNode, content: React.ReactNode}}
 */
const okHostsCellContent = ({ [apiTypes.API_RESPONSE_SCAN_MOST_RECENT]: mostRecent } = {}, { viewId } = {}) => {
  const {
    [apiTypes.API_RESPONSE_SCAN_MOST_RECENT_SYS_SCANNED]: systemsScanned,
    [apiTypes.API_RESPONSE_SCAN_MOST_RECENT_ID]: mostRecentId
  } = mostRecent;
  const count = Number.parseInt(systemsScanned, 10);

  return {
    content: statusCell({ count, status: ContextIconVariant.success, viewId }),
    expandedContent:
      (count &&
        statusContent({ id: mostRecentId, status: ContextIconVariant.success }, { useInspectionResults: true })) ||
      undefined
  };
};

const sourcesCellContent = ({ [apiTypes.API_RESPONSE_SCAN_SOURCES]: sources } = {}, { viewId } = {}) => {
  const count = sources.length;

  return {
    content: statusCell({ count, status: 'sources', viewId })
    // expandedContent: (count && statusContent({ connection, id, status: ContextIconVariant.unreachable })) || undefined
  };
};

const scansCellContent = ({ [apiTypes.API_RESPONSE_SCAN_JOBS]: scanJobs } = {}, { viewId } = {}) => {
  const count = scanJobs.length;

  return {
    content: statusCell({ count, status: 'scans', viewId })
    // expandedContent: (count && statusContent({ connection, id, status: ContextIconVariant.unreachable })) || undefined
  };
};

/**
 * Unreachable hosts cell and expandable content.
 *
 * @param {object} params
 * @param {object} params.connection
 * @param {string} params.id
 * @returns {{cell: React.ReactNode, content: React.ReactNode}}
 */
const unreachableHostsCellContent = ({ connection, id } = {}) => {
  const count = Number.parseInt(connection?.source_systems_unreachable, 10);

  return {
    content: statusCell({ count, status: ContextIconVariant.unreachable }),
    expandedContent: (count && statusContent({ connection, id, status: ContextIconVariant.unreachable })) || undefined
  };
};

// FixMe: PF Overflow menu is attempting state updates on unmounted components
/**
 * Action cell content
 *
 * @param {object} params
 * @param {boolean} params.isFirst
 * @param {boolean} params.isLast
 * @param {object} params.item
 * @param {Function} params.onScan
 * @param {Function} params.onDelete
 * @param {Function} params.onEdit
 * @param {Function} params.t
 * @returns {React.ReactNode}
 */
const actionsCell = ({
  isFirst = false,
  isLast = false,
  item = {},
  onScan = helpers.noop,
  onDelete = helpers.noop,
  onEdit = helpers.noop,
  t = translate
} = {}) => {
  const onSelect = ({ value }) => {
    switch (value) {
      case 'edit':
        return onEdit(item);
      case 'delete':
        return onDelete(item);
      case 'scan':
      default:
        return onScan(item);
    }
  };

  return (
    <OverflowMenu breakpoint="lg">
      <OverflowMenuContent>
        <OverflowMenuGroup groupType="button">
          <OverflowMenuItem key="tooltip-edit">
            <Tooltip content={t('table.label', { context: 'edit' })}>
              <Button
                className="quipucords-view__row-button"
                onClick={() => onEdit(item)}
                aria-label={t('table.label', { context: 'edit' })}
                variant={ButtonVariant.plain}
              >
                <PencilAltIcon />
              </Button>
            </Tooltip>
          </OverflowMenuItem>
          <OverflowMenuItem key="tooltip-delete">
            <Tooltip content={t('table.label', { context: 'delete' })}>
              <Button
                className="quipucords-view__row-button"
                onClick={() => onDelete(item)}
                aria-label={t('table.label', { context: 'delete' })}
                variant={ButtonVariant.plain}
              >
                <TrashIcon />
              </Button>
            </Tooltip>
          </OverflowMenuItem>
          <OverflowMenuItem key="button-scan">
            <Button variant={ButtonVariant.secondary} onClick={() => onScan(item)}>
              {t('table.label', { context: 'scan' })}
            </Button>
          </OverflowMenuItem>
        </OverflowMenuGroup>
      </OverflowMenuContent>
      <OverflowMenuControl>
        <DropdownSelect
          onSelect={onSelect}
          isDropdownButton
          buttonVariant={SelectButtonVariant.plain}
          direction={(isLast && !isFirst && SelectDirection.up) || undefined}
          position={SelectPosition.right}
          placeholder={<EllipsisVIcon />}
          options={[
            { title: t('table.label', { context: 'edit' }), value: 'edit' },
            { title: t('table.label', { context: 'delete' }), value: 'delete' },
            { title: t('table.label', { context: 'Scan' }), value: 'scan' }
          ]}
        />
      </OverflowMenuControl>
    </OverflowMenu>
  );
};

const scansTableCells = {
  actionsCell,
  description,
  failedHostsCellContent,
  okHostsCellContent,
  scanStatus,
  scansCellContent,
  sourcesCellContent,
  statusCell,
  statusContent,
  unreachableHostsCellContent
};

export {
  scansTableCells as default,
  scansTableCells,
  actionsCell,
  description,
  failedHostsCellContent,
  okHostsCellContent,
  scanStatus,
  scansCellContent,
  sourcesCellContent,
  statusCell,
  statusContent,
  unreachableHostsCellContent
};
