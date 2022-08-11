import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _size from 'lodash/size';
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
  Title,
  TitleSizes
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import { Form, ListView } from 'patternfly-react';
import { Modal, ModalVariant } from '../modal/modal';
import {
  AddCredentialType,
  ButtonVariant as CredentialButtonVariant,
  SelectPosition
} from '../addCredentialType/addCredentialType';
import { connect, reduxActions, reduxTypes, store } from '../../redux';
import helpers from '../../common/helpers';
import ViewToolbar from '../viewToolbar/viewToolbar';
import ViewPaginationRow from '../viewPaginationRow/viewPaginationRow';
import CredentialsEmptyState from './credentialsEmptyState';
import CredentialListItem from './credentialListItem';
// import { CredentialsTable } from './credentialsTable';
import { CredentialFilterFields, CredentialSortFields } from './credentialConstants';
import { translate } from '../i18n/i18n';
import { Table } from '../table/table';

class Credentials extends React.Component {
  credentialsToDelete = [];

  deletingCredential = null;

  state = {
    lastRefresh: null
  };

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps(nextProps) { //eslint-disable-line
    const { credentials, fulfilled, update, viewOptions } = this.props;

    if (!_isEqual(nextProps.credentials, credentials) && nextProps.fulfilled && !fulfilled) {
      this.setState({ lastRefresh: Date.now() });
    }

    // Check for changes resulting in a fetch
    if (helpers.viewPropsChanged(nextProps.viewOptions, viewOptions)) {
      this.onRefresh(nextProps);
    }

    if (_get(nextProps, 'update.delete')) {
      if (nextProps.update.fulfilled && !update.fulfilled) {
        store.dispatch({
          type: reduxTypes.toastNotifications.TOAST_ADD,
          alertType: 'success',
          message: (
            <span>
              Credential <strong>{this.deletingCredential.name}</strong> successfully deleted.
            </span>
          )
        });
        this.onRefresh(nextProps);

        store.dispatch({
          type: reduxTypes.view.DESELECT_ITEM,
          viewType: reduxTypes.view.CREDENTIALS_VIEW,
          item: this.deletingCredential
        });

        this.deleteNextCredential();
      }

      if (nextProps.update.error && !update.error) {
        store.dispatch({
          type: reduxTypes.toastNotifications.TOAST_ADD,
          alertType: 'danger',
          header: 'Error',
          message: (
            <span>
              Error removing credential <strong>{this.deletingCredential.name}</strong>
              <p>{nextProps.update.errorMessage}</p>
            </span>
          )
        });

        this.deleteNextCredential();
      }
    }
  }

  onDeleteCredentials = () => {
    const { viewOptions } = this.props;

    if (viewOptions.selectedItems.length === 1) {
      this.onDeleteCredential(viewOptions.selectedItems[0]);
      return;
    }

    const heading = <span>Are you sure you want to delete the following credentials?</span>;

    let credentialsList = '';
    viewOptions.selectedItems.forEach((item, index) => {
      credentialsList += (index > 0 ? '\n' : '') + item.name;
    });

    const body = (
      <Form.FormControl
        className="quipucords-form-control"
        componentClass="textarea"
        type="textarea"
        readOnly
        rows={viewOptions.selectedItems.length}
        value={credentialsList}
      />
    );

    const onConfirm = () => this.doDeleteCredentials(viewOptions.selectedItems);

    store.dispatch({
      type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_SHOW,
      title: 'Delete Credentials',
      heading,
      body,
      confirmButtonText: 'Delete',
      onConfirm
    });
  };

  onEditCredential = item => {
    store.dispatch({
      type: reduxTypes.credentials.EDIT_CREDENTIAL_SHOW,
      credential: item
    });
  };

  onDeleteCredential = item => {
    const heading = (
      <span>
        Are you sure you want to delete the credential <strong>{item.name}</strong>?
      </span>
    );

    const onConfirm = () => this.doDeleteCredentials([item]);

    store.dispatch({
      type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_SHOW,
      title: 'Delete Credential',
      heading,
      confirmButtonText: 'Delete',
      onConfirm
    });
  };

  onAddSource = () => {
    store.dispatch({
      type: reduxTypes.sources.CREATE_SOURCE_SHOW
    });
  };

  onRefresh = props => {
    const { getCredentials, viewOptions } = this.props;
    const options = _get(props, 'viewOptions') || viewOptions;

    getCredentials(helpers.createViewQueryObject(options));
  };

  onClearFilters = () => {
    store.dispatch({
      type: reduxTypes.viewToolbar.CLEAR_FILTERS,
      viewType: reduxTypes.view.CREDENTIALS_VIEW
    });
  };

  deleteNextCredential() {
    const { deleteCredential } = this.props;

    if (this.credentialsToDelete.length > 0) {
      this.deletingCredential = this.credentialsToDelete.pop();
      if (this.deletingCredential) {
        deleteCredential(this.deletingCredential.id);
      }
    }
  }

  doDeleteCredentials(items) {
    this.credentialsToDelete = [...items];

    store.dispatch({
      type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_HIDE
    });

    this.deleteNextCredential();
  }

