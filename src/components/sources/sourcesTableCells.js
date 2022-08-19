import React from 'react';
import { Button, ButtonVariant, Grid, GridItem, List, ListItem } from '@patternfly/react-core';
import { PencilAltIcon, TrashIcon } from '@patternfly/react-icons';
import { Icon, IconVariant } from '../icon/icon';
import { Tooltip } from '../tooltip/tooltip';
import { dictionary } from '../../constants/dictionaryConstants';
import { ConnectedScanHostList as ScanHostList } from '../scanHostList/scanHostList';
import { apiTypes } from '../../constants/apiConstants';
import { translate } from '../i18n/i18n';
import { helpers } from '../../common';
// import { Poll } from '../poll/poll';
// import { reduxTypes, store } from '../../redux';

/**
 * Source description and type icon
 *
 * @param {object} params
 * @param {Array} params.hosts
 * @param {string} params.name
 * @param {string} params.source_type
 * @param {object} options
 * @param {Function} options.t
 * @returns {React.ReactNode}
 */
const description = ({ hosts, name, source_type: sourceType } = {}, { t = translate } = {}) => {
  const itemHostsPopover = (
    <div className="quipucords-sources-popover-scroll">
      {hosts?.length > 1 && (
        <ul className="quipucords-popover-list">
          {hosts.map(host => (
            <li key={host}>{host}</li>
          ))}
        </ul>
      )}
      {hosts?.length === 1 && <div>{hosts[0]}</div>}
    </div>
  );

  let itemDescription;

  if (hosts?.length) {
    if (sourceType === 'network') {
      itemDescription = (
        <Tooltip isPopover content={itemHostsPopover} placement="left">
          <Button variant={ButtonVariant.link} isInline>
            {t('table.label', { context: 'network-range' })}
          </Button>
        </Tooltip>
      );
    } else {
      [itemDescription] = hosts;
    }
  }

  return (
    <Grid hasGutter={false}>
      <GridItem sm={2}>
        <Tooltip content={dictionary[sourceType]}>
          <Icon symbol={IconVariant[sourceType]} />
        </Tooltip>
      </GridItem>
      <GridItem sm={10}>
        <div>
          <strong>{name}</strong>
        </div>
        {itemDescription}
      </GridItem>
    </Grid>
  );
};

/**
 * Scan status, icon and description
 *
 * @param {object} params
 * @param {object} params.connection
 * @param {object} options
 * @param {Function} options.t
 * @param params.id
 * @param options.pollInterval
 * @param options.onRefresh
 * @returns {React.ReactNode|null}
 */
const scanStatus = (
  // { id, connection: scan = {} } = {},
  { connection: scan = {} } = {},
  // { t = translate, pollInterval = 10000, onRefresh = () => console.log('POLL WORKS >>>') } = {}
  { t = translate } = {}
) => {
  const { end_time: endTime, start_time: startTime, status } = scan;
  const isPending = status === 'created' || status === 'pending' || status === 'running';
  const scanTime = (isPending && startTime) || endTime;

  return (
    // <Poll interval={pollInterval} itemId={`sourceListItem-${id}`} itemIdCheck={isPending} onPoll={onRefresh}>
    <Grid hasGutter={false}>
      <GridItem sm={2}>
        <Icon symbol={IconVariant[status]} />
      </GridItem>
      <GridItem sm={10}>
        <div>{t('table.label', { context: ['status', status] })}</div>
        {helpers.getTimeDisplayHowLongAgo(scanTime)}
      </GridItem>
    </Grid>
    // </Poll>
  );
};

/**
 * Generate a consistent status cell.
 *
 * @param {object} params
 * @param {number} params.count
 * @param {string} params.status
 * @param {Function} params.t
 * @returns {React.ReactNode}
 */
const statusCell = ({ count, status = IconVariant.unknown, t = translate } = {}) => {
  let updatedCount = count || 0;

  if (helpers.DEV_MODE) {
    updatedCount = helpers.devModeNormalizeCount(updatedCount);
  }

  return (
    <Tooltip content={t('table.label', { context: ['status', 'tooltip', status], count: updatedCount })}>
      {t('table.label', { context: ['status', 'cell'], count: updatedCount }, [<Icon symbol={status} />, <strong />])}
    </Tooltip>
  );
};

/**
 * Generate a consistent display row for expandable content.
 *
 * @param {object} params
 * @param {object} params.connection
 * @param {string} params.id
 * @param {string} params.status
 * @returns {React.ReactNode}
 */
