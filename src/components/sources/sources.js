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
import { connect, reduxActions, reduxTypes, storeHooks } from '../../redux';
import helpers from '../../common/helpers';
import ViewToolbar from '../viewToolbar/viewToolbar';
import ViewPaginationRow from '../viewPaginationRow/viewPaginationRow';
import SourcesEmptyState from './sourcesEmptyState';
import { SourceFilterFields, SourceSortFields } from './sourceConstants';
import { translate } from '../i18n/i18n';
import { Table } from '../table/table';
import { sourcesTableCells } from './sourcesTableCells';
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
 * @returns {React.ReactNode}
 */
// const Sources = ({ lastRefresh, t, useGetSources: useAliasGetSources, viewOptions }) => {
const Sources = ({
  error,
  errorMessage,
  getSources,
  lastRefresh,
  pending,
  sources,
  t,
  updateSources,
  useDispatch: useAliasDispatch,
  viewOptions
}) => {
  const [updatedSources, setUpdatedSources] = useState([]);
  const dispatch = useAliasDispatch();
  const query = helpers.createViewQueryObject(viewOptions);
  const filtersActive = viewOptions?.activeFilters?.length >= 0;

  useShallowCompareEffect(() => {
    getSources(query);
  }, [updateSources, query]);

  useShallowCompareEffect(() => {
    setUpdatedSources(
      sources.map(item => ({
        // source: item,
        cells: [
          {
            content: sourcesTableCells.typeIcon(item),
            width: 5,
            dataLabel: 'Source type'
          },
          {
            content: sourcesTableCells.description(item),
            width: 15,
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
            content: 'action cell',
            isActionCell: true
          }
        ]
      }))
    );
  }, [sources]);

  const onRefresh = () => {
    dispatch({
      type: reduxTypes.sources.UPDATE_SOURCES
    });
  };

  const onSelect = value => {
    console.log('>>> on select', value);
    // dispatch({
    //   type: checked ? reduxTypes.view.SELECT_ITEM : reduxTypes.view.DESELECT_ITEM,
    //   viewType: reduxTypes.view.SOURCES_VIEW,
    //   item
    // });
  };

  const onScanSources = () => {
    dispatch({
      type: reduxTypes.scans.EDIT_SCAN_SHOW,
      sources: viewOptions.selectedItems
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
        isDisabled={!viewOptions.selectedItems || viewOptions.selectedItems.length === 0}
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
      {filtersActive && (
        <React.Fragment>
          <ViewToolbar
            viewType={reduxTypes.view.SOURCES_VIEW}
            filterFields={SourceFilterFields}
            sortFields={SourceSortFields}
            onRefresh={onRefresh}
            lastRefresh={lastRefresh}
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
        <Table onSelect={onSelect} rows={updatedSources}>
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
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  getSources: PropTypes.func,
  lastRefresh: PropTypes.number,
  pending: PropTypes.bool,
  sources: PropTypes.array,
  t: PropTypes.func,
  updateSources: PropTypes.bool,
  useDispatch: PropTypes.func,
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
  useDispatch: storeHooks.reactRedux.useDispatch,
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
