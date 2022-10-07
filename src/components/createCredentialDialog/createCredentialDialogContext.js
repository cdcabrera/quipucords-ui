import { reduxActions, reduxTypes, storeHooks } from '../../redux';

/**
 * Return credential dialog response
 *
 * @param {object} options
 * @param {Function} options.useSelector
 * @returns {*}
 */
const useCredential = ({ useSelector: useAliasSelector = storeHooks.reactRedux.useSelector } = {}) =>
  useAliasSelector(({ credentials }) => credentials?.dialog, {});

/**
 * Return an updated source. Display relative toast messaging after wizard closes.
 *
 * @param {object} options
 * @param {Function} options.addCredential
 * @param {Function} options.updateCredential
 * @param {Function} options.useDispatch
 * @returns {(function(*, *): void)|*}
 */
const useOnSubmitCredential = ({
  addCredential = reduxActions.credentials.addCredential,
  updateCredential = reduxActions.credentials.updateCredential,
  useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch
} = {}) => {
  const dispatch = useAliasDispatch();

  return (id, data) => {
    if (id) {
      updateCredential(id, data)(dispatch);
    } else {
      addCredential(data)(dispatch);
    }
  };
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