const statusContent = ({ connection, id, status } = {}) => (
  <ScanHostList
    key={`status-content-${id}-${status}`}
    id={connection.id}
    filter={{ [apiTypes.API_QUERY_SOURCE_TYPE]: id, [apiTypes.API_QUERY_STATUS]: status }}
    useConnectionResults
  >
    {({ host }) => (
      <Grid key={`hostsRow-${host?.credentialName}`}>
        <GridItem sm={host?.status === 'success' ? 6 : 12} md={4}>
          <Icon symbol={IconVariant[host?.status]} /> {host?.name}
        </GridItem>
        {host?.status === 'success' && (
          <GridItem sm={6} md={4}>
            <Icon symbol={IconVariant.idCard} /> {host?.credentialName}
          </GridItem>
        )}
      </Grid>
    )}
  </ScanHostList>
);

/**
 * Generate credentials expandable content.
 *
 * @param {object} source
 * @returns {React.ReactNode}
 */
const credentialsContent = ({ [apiTypes.API_RESPONSE_SOURCE_CREDENTIALS]: sourceCredentials } = {}) => {
  const credentials = (sourceCredentials && [...sourceCredentials]) || [];

  credentials.sort((item1, item2) =>
    item1[apiTypes.API_RESPONSE_SOURCE_CREDENTIALS_NAME].localeCompare(
      item2[apiTypes.API_RESPONSE_SOURCE_CREDENTIALS_NAME]
    )
  );

  return (
    <List isPlain>
      {credentials?.map(credential => (
        <ListItem
          key={credential[apiTypes.API_RESPONSE_SOURCE_CREDENTIALS_NAME]}
          icon={<Icon symbol={IconVariant.idCard} />}
        >
          {credential[apiTypes.API_RESPONSE_SOURCE_CREDENTIALS_NAME]}
        </ListItem>
      ))}
    </List>
  );
};

/**
 * Credentials cell status, and expandable content
 *
 * @param {object} item
 * @param {Array} item.credentials
 * @returns {{content: React.ReactNode, status: React.ReactNode}}
 */
const credentialsCellContent = (item = {}) => {
  const { credentials = [] } = item;
  const count = credentials?.length;

  return {
    content: statusCell({ count, status: IconVariant.idCard }),
    expandedContent: credentials?.length && credentialsContent(item)
  };
};

/**
 * Failed hosts cell and expandable content.
 *
 * @param {object} params
 * @param {object} params.connection
 * @param {string} params.id
 * @returns {{cell: React.ReactNode, content: React.ReactNode}}
 */
const failedHostsCellContent = ({ connection, id } = {}) => {
  const count = Number.parseInt(connection?.source_systems_failed, 10);

  return {
    content: statusCell({ count, status: IconVariant.failed }),
    expandedContent: statusContent({ connection, id, status: IconVariant.failed })
  };
};

/**
 * Ok hosts cell and expandable content.
 *
 * @param {object} params
 * @param {object} params.connection
 * @param {string} params.id
 * @returns {{cell: React.ReactNode, content: React.ReactNode}}
 */
const okHostsCellContent = ({ connection, id } = {}) => {
  const count = Number.parseInt(connection?.source_systems_scanned, 10);

  return {
    content: statusCell({ count, status: IconVariant.success }),
    expandedContent: statusContent({ connection, id, status: IconVariant.success })
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
    content: statusCell({ count, status: IconVariant.unreachable }),
    expandedContent: statusContent({ connection, id, status: IconVariant.unreachable })
  };
};

const actionsCell = ({ item = {}, onScan = helpers.noop, onDelete = helpers.noop, onEdit = helpers.noop } = {}) => (
  <React.Fragment>
    <Tooltip key="tooltip-edit" content="Edit">
      <Button
        className="quipucords-view__row-button"
        onClick={() => onEdit(item)}
        aria-label="Edit"
        variant={ButtonVariant.plain}
      >
        <PencilAltIcon />
      </Button>
    </Tooltip>
    <Tooltip key="tooltip-delete" content="Delete">
      <Button
        className="quipucords-view__row-button"
        onClick={() => onDelete(item)}
        aria-label="Delete"
        variant={ButtonVariant.plain}
      >
        <TrashIcon />
      </Button>
    </Tooltip>
    <Button key="button-scan" variant={ButtonVariant.secondary} onClick={() => onScan(item)}>
      Scan
    </Button>
  </React.Fragment>
);

const sourcesTableCells = {
  actionsCell,
  credentialsCellContent,
  description,
  failedHostsCellContent,
  okHostsCellContent,
  scanStatus,
  statusCell,
  statusContent,
  // typeIcon,
  unreachableHostsCellContent
};

export {
  sourcesTableCells as default,
  sourcesTableCells,
  actionsCell,
  credentialsCellContent,
  description,
  failedHostsCellContent,
  okHostsCellContent,
  scanStatus,
  statusCell,
  statusContent,
  // typeIcon,
  unreachableHostsCellContent
};
