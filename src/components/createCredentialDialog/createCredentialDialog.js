import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonVariant,
  EmptyState,
  EmptyStateIcon,
  Form,
  Spinner,
  Title,
  ValidatedOptions
} from '@patternfly/react-core';
import { useCredential, useOnSubmitCredential, useOnUpdateCredential } from './createCredentialDialogContext';
import { Modal } from '../modal/modal';
import { DropdownSelect, SelectDirection } from '../dropdownSelect/dropdownSelect';
import { FormGroup } from '../form/formGroup';
import { TextInput } from '../form/textInput';
import { FormState } from '../formState/formState';
import { formHelpers } from '../form/formHelpers';
import { translate } from '../i18n/i18n';

/**
 * Available method options
 *
 * @type {string[]}
 */
const becomeMethodTypeOptions = ['sudo', 'su', 'pbrun', 'pfexec', 'doas', 'dzdo', 'ksu', 'runas'];

/**
 * Generate authentication type options.
 *
 * @type {{title: Function | React.ReactNode, value: string, selected: boolean}[]}
 */
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
 * @param {object} props
 * @param {Array} props.authenticationOptions
 * @param {Array} props.becomeMethodOptions
 * @param {Function} props.t
 * @param {Function} props.useCredential
 * @param {Function} props.useOnSubmitCredential
 * @param {Function} props.useOnUpdateCredential
 * @returns {React.ReactNode|null}
 */
