import React, { useState } from 'react';
import { useShallowCompareEffect } from 'react-use';
import { AlertVariant, List, ListItem } from '@patternfly/react-core';
import { ContextIcon, ContextIconVariant } from '../contextIcon/contextIcon';
import { reduxActions, reduxTypes, storeHooks } from '../../redux';
import { API_QUERY_SORT_TYPES, API_QUERY_TYPES, apiTypes } from '../../constants/apiConstants';
// import { helpers } from '../../common';
import { translate } from '../i18n/i18n';
import { useConfirmation } from '../../hooks/useConfirmation';
import { context as viewContext } from '../view/viewContext';

/**
 * ToDo: centralize common view hooks
 * We repeat hooks/functions across views. Review making a centralized configurable view component and
 * applying a central set of contextual hooks.
 */
/**
 * Charge initial view query
 *
 * @type {{'[API_QUERY_TYPES.ORDERING]': string, '[API_QUERY_TYPES.PAGE]': number, '[API_QUERY_TYPES.PAGE_SIZE]': number}}
 */
const credentialsQuery = {
  [API_QUERY_TYPES.ORDERING]: API_QUERY_SORT_TYPES.NAME,
  [API_QUERY_TYPES.PAGE]: 1,
  [API_QUERY_TYPES.PAGE_SIZE]: 10
};

/**
 * Context query for credentials.
 *
 * @param {object} options
 * @param {object} options.queryCharge
 * @param {Function} options.useSelector
 * @param {string} options.viewId
 * @returns {object}
 */
/*
const useQuery = ({
  queryCharge = credentialsQuery,
  useSelector: useAliasSelector = storeHooks.reactRedux.useSelector,
  viewId
} = {}) => {
  const query = useAliasSelector(({ view }) => view?.query?.[viewId], {});
  return {
    ...queryCharge,
    ...query
  };
};
 */

/**
 * Credential action, onDelete.
 *
 * @param {object} options
 * @param {Function} options.deleteCredentials
 * @param {Function} options.t
 * @param {Function} options.useConfirmation
 * @param {Function} options.useDispatch
 * @param {Function} options.useSelectorsResponse
 * @returns {(function(*): void)|*}
 */
const useOnDelete = ({
  deleteCredentials = reduxActions.credentials.deleteCredential,
  t = translate,
  useConfirmation: useAliasConfirmation = useConfirmation,
  useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
  useSelectorsResponse: useAliasSelectorsResponse = storeHooks.reactRedux.useSelectorsResponse
} = {}) => {
  const onConfirmation = useAliasConfirmation();
  const [credentialsToDelete, setCredentialsToDelete] = useState([]);
  const dispatch = useAliasDispatch();
  const {
    data,
    error: deletedError,
    fulfilled: deletedFulfilled
  } = useAliasSelectorsResponse(({ credentials }) => credentials?.deleted);
  const { errorMessage } = data?.[0] || {};

  useShallowCompareEffect(() => {
    if (credentialsToDelete.length) {
      const credentialIds = credentialsToDelete.map(cred => cred[apiTypes.API_RESPONSE_CREDENTIAL_ID]);
      deleteCredentials(credentialIds)(dispatch);
    }
  }, [credentialsToDelete, deleteCredentials, dispatch]);

  useShallowCompareEffect(() => {
    if (deletedFulfilled && credentialsToDelete.length) {
      const credentialNames = credentialsToDelete.map(cred => cred[apiTypes.API_RESPONSE_CREDENTIAL_NAME]);
      dispatch([
        {
          type: reduxTypes.toastNotifications.TOAST_ADD,
          alertType: AlertVariant.success,
          header: t('toast-notifications.title', {
            context: ['deleted-credential'],
            count: credentialNames.length
          }),
          message: t('toast-notifications.description', {
            context: ['deleted-credential'],
            name: credentialNames[0],
            count: credentialNames.length
          })
        },
        {
          type: reduxTypes.credentials.DESELECT_CREDENTIAL,
          item: credentialsToDelete
        },
        {
          type: reduxTypes.credentials.UPDATE_CREDENTIALS
        }
      ]);

      setCredentialsToDelete(() => []);
    }

    if (deletedError && credentialsToDelete.length) {
      const credentialNames = credentialsToDelete.map(cred => cred[apiTypes.API_RESPONSE_CREDENTIAL_NAME]);
      dispatch([
        {
          type: reduxTypes.toastNotifications.TOAST_ADD,
          alertType: AlertVariant.danger,
          header: t('toast-notifications.title', {
            context: ['error']
          }),
          message: t('toast-notifications.description', {
            context: ['deleted-credential', 'error'],
            name: credentialNames[0],
            count: credentialNames.length,
            message: errorMessage
          })
        },
        {
          type: reduxTypes.credentials.DESELECT_CREDENTIAL,
          item: credentialsToDelete
        },
        {
          type: reduxTypes.credentials.UPDATE_CREDENTIALS
        }
      ]);

      setCredentialsToDelete(() => []);
    }
  }, [credentialsToDelete, deletedError, deletedFulfilled, dispatch, errorMessage, t]);

  /**
   * Confirmation, and state, for deleting a single or multiple credentials
   *
   * @param {Array|string} credentials
   */
  return credentials => {
    const updatedCredentials = (Array.isArray(credentials) && credentials) || [credentials];

    onConfirmation({
      title: t('form-dialog.confirmation', {
        context: ['title', 'delete-credential'],
        count: updatedCredentials.length
      }),
      heading: t(
        'form-dialog.confirmation',
        {
          context: ['heading', 'delete-credential'],
          count: updatedCredentials.length,
          name: updatedCredentials?.[0]?.[apiTypes.API_RESPONSE_CREDENTIAL_NAME]
        },
        [<strong />]
      ),
      body:
        (updatedCredentials.length > 1 && (
          <List className="quipucords-list__overflow-scroll" isPlain>
            {updatedCredentials.map(
              ({
                [apiTypes.API_RESPONSE_CREDENTIAL_NAME]: name,
                [apiTypes.API_RESPONSE_CREDENTIAL_CRED_TYPE]: credType
              }) => (
                <ListItem key={name} icon={<ContextIcon symbol={ContextIconVariant[credType]} />}>
                  {name}
                </ListItem>
              )
            )}
          </List>
        )) ||
        undefined,
      confirmButtonText: t('form-dialog.label', {
        context: ['delete']
      }),
      onConfirm: () => setCredentialsToDelete(() => updatedCredentials)
    });
  };
};