  renderCredentialActions() {
    const { t, viewOptions } = this.props;

    return (
      <div className="form-group">
        <AddCredentialType
          buttonVariant={CredentialButtonVariant.primary}
          position={SelectPosition.right}
          placeholder={t('form-dialog.label', { context: 'add' })}
        />{' '}
        <Button
          variant={ButtonVariant.secondary}
          isDisabled={!viewOptions.selectedItems || viewOptions.selectedItems.length === 0}
          onClick={this.onDeleteCredentials}
        >
          {t('form-dialog.label', { context: 'delete' })}
        </Button>
      </div>
    );
  }

  renderPendingMessage() {
    const { pending, t } = this.props;

    if (pending) {
      return (
        <Modal variant={ModalVariant.medium} backdrop={false} isOpen disableFocusTrap>
          <div className="spinner spinner-xl" />
          <div className="text-center">{t('view.loading', { context: 'credentials' })}</div>
        </Modal>
      );
    }

    return null;
  }

  renderCredentialsList(items) {
    const { t } = this.props;

    if (_size(items)) {
      const updatedHeaderCols = [
        { content: 'One', isSortActive: true, info: { tooltip: 'hello' } },
        { content: 'Two', isSort: true },
        'Three',
        'Four'
      ];
      const updatedItemRows = items.map(({ name, cred_type: credType, sources }) => ({
        cells: [
          name,
          { content: credType, width: 15 },
          { content: sources.length, width: 10, expandedContent: 'Hello world', dataValue: sources },
          {
            content: 'other',
            width: 15,
            expandedContent: <React.Fragment>{JSON.stringify(sources, null, 2)}</React.Fragment>
          },
          {
            content: 'actions',
            isActionCell: true
          }
        ]
        // isSelected: true
        // onSelect: (a, b, c) => console.log('selected', a, b, c)
      }));

      return [
        <Table
          key="just-table"
          isHeader
          onSort={(a, b, c) => console.log('>>>>> on sort', a, b, c)}
          onSelect={(a, b, c) => console.log('>>>>> on select', a, b, c)}
          onExpand={(a, b, c) => console.log('>>>> on expand', a, b, c)}
          columnHeaders={updatedHeaderCols}
          rows={updatedItemRows}
        />,
        // <CredentialsTable key="testing" />,
        <ListView key="original" className="quipicords-list-view">
          {items.map(item => (
            <CredentialListItem
              item={item}
              key={item.id}
              onEdit={this.onEditCredential}
              onDelete={this.onDeleteCredential}
            />
          ))}
        </ListView>
      ];
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

  render() {
    const { error, errorMessage, credentials, pending, t, viewOptions } = this.props;
    const { lastRefresh } = this.state;

    if (pending) {
      return this.renderPendingMessage();
    }

    if (error) {
      return (
        <EmptyState className="quipucords-empty-state__alert">
          <Alert variant={AlertVariant.danger} title={t('view.error', { context: 'credentials' })}>
            {t('view.error-message', { context: ['credentials'], message: errorMessage })}
          </Alert>
        </EmptyState>
      );
    }

    if (_size(credentials) || _size(viewOptions.activeFilters)) {
      return (
        <React.Fragment>
          <div className="quipucords-view-container">
            <ViewToolbar
              viewType={reduxTypes.view.CREDENTIALS_VIEW}
              filterFields={CredentialFilterFields}
              sortFields={CredentialSortFields}
              onRefresh={this.onRefresh}
              lastRefresh={lastRefresh}
              actions={this.renderCredentialActions()}
              itemsType="Credential"
              itemsTypePlural="Credentials"
              selectedCount={viewOptions.selectedItems.length}
              {...viewOptions}
            />
            <ViewPaginationRow viewType={reduxTypes.view.CREDENTIALS_VIEW} {...viewOptions} />
            <div className="quipucords-list-container">{this.renderCredentialsList(credentials)}</div>
          </div>
          {this.renderPendingMessage()}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {this.renderPendingMessage()}
        <CredentialsEmptyState onAddSource={this.onAddSource} />,
      </React.Fragment>
    );
  }
}

Credentials.propTypes = {
  getCredentials: PropTypes.func,
  deleteCredential: PropTypes.func,
  fulfilled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  pending: PropTypes.bool,
  credentials: PropTypes.array,
  viewOptions: PropTypes.object,
  t: PropTypes.func,
  update: PropTypes.object
};

Credentials.defaultProps = {
  getCredentials: helpers.noop,
  deleteCredential: helpers.noop,
  fulfilled: false,
  error: false,
  errorMessage: null,
  pending: false,
  credentials: [],
  viewOptions: {},
  t: translate,
  update: {}
};

const mapDispatchToProps = dispatch => ({
  getCredentials: queryObj => dispatch(reduxActions.credentials.getCredentials(queryObj)),
  deleteCredential: id => dispatch(reduxActions.credentials.deleteCredential(id))
});

const mapStateToProps = state => ({
  ...state.credentials.view,
  viewOptions: state.viewOptions[reduxTypes.view.CREDENTIALS_VIEW]
});

const ConnectedCredentials = connect(mapStateToProps, mapDispatchToProps)(Credentials);

export { ConnectedCredentials as default, ConnectedCredentials, Credentials };