const CreateCredentialDialog = ({
  authenticationOptions,
  becomeMethodOptions,
  t,
  useCredential: useAliasCredential,
  useOnSubmitCredential: useAliasOnSubmitCredential,
  useOnUpdateCredential: useAliasOnUpdateCredential
}) => {
  const [authType, setAuthType] = useState();
  // const [becomeMethod, setBecomeMethod] = useState();
  const { show, edit, credential = {}, credentialType, pending } = useAliasCredential();
  const { onHide } = useAliasOnUpdateCredential();
  const submitCredential = useAliasOnSubmitCredential();

  useEffect(() => {
    switch (credentialType) {
      case 'openshift':
        setAuthType('token');
        break;
      case 'network':
      case 'satellite':
      case 'vcenter':
      default:
        setAuthType('usernamePassword');
        break;
    }
  }, [credentialType]);

  /**
   * Reset form fields on auth type selection.
   *
   * @param {object} event
   * @param {*} event.value
   * @param {Function} handleOnEventCustom
   */
  const onSetAuthType = ({ value }, handleOnEventCustom) => {
    handleOnEventCustom([
      {
        name: 'auth_token',
        value: undefined
      },
      {
        name: 'password',
        value: undefined
      },
      {
        name: 'ssh_keyfile',
        value: undefined
      },
      {
        name: 'sshpassphrase',
        value: undefined
      }
    ]);

    setAuthType(value);
  };

  // const onSetBecomeMethod = ({ value }) => setBecomeMethod(value);

  const onCancel = () => onHide();

  const onSubmit = ({ values = {} } = {}) => {
    const { id, ...data } = values;
    submitCredential(id, data);
  };

  const onValidateForm = ({ values = {} } = {}) => ({
    name: formHelpers.isEmpty(values.name),
    auth_token: authType === 'token' && formHelpers.isEmpty(values.auth_token),
    ssh_keyfile:
      (authType === 'sshKey' && formHelpers.isEmpty(values.ssh_keyfile)) ||
      (authType === 'sshKey' && !formHelpers.isFilePath(values.ssh_keyfile)),
    password: authType === 'usernamePassword' && formHelpers.isEmpty(values.password),
    username: authType === 'usernamePassword' && formHelpers.isEmpty(values.username)
  });

  if (!credentialType) {
    return null;
  }

  const renderCommonFields = ({ errors, touched, values, handleOnEvent, handleOnEventCustom }) => (
    <React.Fragment>
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
      {values.cred_type === 'network' && (
        <FormGroup label="Authentication Type">
          <DropdownSelect
            isInline={false}
            onSelect={event => onSetAuthType(event, handleOnEventCustom)}
            options={authenticationOptions}
            selectedOptions={authType}
          />
        </FormGroup>
      )}
      <FormGroup label="Username" error={touched.username && errors.username} errorMessage="You must enter a username">
        <TextInput
          name="username"
          value={values.username}
          placeholder="Enter Username"
          onChange={handleOnEvent}
          onClear={handleOnEvent}
          validated={touched.username && errors.username ? ValidatedOptions.error : ValidatedOptions.default}
        />
      </FormGroup>
    </React.Fragment>
  );

  const renderAuthFields = ({ handleOnEvent, values, touched, errors } = {}) => {
    // const check = values.cred_type || authType || (values.ssh_keyfile && 'sshKey');
    // console.log(check);
    switch (authType) {
      case 'sshKey':
        return (
          <React.Fragment>
            <FormGroup
              key="ssh_keyfile"
              label="SSH Key File"
              error={touched.ssh_keyfile && errors.ssh_keyfile}
              errorMessage="Please enter the full path to the SSH Key File"
            >
              <TextInput
                name="ssh_keyfile"
                value={values.ssh_keyfile}
                placeholder="Enter a SSH key file path"
                onChange={handleOnEvent}
                onClear={handleOnEvent}
                validated={
                  touched.ssh_keyfile && errors.ssh_keyfile ? ValidatedOptions.error : ValidatedOptions.default
                }
              />
            </FormGroup>
            <FormGroup key="sshpassphrase" label="Passphrase">
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
      case 'token':
        return (
          <FormGroup
            key="auth_token"
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
      case 'usernamePassword':
      default:
        return (
          <FormGroup
            key="password"
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

  const renderNetworkFields = ({ handleOnEvent, values } = {}) => {
    if (values.cred_type !== 'network') {
      return null;
    }

    return (
      <React.Fragment>
        <FormGroup key="become_method" label="Become Method">
          <DropdownSelect
            name="become_method"
            isInline={false}
            onSelect={handleOnEvent}
            options={becomeMethodOptions}
            selectedOptions={values.become_method}
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

  const {
    auth_token,
    become_method,
    become_password,
    become_user,
    cred_type = credentialType,
    id,
    name = '',
    password,
    ssh_keyfile,
    sshpassphrase,
    username = null
  } = credential;

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
      {({ handleOnSubmit, isValid, values, ...options } = {}) => (
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
          <Form isHorizontal onSubmit={handleOnSubmit}>
            {pending && (
              <EmptyState className="quipucords-empty-state">
                <EmptyStateIcon icon={Spinner} />
                <Title headingLevel="h3">
                  {t('form-dialog.empty-state', { context: ['title', 'create-scan', 'pending'] })}
                </Title>
              </EmptyState>
            )}
            {!pending && (
              <React.Fragment>
                <FormGroup label="Source Type">
                  <TextInput type="text" isReadOnly value={t('form-dialog.label', { context: values.cred_type })} />
                </FormGroup>
                {renderCommonFields({ values, ...options })}
                {renderAuthFields({ values, ...options })}
                {renderNetworkFields({ values, ...options })}
              </React.Fragment>
            )}
          </Form>
        </Modal>
      )}
    </FormState>
  );
};

CreateCredentialDialog.propTypes = {
  authenticationOptions: PropTypes.array,
  becomeMethodOptions: PropTypes.array,
  t: PropTypes.func,
  useCredential: PropTypes.func,
  useOnSubmitCredential: PropTypes.func,
  useOnUpdateCredential: PropTypes.func
};

CreateCredentialDialog.defaultProps = {
  authenticationOptions: authenticationTypeOptions,
  becomeMethodOptions: becomeMethodTypeOptions,
  t: translate,
  useCredential,
  useOnSubmitCredential,
  useOnUpdateCredential
};

export {
  CreateCredentialDialog as default,
  CreateCredentialDialog,
  authenticationTypeOptions,
  becomeMethodTypeOptions
};
