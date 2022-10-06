import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { Alert, AlertVariant, Button, ButtonVariant, Form, Title, ValidatedOptions } from '@patternfly/react-core';
import { Button, ButtonVariant, Form, Title, ValidatedOptions } from '@patternfly/react-core';
import { Modal } from '../modal/modal';
// import { connect, reduxActions, reduxTypes, store } from '../../redux';
// import { connect, reduxActions } from '../../redux';
// import { helpers } from '../../common';
import { FormGroup } from '../form/formGroup';
import { TextInput } from '../form/textInput';
import { DropdownSelect, SelectDirection } from '../dropdownSelect/dropdownSelect';
import { FormState } from '../formState/formState';
import { formHelpers } from '../form/formHelpers';
import { translate } from '../i18n/i18n';
import { useCredential, useOnSubmitCredential } from './createCredentialDialogContext';

/**
 * Available auth types.
 *
 * @type {{sshKey: string, usernamePassword: string}}
 */
// const authDictionary = {
//  auth_token: 'Token',
//  ssh_keyFile: 'SSH Key',
//  usernamePassword: 'Username and Password'
// };

const becomeMethodOptions = ['sudo', 'su', 'pbrun', 'pfexec', 'doas', 'dzdo', 'ksu', 'runas'];

/**
 * Generate authentication type options.
 *
 * @type {{title: string|Function, value: *}[]}
 */
// const authenticationTypeOptions = Object.keys(authDictionary).map(type => ({
//   title: () => translate('form-dialog.label', { context: ['option', type] }),
//   value: type
// }));
const authenticationTypeOptions = [
  {
    title: () => translate('form-dialog.label', { context: ['option', 'sshKey'] }),
    value: 'sshKey'
  },
  {
    title: () => translate('form-dialog.label', { context: ['option', 'token'] }),
    value: 'token'
  },
  {
    title: () => translate('form-dialog.label', { context: ['option', 'usernamePassword'] }),
    value: 'usernamePassword',
    selected: true
  }
];

// ToDo: "sshpassphrase" could be "ssh_passphrase" per the api-spec, investigate since the prior GUI code used "sshpassphrase"
/**
 * Create or edit a credential.
 *
 * @param root0
 * @param root0.edit
 * @param root0.show
 * @param root0.t
 * @param root0.credential
 * @param root0.credentialType
 * @param root0.useAddUpdateCredential
 * @param root0.useCredential
 * @param root0.useOnSubmitCredential
 */
