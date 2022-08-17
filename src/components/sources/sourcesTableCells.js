import React from 'react';
import { Button, ButtonVariant } from '@patternfly/react-core';
import { Grid, ListView } from 'patternfly-react';
import { Icon, IconVariant } from '../icon/icon';
import { Tooltip } from '../tooltip/tooltip';
import { dictionary } from '../../constants/dictionaryConstants';
import { SourceCredentialsList } from './sourceCredentialsList';
import { ConnectedScanHostList as ScanHostList } from '../scanHostList/scanHostList';
import { apiTypes } from '../../constants/apiConstants';
import { translate } from '../i18n/i18n';
import { helpers } from '../../common';

/**
 * Source type icon
 *
 * @param {object} params
 * @param {string} params.source_type
 * @returns {React.ReactNode}
 */
const typeIcon = ({ source_type: sourceType } = {}) => (
  <Tooltip content={dictionary[sourceType]}>
    <Icon symbol={IconVariant[sourceType]} />
  </Tooltip>
);

/**
 * Source description
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
    <div className="scan-description">
      <div>
        <div>
          <ListView.DescriptionHeading>{name}</ListView.DescriptionHeading>
        </div>
        {itemDescription}
      </div>
    </div>
  );
};

/**
 * Scan status, icon and description
 *
 * @param {object} params
 * @param {object} params.connection
 * @returns {React.ReactNode|null}
 */
const scanStatus = ({ connection: scan = {} } = {}) => {
  const { end_time: endTime, start_time: startTime, status } = scan;
  let scanDescription = '';
  let scanTime = endTime;
  let icon = null;

  switch (status) {
    case 'completed':
      scanDescription = 'Last Connected';
      icon = <Icon symbol={IconVariant.completed} />;
      break;
    case 'failed':
      scanDescription = 'Connection Failed';
      icon = <Icon symbol={IconVariant.failed} />;
      break;
    case 'canceled':
      scanDescription = 'Connection Canceled';
      icon = <Icon symbol={IconVariant.canceled} />;
      break;
    case 'created':
    case 'pending':
    case 'running':
      scanTime = startTime;
      scanDescription = 'Connection in Progress';
      icon = <Icon symbol={IconVariant.pending} />;
      break;
    case 'paused':
      scanDescription = 'Connection Paused';
      icon = <Icon symbol={IconVariant.paused} />;
      break;
    default:
      return null;
  }

  return (
    <div className="scan-description">
      {icon}
      <div className="scan-status-text">
        <div>{scanDescription}</div>
        {helpers.getTimeDisplayHowLongAgo(scanTime)}
      </div>
    </div>
  );
};

/**
 * Credentials cell status, and expandable content
 *
 * @param {object} item
 * @param {Array} item.credentials
 * @returns {{content: React.ReactNode, status: React.ReactNode}}
 */
const credentialsStatusContent = (item = {}) => {
  const { credentials = [] } = item;

  const status = (
    <React.Fragment>
      <Icon symbol={IconVariant.idCard} /> {credentials?.length || 0}
    </React.Fragment>
  );
  const content = credentials?.length && <SourceCredentialsList source={item} />;

  return {
    status,
    content
  };
};

/**
 * Generate a consistent status cell.
 *
 * @param {object} params
 * @param {number} params.count
 * @param {string} params.symbol
 * @param {Function} params.t
 * @returns {React.ReactNode}
 */
