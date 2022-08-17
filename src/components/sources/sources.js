import React from 'react';
import PropTypes from 'prop-types';
// import _isEqual from 'lodash/isEqual';
// import _size from 'lodash/size';
// import { Alert, AlertVariant, Button, ButtonVariant, EmptyState } from '@patternfly/react-core';
import { Alert, AlertVariant, EmptyState, Spinner } from '@patternfly/react-core';
import { IconSize } from '@patternfly/react-icons';
// import { Grid, Icon, ListView, Spinner } from 'patternfly-react';
// import { Spinner } from 'patternfly-react';
// import _get from 'lodash/get';
// import cx from 'classnames';
import { Modal, ModalVariant } from '../modal/modal';
// import { connect, reduxActions, reduxTypes, store } from '../../redux';
import { connect, reduxActions, reduxTypes } from '../../redux';
import helpers from '../../common/helpers';
import ViewToolbar from '../viewToolbar/viewToolbar';
import ViewPaginationRow from '../viewPaginationRow/viewPaginationRow';
import SourcesEmptyState from './sourcesEmptyState';
import { SourceFilterFields, SourceSortFields } from './sourceConstants';
import { translate } from '../i18n/i18n';
import { Table } from '../table/table';
import useGetSources from './sourcesContext'
// import { Tooltip } from '../tooltip/tooltip';
// import { dictionary } from '../../constants/dictionaryConstants';
// import SourceCredentialsList from './sourceCredentialsList';
// import ScanHostList from '../scanHostList/scanHostList';
// import { apiTypes } from '../../constants/apiConstants';

/**
 * A sources view.
 */
const Sources = ({ lastRefresh, t, useGetSources: useAliasGetSources, viewOptions }) => {
  const { pending, error, message: errorMessage, data: sources } = useAliasGetSources();

  const filtersActive = false;
  // const updatedSources = [];

  const onRefresh = () => {};

  const onSelect = () => {};

  const onShowAddSourceWizard = () => {};

  const renderToolbarActions = () => {};

  // const renderActions = () => {};

  if (pending && !sources.length) {
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
        <Table onSelect={onSelect} rows={sources}>
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
  // getSources: PropTypes.func,
  lastRefresh: PropTypes.number,
  pending: PropTypes.bool,
  sources: PropTypes.array,
  t: PropTypes.func,
  updateSources: PropTypes.bool,
  viewOptions: PropTypes.object


  useGetSources: PropTypes.func
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
