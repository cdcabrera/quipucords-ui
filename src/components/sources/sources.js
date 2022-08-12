import React from 'react';
import PropTypes from 'prop-types';
import _isEqual from 'lodash/isEqual';
import _size from 'lodash/size';
import { Alert, AlertVariant, Button, ButtonVariant, EmptyState } from '@patternfly/react-core';
import { IdCardIcon, PencilAltIcon, TrashIcon } from '@patternfly/react-icons';
import { Grid, Icon, ListView, Spinner } from 'patternfly-react';
import _get from 'lodash/get';
import cx from 'classnames';
import { Modal, ModalVariant } from '../modal/modal';
import { connect, reduxActions, reduxTypes, store } from '../../redux';
import helpers from '../../common/helpers';
import ViewToolbar from '../viewToolbar/viewToolbar';
import ViewPaginationRow from '../viewPaginationRow/viewPaginationRow';
import SourcesEmptyState from './sourcesEmptyState';
import { SourceFilterFields, SourceSortFields } from './sourceConstants';
import { translate } from '../i18n/i18n';
import { Table } from '../table/table';
import { Tooltip } from '../tooltip/tooltip';
import { dictionary } from '../../constants/dictionaryConstants';
import SourceCredentialsList from './sourceCredentialsList';
import ScanHostList from '../scanHostList/scanHostList';
import { apiTypes } from '../../constants/apiConstants';

/**
 * A sources view.
 */
class Sources extends React.Component {
  componentDidMount() {
    const { getSources, viewOptions } = this.props;

    getSources(helpers.createViewQueryObject(viewOptions));
  }

  componentDidUpdate(prevProps) {
    const { getSources, updateSources, viewOptions } = this.props;

    const prevQuery = helpers.createViewQueryObject(prevProps.viewOptions);
    const nextQuery = helpers.createViewQueryObject(viewOptions);

    if (updateSources || !_isEqual(prevQuery, nextQuery)) {
      getSources(nextQuery);
    }
  }

  onShowAddSourceWizard = () => {
    store.dispatch({
      type: reduxTypes.sources.CREATE_SOURCE_SHOW
    });
  };

  onScanSources = () => {
    const { viewOptions } = this.props;

    store.dispatch({
      type: reduxTypes.scans.EDIT_SCAN_SHOW,
      sources: viewOptions.selectedItems
    });
  };

  onRefresh = () => {
    store.dispatch({
      type: reduxTypes.sources.UPDATE_SOURCES
    });
  };

  onClearFilters = () => {
    store.dispatch({
      type: reduxTypes.viewToolbar.CLEAR_FILTERS,
      viewType: reduxTypes.view.SOURCES_VIEW
    });
  };

  renderSourceActions() {
    const { viewOptions } = this.props;

    return (
      <React.Fragment>
        <Button onClick={this.onShowAddSourceWizard}>Add</Button>{' '}
        <Button
          variant={ButtonVariant.secondary}
          isDisabled={!viewOptions.selectedItems || viewOptions.selectedItems.length === 0}
          onClick={this.onScanSources}
        >
          Scan
        </Button>
      </React.Fragment>
    );
  }

  /*
  renderSourcesList(sources) {
    const { lastRefresh, t } = this.props;

    if (sources.length) {
      return (
        <ListView className="quipicords-list-view">
          {sources.map(source => (
            <SourceListItem item={source} key={source[apiTypes.API_RESPONSE_SOURCE_ID]} lastRefresh={lastRefresh} />
          ))}
        </ListView>
      );
    }

    return (
      <EmptyState className="quipucords-empty-state" variant={EmptyStateVariant.large}>
        <EmptyStateIcon icon={SearchIcon} />
        <Title size={TitleSizes.lg} headingLevel="h1">
          {t('view.empty-state', { context: ['filter', 'title'] })}
        </Title>
        <EmptyStateBody>{t('view.empty-state', { context: ['filter', 'description'] })}</EmptyStateBody>
        <EmptyStatePrimary>
          <Button variant={ButtonVariant.link} onClick={this.onClearFilters}>
            {t('view.empty-state', { context: ['label', 'clear'] })}
          </Button>
        </EmptyStatePrimary>
      </EmptyState>
    );
  }
  */
  static renderSourceType(item) {
    const typeIcon = helpers.sourceTypeIcon(item.source_type);

    return (
      <Tooltip content={dictionary[item.source_type]}>
        <ListView.Icon type={typeIcon.type} name={typeIcon.name} />
      </Tooltip>
    );
  }