/**
 * On edit a credential, show modal.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnEdit = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return item => {
    dispatch({
      type: reduxTypes.credentials.EDIT_CREDENTIAL_SHOW,
      credential: item
    });
  };
};

/**
 * On expand a row facet.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnExpand = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return ({ isExpanded, cellIndex, data }) => {
    dispatch({
      type: isExpanded ? reduxTypes.credentials.EXPANDED_CREDENTIAL : reduxTypes.credentials.NOT_EXPANDED_CREDENTIAL,
      viewType: reduxTypes.view.CREDENTIALS_VIEW,
      item: data.item,
      cellIndex
    });
  };
};

/**
 * On refresh view.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnRefresh = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return () => {
    dispatch({
      type: reduxTypes.credentials.UPDATE_CREDENTIALS
    });
  };
};

/**
 * On select a row.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnSelect = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return ({ isSelected, data }) => {
    dispatch({
      type: isSelected ? reduxTypes.credentials.SELECT_CREDENTIAL : reduxTypes.credentials.DESELECT_CREDENTIAL,
      viewType: reduxTypes.view.CREDENTIALS_VIEW,
      item: data.item
    });
  };
};

/**
 * Get credentials
 *
 * @param {object} options
 * @param {Function} options.getCredentials
 * @param {Function} options.useDispatch
 * @param {Function} options.useQuery
 * @param {Function} options.useSelectors
 * @param {Function} options.useSelectorsResponse
 * @param {string} options.viewId
 * @returns {{date: *, data: *[], pending: boolean, errorMessage: null, fulfilled: boolean, selectedRows: *,
 *     expandedRows: *, error: boolean}}
 */
const useGetCredentials = ({
  getCredentials = reduxActions.credentials.getCredentials,
  useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
  useQuery: useAliasQuery = viewContext.useQuery,
  useSelectors: useAliasSelectors = storeHooks.reactRedux.useSelectors,
  useSelectorsResponse: useAliasSelectorsResponse = storeHooks.reactRedux.useSelectorsResponse,
  viewId
} = {}) => {
  const dispatch = useAliasDispatch();
  const [refreshUpdate, selectedRows, expandedRows] = useAliasSelectors([
    ({ credentials }) => credentials?.update,
    ({ credentials }) => credentials?.selected,
    ({ credentials }) => credentials?.expanded
    // ({ viewOptions: stateViewOptions }) => stateViewOptions?.[reduxTypes.view.CREDENTIALS_VIEW]
  ]);
  const {
    data: responseData,
    error,
    fulfilled,
    message: errorMessage,
    pending,
    responses = {}
  } = useAliasSelectorsResponse({ id: 'view', selector: ({ credentials }) => credentials?.view });
  const query = useAliasQuery({ viewId });
  console.log('>>>>>>>> newQuery', query);

  const [{ date } = {}] = responses?.list || [];
  const { [apiTypes.API_RESPONSE_CREDENTIALS_RESULTS]: data = [] } = responseData?.view || {};
  // const query = helpers.createViewQueryObject(viewOptions);

  useShallowCompareEffect(() => {
    getCredentials(null, query)(dispatch);
  }, [dispatch, getCredentials, query, refreshUpdate]);

  return {
    pending,
    error,
    errorMessage,
    fulfilled,
    data,
    date,
    selectedRows,
    expandedRows
  };
};

const context = {
  credentialsQuery,
  useGetCredentials,
  useOnDelete,
  useOnEdit,
  useOnExpand,
  useOnRefresh,
  useOnSelect
};

export {
  context as default,
  context,
  credentialsQuery,
  useGetCredentials,
  useOnDelete,
  useOnEdit,
  useOnExpand,
  useOnRefresh,
  useOnSelect
};