const CreateCredentialDialog = ({
  // credential,
  // credentialType,
  // edit,
  // show,
  t,
  useCredential: useAliasCredential,
  useOnSubmitCredential: useAliasOnSubmitCredential
}) => {
  const [authType, setAuthType] = useState();
  const [becomeMethod, setBecomeMethod] = useState();
  const { show, add, edit, credential = {}, credentialType } = useAliasCredential();
  const submitCredential = useAliasOnSubmitCredential();

  const onSetAuthType = ({ value }) => {
    setAuthType(value);
  };

  const onSetBecomeMethod = ({ value }) => {
    setBecomeMethod(value);
  };

  const onCancel = () => {};
  const onSubmit = ({ values }) => {
    console.log('>>> FORM SUBMIT', values);
    submitCredential(null, values);
  };

  const onValidateForm = ({ errors = {}, values = {}, ...rest } = {}) => {
    console.log('errors', errors);
    console.log('rest', rest);

    return {
      auth_token: formHelpers.isEmpty(values.auth_token),
      name: formHelpers.isEmpty(values.name),
      password: formHelpers.isEmpty(values.password),
      ssh_keyfile: formHelpers.isFilePath(values.ssh_keyfile),
      username: formHelpers.isEmpty(values.username)
    };
  };

  console.log('credential >>>>>', show, add, edit, credential, credentialType);

  if (!credentialType) {
    return null;
  }

  const {
    auth_token = '',
    become_method = '',
    become_password = '',
    become_user = '',
    cred_type = credentialType,
    id = '',
    name = '',
    password = '',
    ssh_keyfile = '',
    sshpassphrase = '',
    username = ''
  } = credential;

  const isSshKeyDisabled = cred_type !== 'network' && !ssh_keyfile;

  const renderAuthFields = ({ handleOnEvent, values, touched, errors }) => {
    switch (authType || (values.ssh_keyfile && 'sshKey') || values.cred_type) {
      case 'sshKey':
        return (
          <React.Fragment>
            <FormGroup
              label="SSH Key File"
              error={touched.ssh_keyfile && errors.ssh_keyfile}
              errorMessage="Please enter the full path to the SSH Key File"
            >
              <TextInput
                name="ssh_keyfile"
                value={values.ssh_keyfile}
                placeholder="Enter the full path to the SSH key file"
                onChange={handleOnEvent}
                onClear={handleOnEvent}
                validated={
                  touched.ssh_keyfile && errors.ssh_keyfile ? ValidatedOptions.error : ValidatedOptions.default
                }
              />
            </FormGroup>
            <FormGroup label="Passphrase">
              <TextInput
                name="sshpassphrase"
                type="password"
                value={values.sshpassphrase}
                placeholder="optional"
                onChange={handleOnEvent}
                onClear={handleOnEvent}
              />
            </FormGroup>
          </React.Fragment>
        );
      case 'openshift':
      case 'token':
        return (
          <FormGroup
            label="Token"
            error={touched.auth_token && errors.auth_token}
            errorMessage="You must enter a token"
          >
            <TextInput
              name="auth_token"
              value={values.auth_token}
              placeholder="Enter token"
              onChange={handleOnEvent}
              onClear={handleOnEvent}
              validated={touched.auth_token && errors.auth_token ? ValidatedOptions.error : ValidatedOptions.default}
            />
          </FormGroup>
        );
      case 'satellite':
      case 'vcenter':
      case 'usernamePassword':
      default:
        return (
          <FormGroup
            label="Password"
            error={touched.password && errors.password}
            errorMessage="You must enter a password"
          >
            <TextInput
              name="password"
              type="password"
              value={values.password}
              placeholder="Enter password"
              onChange={handleOnEvent}
              onClear={handleOnEvent}
              validated={touched.password && errors.password ? ValidatedOptions.error : ValidatedOptions.default}
            />
          </FormGroup>
        );
    }
  };

  const renderNetworkFields = ({ handleOnEvent, values }) => {
    if (values.cred_type !== 'network') {
      return null;
    }

    return (
      <React.Fragment>
        <FormGroup key="become_method" label="Become Method">
          <DropdownSelect
            isInline={false}
            onSelect={onSetBecomeMethod}
            options={becomeMethodOptions}
            selectedOptions={becomeMethod}
            direction={SelectDirection.up}
          />
        </FormGroup>
        <FormGroup key="become_user" label="Become User">
          <TextInput
            name="become_user"
            type="text"
            value={values.become_user}
            placeholder="optional"
            onChange={handleOnEvent}
            onClear={handleOnEvent}
          />
        </FormGroup>
        <FormGroup key="become_password" label="Become Password">
          <TextInput
            name="become_password"
            type="password"
            value={values.become_password}
            placeholder="optional"
            onChange={handleOnEvent}
            onClear={handleOnEvent}
          />
        </FormGroup>
      </React.Fragment>
    );
  };

  return (
    <FormState
      setValues={{
        auth_token,
        become_method,
        become_password,
        become_user,
        cred_type,
        id,
        name,
        password,
        ssh_keyfile,
        sshpassphrase,
        username
      }}
      validateOnMount={false}
      validate={onValidateForm}
      onSubmit={onSubmit}
    >
      {({ handleOnSubmit, handleOnEvent, isValid, values, touched, errors }) => (
        <Modal
          isOpen={show}
          showClose
          onClose={onCancel}
          header={<Title headingLevel="h4">{edit ? `View Credential` : 'Add Credential'}</Title>}
          actions={[
            <Button key="save" onClick={handleOnSubmit} isDisabled={!isValid}>
              {t('form-dialog.label', { context: ['submit', edit && 'edit', 'create-credential'] })}
            </Button>,
            <Button key="cancel" variant={ButtonVariant.secondary} autoFocus={edit} onClick={onCancel}>
              {t('form-dialog.label', { context: 'cancel' })}
            </Button>
          ]}
        >
          {(isValid && 'valid') || 'invalid'}
          <Form isHorizontal onSubmit={handleOnSubmit}>
            <FormGroup label="Source Type">
              <TextInput type="text" isReadOnly value={t('form-dialog.label', { context: values.cred_type })} />
            </FormGroup>
            <FormGroup
              label={t('form-dialog.label', { context: ['name', 'create-credential'] })}
              error={touched.name && errors.name}
              errorMessage="You must enter a credential name"
            >
              <TextInput
                name="name"
                value={values.name}
                placeholder="Enter a name for the credential"
                onChange={handleOnEvent}
                onClear={handleOnEvent}
                maxLength={64}
                validated={touched.name && errors.name ? ValidatedOptions.error : ValidatedOptions.default}
              />
            </FormGroup>
            {!isSshKeyDisabled && (
              <FormGroup label="Authentication Type">
                <DropdownSelect
                  isInline={false}
                  onSelect={onSetAuthType}
                  options={authenticationTypeOptions}
                  selectedOptions={authType}
                />
              </FormGroup>
            )}
            <FormGroup
              label="Username"
              error={touched.username && errors.username}
              errorMessage="You must enter a username"
            >
              <TextInput
                name="username"
                value={values.username}
                placeholder="Enter Username"
                onChange={handleOnEvent}
                onClear={handleOnEvent}
                validated={touched.username && errors.username ? ValidatedOptions.error : ValidatedOptions.default}
              />
            </FormGroup>
            {renderAuthFields({ handleOnEvent, values, touched, errors })}
            {renderNetworkFields({ handleOnEvent, values })}
          </Form>
        </Modal>
      )}
    </FormState>
  );
};

