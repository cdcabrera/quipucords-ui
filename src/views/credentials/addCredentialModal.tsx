/**
 * Add Credential Modal Component
 *
 * @module AddCredentialModal
 */
import * as React from 'react';
import {
  ActionGroup,
  Button,
  DropdownItem,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  TextArea,
  TextInput
} from '@patternfly/react-core';
import { SimpleDropdown } from '../../components/simpleDropdown/simpleDropdown';
import { CredentialType } from '../../types/types';

interface AddCredentialModalProps {
  isOpen: boolean;
  credential?: CredentialType;
  credentialType?: string;
  onClose: () => void;
  onSubmit: (payload: any) => void;
}

interface CredentialFormType extends Partial<CredentialType> {
  authenticationType?: string;
}

const useCredentialForm = (credentialType: string | undefined, credential?: CredentialType) => {
  const initialFormState: CredentialFormType = {
    password: '',
    become_user: '',
    name: '',
    ssh_key: '',
    become_password: '',
    authenticationType: '',
    auth_token: '',
    become_method: '',
    username: ''
  };
  const [formData, setFormData] = React.useState<CredentialFormType>(initialFormState);

  const typeValue = credential?.cred_type || credentialType?.split(' ')?.shift()?.toLowerCase() || '';
  const [authType, setAuthType] = React.useState('');

  React.useEffect(() => {
    // this could also be a helper, for testing
    const deriveAuthType = () => {
      switch (typeValue) {
        case 'openshift':
        case 'rhacs':
          return 'Token';
        default:
          return 'Username and Password';
      }
    };

    setAuthType(deriveAuthType());
    setFormData(prev => ({ ...prev, ...credential }));

    return () => {
      setFormData(initialFormState);
    };
  }, [typeValue, credential]);

  const handleInputChange = React.useCallback(
    (field: string, value: string) => {
      setFormData({ ...formData, [field]: value });
    },
    [formData]
  );

  const filterFormData = (data: CredentialFormType) =>
    Object.fromEntries(Object.entries(data).filter(([, value]) => value));

  return {
    formData,
    authType,
    typeValue,
    setAuthType,
    handleInputChange,
    filterFormData
  };
};

