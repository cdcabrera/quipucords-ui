// import { useShallowCompareEffect } from 'react-use';
// import { AlertVariant } from '@patternfly/react-core';
import { reduxActions, reduxTypes, storeHooks } from '../../redux';
// import { apiTypes } from '../../constants/apiConstants';
// import { translate } from '../i18n/i18n';

const useCredential = ({
  // addCredential = reduxActions.credentials.addCredential,
  // updateCredential = reduxActions.credentials.updateCredential,
  // t = translate,
  // useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
  useSelector: useAliasSelector = storeHooks.reactRedux.useSelector
} = {}) => {
  const response = useAliasSelector(({ credentials }) => credentials?.dialog, {});
  console.log('SELECTOR >>>>>>', response);
  return response;
};

/**
 * Return an updated source. Display relative toast messaging after wizard closes.
 *
 * @param {object} options
 * @param {Function} options.t
 * @param {Function} options.useDispatch
 * @param {Function} options.useSelectorsResponse
 * @param id
 * @param id.addCredential
 * @param id.updateCredential
 * @param id.t
 * @param id.useDispatch
 * @param id.useSelectorsResponse
 * @param options.addCredential
 * @param options.updateCredential
 * @returns {{}}
 */
const useOnSubmitCredential = ({
  addCredential = reduxActions.credentials.addCredential,
  updateCredential = reduxActions.credentials.updateCredential,
  // t = translate,
  useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch
  // useSelectorsResponse: useAliasSelectorsResponse = storeHooks.reactRedux.useSelectorsResponse
} = {}) => {
  const dispatch = useAliasDispatch();
  // const response = useAliasSelectorsResponse(({ credentials }) => credentials?.dialog, {});
  // console.log('ADD UPDATE CRED >>>>>>', response);

  return (id, data) => {
    if (id) {
      console.log('UPDATE CRED', id, data);
      updateCredential(id, data)(dispatch);
    } else {
      console.log('ADD CRED', data);
      addCredential(data)(dispatch);
    }
  };
};

/**
 * An onAddCredential callback for adding a credential.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnAddCredential = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return credentialType => {
    dispatch([
      {
        type: reduxTypes.credentials.CREATE_CREDENTIAL_SHOW,
        credentialType
      }
    ]);
  };
};

/**
 * An onEditCredential callback for editing a credential.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnEditCredential = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return credential => {
    dispatch({
      type: reduxTypes.credentials.EDIT_CREDENTIAL_SHOW,
      credential
    });
  };
};

const context = {
  useCredential,
  useOnSubmitCredential,
  useOnAddCredential,
  useOnEditCredential
};

export { context as default, context, useCredential, useOnSubmitCredential, useOnAddCredential, useOnEditCredential };
