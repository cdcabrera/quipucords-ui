import { useState } from 'react';
import { AlertVariant } from '@patternfly/react-core';
import { useShallowCompareEffect } from 'react-use';
import { reduxActions, reduxTypes, storeHooks } from '../../redux';
import { useInferredContext as useViewContext } from '../view/viewContext';
import { apiTypes } from '../../constants/apiConstants';
import { translate } from '../i18n/i18n';

/**
 * Return credential dialog response
 *
 * @param {object} options
 * @param {Function} options.useSelector
 * @returns {*}
 */
const useCredential = ({ useSelector: useAliasSelector = storeHooks.reactRedux.useSelector } = {}) => {
  const { credentialType, ...data } = useAliasSelector(({ credentials }) => credentials?.dialog, {});
  const updatedCredentialType = data?.credential?.[apiTypes.API_QUERY_TYPES.CREDENTIAL_TYPE] || credentialType;

  return {
    credentialType: updatedCredentialType,
    ...data
  };
};

/**
 * Return an updated source. Display relative toast messaging after wizard closes.
 *
 * @param {object} options
 * @param {Function} options.addCredential
 * @param {Function} options.t
 * @param {Function} options.updateCredential
 * @param {Function} options.useCredential
 * @param {Function} options.useDispatch
 * @param {Function} options.useViewContext
 * @returns {(function(*, *): void)|*}
 */
const useOnSubmitCredential = ({
  addCredential = reduxActions.credentials.addCredential,
  t = translate,
  updateCredential = reduxActions.credentials.updateCredential,
  useCredential: useAliasCredential = useCredential,
  useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
  useViewContext: useAliasViewContext = useViewContext
} = {}) => {
  const { viewId } = useAliasViewContext();
  const [credential, setCredential] = useState();
  const dispatch = useAliasDispatch();
  const { error, fulfilled } = useAliasCredential();

  useShallowCompareEffect(() => {
    if (credential) {
      const { id, ...data } = credential;

      if (id) {
        updateCredential(id, data)(dispatch);
      } else {
        addCredential(data)(dispatch);
      }
    }
  }, [addCredential, credential, dispatch, updateCredential]);

  useShallowCompareEffect(() => {
    if ((credential && fulfilled) || (credential && error)) {
      dispatch([
        {
          type: reduxTypes.credentials.UPDATE_CREDENTIAL_HIDE
        },
        {
          type: reduxTypes.toastNotifications.TOAST_ADD,
          alertType: (error && AlertVariant.danger) || (fulfilled && AlertVariant.success),
          header: t('toast-notifications.title', { context: ['credential', error && 'error'] }),
          message: t('toast-notifications.description', { context: ['credential', error && 'error'] })
        },
        {
          type: reduxTypes.credentials.RESET_ACTIONS
        },
        {
          type: reduxTypes.view.UPDATE_VIEW,
          viewId
        }
      ]);
    }
  }, [credential, dispatch, error, fulfilled, t]);

  return data => setCredential(() => data);
};

/**
 * Functions for handling state updates for credentials.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {{onEdit: Function, onHide: Function, onAdd: Function}}
 */
const useOnUpdateCredential = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  /**
   * On edit show the credential in dialog
   *
   * @event onEdit
   * @param {object|*} credential
   */
  const onEdit = credential => {
    dispatch({
      type: reduxTypes.credentials.EDIT_CREDENTIAL_SHOW,
      credential
    });
  };

  /**
   * Hide the credential dialog
   *
   * @event onHide
   */
  const onHide = () => {
    dispatch({
      type: reduxTypes.credentials.UPDATE_CREDENTIAL_HIDE
    });
  };

  /**
   * on add show the credential dialog
   *
   * @event onAdd
   * @param {string|*} credentialType
   */
  const onAdd = credentialType => {
    dispatch([
      {
        type: reduxTypes.credentials.CREATE_CREDENTIAL_SHOW,
        credentialType
      }
    ]);
  };

  return {
    onEdit,
    onHide,
    onAdd
  };
};

const context = {
  useCredential,
  useOnSubmitCredential,
  useOnUpdateCredential
};

export { context as default, context, useCredential, useOnSubmitCredential, useOnUpdateCredential };
