import React from 'react';
import PropTypes from 'prop-types';
import { reduxTypes, storeHooks } from '../../redux';
import { translate } from '../i18n/i18n';

const fieldOptions = [
  { title: 'Network', value: 'network' },
  { title: 'Satellite', value: 'satellite' },
  { title: 'VCenter', value: 'vcenter' }
];

const useAddCredential = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return value => {
    dispatch([
      {
        type: reduxTypes.credentials.CREATE_CREDENTIAL_SHOW,
        credentialType: value
      }
    ]);
  };
};

const AddCredential = ({ options, useAddCredential: useAliasAddCredential } = {}) => {
  const addCredential = useAliasAddCredential();

  return (

  );
};

AddCredential.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      value: PropTypes.any,
      selected: PropTypes.bool
    })
  ),
  t: PropTypes.func,
  useAddCredential: PropTypes.func
};

AddCredential.defaultProps = {
  options: fieldOptions,
  t: translate,
  useAddCredential
};