CreateCredentialDialog.propTypes = {
  // addCredential: PropTypes.func,
  // becomeMethods: PropTypes.arrayOf(PropTypes.string),
  // getCredentials: PropTypes.func,
  // updateCredential: PropTypes.func,
  // credential: PropTypes.object,
  // credentialType: PropTypes.string,
  // show: PropTypes.bool,
  // edit: PropTypes.bool,
  // fulfilled: PropTypes.bool,
  // error: PropTypes.bool,
  // errorMessage: PropTypes.string,
  t: PropTypes.func,
  useCredential: PropTypes.func,
  useOnSubmitCredential: PropTypes.func
};

CreateCredentialDialog.defaultProps = {
  // addCredential: helpers.noop,
  // becomeMethods: ['sudo', 'su', 'pbrun', 'pfexec', 'doas', 'dzdo', 'ksu', 'runas'],
  // getCredentials: helpers.noop,
  // updateCredential: helpers.noop,
  // credential: {},
  // credentialType: null,
  // show: false,
  // edit: false,
  // fulfilled: false,
  // error: false,
  // errorMessage: null,
  t: translate,
  useCredential,
  useOnSubmitCredential
};

export { CreateCredentialDialog as default, CreateCredentialDialog, authenticationTypeOptions };

/*
const mapDispatchToProps = dispatch => ({
  getCredentials: queryObj => dispatch(reduxActions.credentials.getCredentials(null, queryObj)),
  addCredential: data => dispatch(reduxActions.credentials.addCredential(data)),
  updateCredential: (id, data) => dispatch(reduxActions.credentials.updateCredential(id, data))
});

const mapStateToProps = ({ credentials }) => ({ ...credentials.dialog });

const ConnectedCreateCredentialDialog = connect(mapStateToProps, mapDispatchToProps)(CreateCredentialDialog);

export {
  ConnectedCreateCredentialDialog as default,
  ConnectedCreateCredentialDialog,
  CreateCredentialDialog,
  authenticationTypeOptions
};
*/