  static renderDescription(item) {
    const itemHostsPopover = (
      <div className="quipucords-sources-popover-scroll">
        {item.hosts && item.hosts.length > 1 && (
          <ul className="quipucords-popover-list">
            {item.hosts.map(host => (
              <li key={host}>{host}</li>
            ))}
          </ul>
        )}
        {item.hosts && item.hosts.length === 1 && <div>{item.hosts[0]}</div>}
      </div>
    );

    let itemDescription;

    if (_size(item.hosts)) {
      if (item.source_type === 'network') {
        itemDescription = (
          <Tooltip isPopover content={itemHostsPopover} placement="left">
            <Button variant={ButtonVariant.link} isInline>
              Network Range
            </Button>
          </Tooltip>
        );
      } else {
        [itemDescription] = item.hosts;
      }
    }

    return (
      <div className="scan-description">
        <div>
          <div>
            <ListView.DescriptionHeading>{item.name}</ListView.DescriptionHeading>
          </div>
          {itemDescription}
        </div>
      </div>
    );
  }

  static renderScanStatus(item) {
    const scan = _get(item, 'connection');
    let scanDescription = '';
    let scanTime = _get(scan, 'end_time');
    let icon = null;

    switch (_get(scan, 'status')) {
      case 'completed':
        scanDescription = 'Last Connected';
        icon = <Icon className="scan-status-icon" type="pf" name="ok" />;
        break;
      case 'failed':
        scanDescription = 'Connection Failed';
        icon = <Icon className="scan-status-icon" type="pf" name="error-circle-o" />;
        break;
      case 'canceled':
        scanDescription = 'Connection Canceled';
        icon = <Icon className="scan-status-icon" type="pf" name="error-circle-o" />;
        break;
      case 'created':
      case 'pending':
      case 'running':
        scanTime = _get(scan, 'start_time');
        scanDescription = 'Connection in Progress';
        icon = <Icon className="scan-status-icon fa-spin" type="fa" name="spinner" />;
        break;
      case 'paused':
        scanDescription = 'Connection Paused';
        icon = <Icon className="scan-status-icon" type="pf" name="warning-triangle-o" />;
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
  }

  static renderCredentials(item) {
    const credentialCount = _size(_get(item, 'credentials', []));

    return (
      <React.Fragment>
        <IdCardIcon /> {credentialCount}
      </React.Fragment>
    );
  }

  static renderHostRow(host) {
    const iconInfo = helpers.scanStatusIcon(host.status);

    return (
      <Grid.Row key={helpers.generateId('hostRow')}>
        <Grid.Col xs={host.status === 'success' ? 6 : 12} sm={4}>
          <span>
            <Icon type={iconInfo.type} name={iconInfo.name} className={cx(...iconInfo.classNames)} />
            &nbsp; {host.name}
          </span>
        </Grid.Col>
        {host.status === 'success' && (
          <Grid.Col xs={6} sm={4}>
            <span>
              <Icon type="fa" name="id-card" />
              &nbsp; {host.credentialName}
            </span>
          </Grid.Col>
        )}
      </Grid.Row>
    );
  }

  static renderOkHosts(item) {
    return (
      <ScanHostList
        key="okHosts-hey"
        id={item.connection.id}
        filter={{ [apiTypes.API_QUERY_SOURCE_TYPE]: item.id, [apiTypes.API_QUERY_STATUS]: 'success' }}
        useConnectionResults
      >
        {({ host }) => Sources.renderHostRow(host)}
      </ScanHostList>
    );
  }

  static renderFailedHosts(item) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>> FAILED HOSTS', item);

    return (
      <ScanHostList
        key={`failedHosts-${item.connection.id}`}
        id={item.connection.id}
        filter={{ [apiTypes.API_QUERY_SOURCE_TYPE]: item.id, [apiTypes.API_QUERY_STATUS]: 'failed' }}
        useConnectionResults
      >
        {({ host }) => Sources.renderHostRow(host)}
      </ScanHostList>
    );
  }