const CredentialFormFields: React.FC<{
  formData: any;
  authType: string;
  typeValue: string;
  setAuthType: (credentialType: string) => void;
  handleInputChange: (field: string, value: string) => void;
}> = ({ formData, authType, typeValue, setAuthType, handleInputChange }) => {
  return (
    <React.Fragment>
      <FormGroup label="Name" isRequired fieldId="name">
        <TextInput
          value={formData.name}
          placeholder="Enter a name for the credential"
          isRequired
          type="text"
          id="credential-name"
          name="name"
          onChange={ev => handleInputChange('name', (ev.target as HTMLInputElement).value)}
        />
      </FormGroup>

      {/* Render Authentication Type dropdown only if needed based on the credential type */}
      {(typeValue === 'network' || typeValue === 'openshift') && (
        <FormGroup label="Authentication Type" fieldId="auth_type">
          <SimpleDropdown
            label={authType}
            variant="default"
            isFullWidth
            dropdownItems={
              typeValue === 'network'
                ? ['Username and Password', 'SSH Key'].map(s => (
                    <DropdownItem key={s} component="button" onClick={() => setAuthType(s)}>
                      {s}
                    </DropdownItem>
                  ))
                : ['Token', 'Username and Password'].map(s => (
                    <DropdownItem key={s} component="button" onClick={() => setAuthType(s)}>
                      {s}
                    </DropdownItem>
                  ))
            }
          />
        </FormGroup>
      )}

      {/* Conditional rendering for Token input */}
      {authType === 'Token' && (
        <FormGroup label="Token" isRequired fieldId="auth_token">
          <TextInput
            value={formData.auth_token}
            placeholder="Enter Token"
            isRequired
            type="text"
            id="credential-token"
            name="auth_token"
            onChange={ev => handleInputChange('auth_token', (ev.target as HTMLInputElement).value)}
          />
        </FormGroup>
      )}

      {/* Username and Password fields */}
      {authType === 'Username and Password' && (
        <React.Fragment>
          <FormGroup label="Username" isRequired fieldId="username">
            <TextInput
              value={formData.username}
              isRequired
              placeholder="Enter username"
              id="credential-username"
              name="username"
              onChange={ev => handleInputChange('username', (ev.target as HTMLInputElement).value)}
            />
          </FormGroup>
          <FormGroup label="Password" isRequired fieldId="password">
            <TextInput
              value={formData.password}
              isRequired
              placeholder="Enter password"
              type="password"
              id="credential-password"
              name="password"
              onChange={ev => handleInputChange('password', (ev.target as HTMLInputElement).value)}
            />
          </FormGroup>
        </React.Fragment>
      )}

      {/* SSH Key input */}
      {authType === 'SSH Key' && (
        <React.Fragment>
          <FormGroup label="Username" isRequired fieldId="username">
            <TextInput
              value={formData.username}
              isRequired
              placeholder="Enter username"
              id="credential-username"
              name="username"
              onChange={ev => handleInputChange('username', (ev.target as HTMLInputElement).value)}
            />
          </FormGroup>
          <FormGroup label="SSH Key" isRequired fieldId="ssh_key">
            <TextArea
              value={formData.ssh_key}
              placeholder="Enter SSH Key"
              isRequired
              id="credential-ssh-key"
              name="ssh_key"
              onChange={ev => handleInputChange('ssh_key', ev.target.value)}
              rows={10}
            />
          </FormGroup>
        </React.Fragment>
      )}

      {/* Network specific fields */}
      {typeValue === 'network' && (
        <React.Fragment>
          <FormGroup label="Become Method" fieldId="become_method">
            <SimpleDropdown
              label={formData.become_method || 'Select option'}
              variant="default"
              isFullWidth
              dropdownItems={[
                <DropdownItem key="none" component="button" onClick={() => handleInputChange('become_method', '')}>
                  Select option
                </DropdownItem>,
                ...['sudo', 'su', 'pbrun', 'pfexec', 'doas', 'dzdo', 'ksu', 'runas'].map(method => (
                  <DropdownItem
                    key={method}
                    component="button"
                    onClick={() => handleInputChange('become_method', method)}
                  >
                    {method}
                  </DropdownItem>
                ))
              ]}
            />
          </FormGroup>
          <FormGroup label="Become User" fieldId="become_user">
            <TextInput
              value={formData.become_user}
              placeholder="Enter become user (optional)"
              type="text"
              id="become_user"
              name="become_user"
              onChange={ev => handleInputChange('become_user', (ev.target as HTMLInputElement).value)}
            />
          </FormGroup>
          <FormGroup label="Become Password" fieldId="become_password">
            <TextInput
              value={formData.become_password}
              placeholder="Enter become password (optional)"
              type="password"
              id="become_password"
              name="become_password"
              onChange={ev => handleInputChange('become_password', (ev.target as HTMLInputElement).value)}
            />
          </FormGroup>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const AddCredentialModal: React.FC<AddCredentialModalProps> = ({
  isOpen,
  credential,
  credentialType,
  onClose,
  onSubmit
}) => {
  const { formData, authType, typeValue, setAuthType, handleInputChange, filterFormData } = useCredentialForm(
    credentialType,
    credential
  );

  const onAdd = () => {
    const payload = {
      ...formData,
      cred_type: typeValue,
      ...(credential && { id: credential.id })
    };
    const filtered_data = filterFormData(payload);
    onSubmit(filtered_data);
  };

  return (
    <Modal
      variant={ModalVariant.small}
      title={`${credential ? 'Edit' : 'Add'} Credential: ${credentialType}`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form>
        <CredentialFormFields
          formData={formData}
          authType={authType}
          typeValue={typeValue}
          setAuthType={setAuthType}
          handleInputChange={handleInputChange}
        />
        <ActionGroup>
          <Button variant="primary" onClick={onAdd}>
            Save
          </Button>
          <Button variant="link" onClick={onClose}>
            Cancel
          </Button>
        </ActionGroup>
      </Form>
    </Modal>
  );
};
export { AddCredentialModal, CredentialFormFields, useCredentialForm, AddCredentialModalProps };
