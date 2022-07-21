import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem } from '@patternfly/react-core';
import { reduxTypes, storeHooks } from '../../redux';
import { translate } from '../i18n/i18n';

const fieldOptions = [
  { title: 'Network', value: 'network' },
  { title: 'Satellite', value: 'satellite' },
  { title: 'VCenter', value: 'vcenter' }
];

const useAddCredentialType = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
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

const AddCredentialType = ({ options, useAddCredentialType: useAliasAddCredentialType, t } = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const addCredential = useAliasAddCredentialType();

  const onToggle = value => {
    setIsOpen(value);
  };

  return <Dropdown isOpen={isOpen} onSelect={addCredential} />;
};

AddCredentialType.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      value: PropTypes.any,
      selected: PropTypes.bool
    })
  ),
  t: PropTypes.func,
  useAddCredentialType: PropTypes.func
};

AddCredentialType.defaultProps = {
  options: fieldOptions,
  t: translate,
  useAddCredentialType
};