  static renderActions(item) {
    const onScan = source => {
      store.dispatch({
        type: reduxTypes.scans.EDIT_SCAN_SHOW,
        sources: [source]
      });
    };

    return (
      <React.Fragment>
        <Tooltip key="tooltip-edit" content="Edit">
          <Button
            className="quipucords-view__row-button"
            onClick={() => this.onEdit(item)}
            aria-label="Edit"
            variant={ButtonVariant.plain}
          >
            <PencilAltIcon />
          </Button>
        </Tooltip>
        <Tooltip key="tooltip-delete" content="Delete">
          <Button
            className="quipucords-view__row-button"
            onClick={() => this.onDelete(item)}
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
  }

  render() {
    const { error, errorMessage, lastRefresh, pending, sources, t, viewOptions } = this.props;

    if (pending && !sources.length) {
      return (
        <Modal variant={ModalVariant.medium} backdrop={false} isOpen disableFocusTrap>
          <Spinner loading size="lg" className="blank-slate-pf-icon" />
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

    const filtersActive = _size(viewOptions.activeFilters) >= 0;
    const updatedSources = sources.map(source => ({
      cells: [
        { content: Sources.renderSourceType(source), width: 1 },
        { content: Sources.renderDescription(source), width: 10 },
        { content: Sources.renderScanStatus(source), width: 10 },
        {
          content: Sources.renderCredentials(source),
          expandedContent: _size(_get(source, 'credentials', [])) > 0 && <SourceCredentialsList source={source} />,
          width: 1
        },
        {
          content: 'successful',
          expandedContent: Sources.renderOkHosts(source),
          width: 1
        },
        {
          content: 'failed',
          expandedContent: Sources.renderFailedHosts(source),
          width: 1
        },
        {
          content: 'unreachable',
          expandedContent: 'unreachable',
          width: 1
        },
        {
          content: Sources.renderActions(source),
          isActionCell: true
        }
      ]
    }));

    return (
      <div className="quipucords-view-container">
        {filtersActive && (
          <React.Fragment>
            <ViewToolbar
              viewType={reduxTypes.view.SOURCES_VIEW}
              filterFields={SourceFilterFields}
              sortFields={SourceSortFields}
              onRefresh={this.onRefresh}
              lastRefresh={lastRefresh}
              actions={this.renderSourceActions()}
              itemsType="Source"
              itemsTypePlural="Sources"
              selectedCount={viewOptions.selectedItems.length}
              {...viewOptions}
            />
            <ViewPaginationRow viewType={reduxTypes.view.SOURCES_VIEW} {...viewOptions} />
          </React.Fragment>
        )}
        <div className="quipucords-list-container">
          <Table onSelect={Function.prototype} rows={updatedSources}>
            <SourcesEmptyState onAddSource={this.onShowAddSourceWizard} />
          </Table>
        </div>
      </div>
    );

    /*
      return (
        <div className="quipucords-view-container">
          <ViewToolbar
            viewType={reduxTypes.view.SOURCES_VIEW}
            filterFields={SourceFilterFields}
            sortFields={SourceSortFields}
            onRefresh={this.onRefresh}
            lastRefresh={lastRefresh}
            actions={this.renderSourceActions()}
            itemsType="Source"
            itemsTypePlural="Sources"
            selectedCount={viewOptions.selectedItems.length}
            {...viewOptions}
          />
          <ViewPaginationRow viewType={reduxTypes.view.SOURCES_VIEW} {...viewOptions} />
          <div className="quipucords-list-container">{this.renderSourcesList(sources)}</div>
          {this.renderPendingMessage()}
        </div>
      );
    }

    return <SourcesEmptyState onAddSource={this.onShowAddSourceWizard} />;
    */
  }
}

/**
 * Prop types
 *
 * @type {{sources: Array, t: Function, lastRefresh: number, pending: boolean, errorMessage: string,
 *     getSources: Function, error: boolean, updateSources: boolean, viewOptions: object}}
 */
Sources.propTypes = {
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  getSources: PropTypes.func,
  lastRefresh: PropTypes.number,
  pending: PropTypes.bool,
  sources: PropTypes.array,
  t: PropTypes.func,
  updateSources: PropTypes.bool,
  viewOptions: PropTypes.object
};

/**
 * Default props
 *
 * @type {{sources: *[], t: Function, lastRefresh: number, pending: boolean, errorMessage: null,
 *     getSources: Function, error: boolean, updateSources: boolean, viewOptions: {}}}
 */
Sources.defaultProps = {
  error: false,
  errorMessage: null,
  getSources: helpers.noop,
  lastRefresh: 0,
  pending: false,
  sources: [],
  t: translate,
  updateSources: false,
  viewOptions: {}
};

const mapDispatchToProps = dispatch => ({
  getSources: queryObj => dispatch(reduxActions.sources.getSources(queryObj))
});

const mapStateToProps = state => ({
  ...state.sources.view,
  viewOptions: state.viewOptions[reduxTypes.view.SOURCES_VIEW]
});

const ConnectedSources = connect(mapStateToProps, mapDispatchToProps)(Sources);

export { ConnectedSources as default, ConnectedSources, Sources };