const statusCell = ({ count, symbol = IconVariant.unknown, t = translate } = {}) => {
  let updatedCount = count || 0;

  if (helpers.DEV_MODE) {
    updatedCount = helpers.devModeNormalizeCount(updatedCount);
  }

  return (
    <Tooltip content={t('table.label', { context: ['status', 'tooltip', symbol], count: updatedCount })}>
      {t('table.label', { context: ['status', symbol], count: updatedCount }, [<Icon symbol={symbol} />, <strong />])}
    </Tooltip>
  );

  // "label_status_success": "Successful Authentication",
  //     "label_status_success_other": "Successful Authentications",
  //     "label_status_success_empty": "{{count}} Successful"

  /*
  const iconInfo = helpers.scanStatusIcon('success');
  const tipSingular = 'Successful Authentication';
  const tipPlural = 'Successful Authentications';
  const emptyText = '0 Successful';

  if (count <= 0) {
    return <Tooltip content={`0 ${tipPlural}`}>{emptyText}</Tooltip>;
  }

  return (
    <Tooltip content={`${count}  ${count === 1 ? tipSingular : tipPlural}`}>
      {iconInfo && (
        <React.Fragment>
          <Icon symbol={IconVariant.success}/>{' '}
          <strong>{count}</strong>
        </React.Fragment>
      )}
      {!iconInfo && (
        <span>
          <strong>{count}</strong>
          {` ${tipPlural}`}
        </span>
      )}
    </Tooltip>
  );
  */
};

/**
 * Generate a consistent display row for expandable content.
 *
 * @param {object} params
 * @param {string} params.status
 * @param {string} params.name
 * @param {string} params.credentialName
 * @returns {React.ReactNode}
 */
/*
const hostRow = ({ status, name, credentialName } = {}) => (
  <Grid.Row key={`hostsRow-${credentialName}`}>
    <Grid.Col xs={status === 'success' ? 6 : 12} sm={4}>
      <span>
        <Icon symbol={IconVariant[status]} />
        &nbsp; {name}
      </span>
    </Grid.Col>
    {status === 'success' && (
      <Grid.Col xs={6} sm={4}>
        <span>
          <Icon symbol={IconVariant.idCard} />
          &nbsp; {credentialName}
        </span>
      </Grid.Col>
    )}
  </Grid.Row>
);
*/

const statusContent = ({ connection, id, type } = {}) => (
  <ScanHostList
    key={`status-content-${id}-${type}`}
    id={connection.id}
    filter={{ [apiTypes.API_QUERY_SOURCE_TYPE]: id, [apiTypes.API_QUERY_STATUS]: type }}
    useConnectionResults
  >
    {({ host }) => (
      <Grid.Row key={`hostsRow-${host?.credentialName}`}>
        <Grid.Col xs={host?.status === 'success' ? 6 : 12} sm={4}>
          <span>
            <Icon symbol={IconVariant[host?.status]} />
            &nbsp; {host?.name}
          </span>
        </Grid.Col>
        {host?.status === 'success' && (
          <Grid.Col xs={6} sm={4}>
            <span>
              <Icon symbol={IconVariant.idCard} />
              &nbsp; {host?.credentialName}
            </span>
          </Grid.Col>
        )}
      </Grid.Row>
    )}
  </ScanHostList>
);

const failedHostsStatusContent = ({ connection, id } = {}) => {
  const count = connection?.source_systems_failed;

  return {
    cell: statusCell({ count, symbol: IconVariant.failed }),
    content: statusContent({ connection, id, type: IconVariant.failed })
  };
};

const okHostsStatusContent = ({ connection, id } = {}) => {
  const count = connection?.source_systems_scanned;

  return {
    cell: statusCell({ count, symbol: IconVariant.success }),
    content: statusContent({ connection, id, type: IconVariant.success })
  };
};

const unreachableHostsStatusContent = ({ connection, id } = {}) => {
  const count = connection?.source_systems_unreachable;

  return {
    cell: statusCell({ count, symbol: IconVariant.unreachable }),
    content: statusContent({ connection, id, type: IconVariant.unreachable })
  };
};

const sourcesTableCells = {
  credentialsStatusContent,
  description,
  failedHostsStatusContent,
  okHostsStatusContent,
  scanStatus,
  statusCell,
  statusContent,
  typeIcon,
  unreachableHostsStatusContent
};

export { sourcesTableCells as default, sourcesTableCells };
