import React from 'react';
import { Button, ButtonVariant, Grid, GridItem } from '@patternfly/react-core';
import { Icon, IconVariant } from '../icon/icon';
import { Tooltip } from '../tooltip/tooltip';
import { dictionary } from '../../constants/dictionaryConstants';
import { SourceCredentialsList } from './sourceCredentialsList';
import { ConnectedScanHostList as ScanHostList } from '../scanHostList/scanHostList';
import { apiTypes } from '../../constants/apiConstants';
import { translate } from '../i18n/i18n';
import { helpers } from '../../common';

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
 * @returns {React.ReactNode|null}
 */
const scanStatus = ({ connection: scan = {} } = {}, { t = translate } = {}) => {
  const { end_time: endTime, start_time: startTime, status } = scan;
  const scanTime = ((status === 'created' || status === 'pending' || status === 'running') && startTime) || endTime;

  return (
    <Grid hasGutter={false}>
      <GridItem sm={2}>
        <Icon symbol={IconVariant[status]} />
      </GridItem>
      <GridItem sm={10}>
        <div>{t('table.label', { context: ['status', status] })}</div>
        {helpers.getTimeDisplayHowLongAgo(scanTime)}
      </GridItem>
    </Grid>
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
 * Credentials cell status, and expandable content
 *
 * @param {object} item
 * @param {Array} item.credentials
 * @returns {{content: React.ReactNode, status: React.ReactNode}}
 */
const credentialsStatusContent = (item = {}) => {
  const { credentials = [] } = item;
  const count = credentials?.length;

  return {
    content: statusCell({ count, status: IconVariant.idCard }),
    expandedContent: credentials?.length && <SourceCredentialsList source={item} />
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

const actionsCellContent = (item = {}) => {
  console.log(item);
  return {
    content: 'actions'
  };
};

const sourcesTableCells = {
  actionsCellContent,
  credentialsStatusContent,
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
  actionsCellContent,
  credentialsStatusContent,
  description,
  failedHostsCellContent,
  okHostsCellContent,
  scanStatus,
  statusCell,
  statusContent,
  // typeIcon,
  unreachableHostsCellContent
};
