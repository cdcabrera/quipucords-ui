/**
 * Add Source Modal Component
 *
 * This component displays a modal for adding or editing a source of a specific type. It provides
 * a form to input source details including name, hosts, port, credential, and SSL settings.
 *
 * @module addSourceModal
 */
import React, { FormEvent, useEffect, useState } from 'react';
import {
  ActionGroup,
  Button,
  Checkbox,
  Form,
  FormContextProvider,
  FormGroup,
  FormSelect,
  FormSelectOption,
  HelperText,
  Modal,
  ModalVariant,
  Radio,
  TextArea,
  TextInput
} from '@patternfly/react-core';
import { SimpleDropdown } from '../../components/simpleDropdown/simpleDropdown';
import { TypeaheadCheckboxes } from '../../components/typeAheadCheckboxes/typeaheadCheckboxes';
import { helpers } from '../../helpers';
import { useGetCredentialsApi } from '../../hooks/useCredentialApi';
import { type SourceType } from '../../types/types';

interface AddSourceModalProps {
  isOpen: boolean;
  source?: SourceType;
  sourceType?: string;
  onClose?: () => void;
  onSubmit?: (payload: any) => void;
  useGetCredentials?: typeof useGetCredentialsApi;
}

interface SourceFormFieldsProps {
  formData: any;
  credOptions: { value: string; label: string }[];
  isNetwork: boolean;
  handleInputChange: (field: string, value: any) => void;
  setValue: (field: string, value: any) => void;
  getValue: (field: string) => any;
}

const useSourceForm = (sourceType: string | undefined, source?: SourceType) => {
  const [formData, setFormData] = useState({
    credentials: source?.credentials?.map(c => c.id) || [],
    useParamiko: source?.options?.use_paramiko ?? false,
    sslVerify: source?.options?.ssl_cert_verify ?? true,
    sslProtocol: source?.options?.disable_ssl ? 'Disable SSL' : source?.options?.ssl_protocol || 'SSLv23',
    name: source?.name || '',
    hosts: source?.hosts?.join(',') || '',
    port: source?.port ? String(source.port) : ''
  });

  const sourceTypeValue = source?.source_type || sourceType?.split(' ')?.shift()?.toLowerCase();
  const isNetwork = sourceTypeValue === 'network';

  const resetForm = () => {
    setFormData({
      credentials: [],
      useParamiko: false,
      sslVerify: true,
      sslProtocol: 'SSLv23',
      name: '',
      hosts: '',
      port: ''
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const filterFormData = (values: any) => {
    const { credentials, useParamiko, sslVerify, sslProtocol, name, hosts, port } = formData;
    const payload = {
      name: name,
      credentials: credentials.map(c => Number(c)),
      hosts: hosts.split(','),
      port: port || (isNetwork ? '22' : '443'),
      options: !isNetwork
        ? {
            ssl_cert_verify: sslProtocol !== 'Disable SSL' && sslVerify,
            disable_ssl: sslProtocol === 'Disable SSL',
            ...(sslProtocol !== 'Disable SSL' && { ssl_protocol: sslProtocol })
          }
        : {
            use_paramiko: useParamiko
          },
      ...(!source && { source_type: sourceTypeValue }),
      ...(source && { id: source.id })
    };

    return payload;
  };

  return {
    formData,
    isNetwork,
    resetForm,
    handleInputChange,
    filterFormData
  };
};

const SourceFormFields: React.FC<SourceFormFieldsProps> = ({
  formData,
  credOptions,
  isNetwork,
  handleInputChange,
  setValue,
  getValue
}) => (
  <>
    <FormGroup label="Name" isRequired fieldId="name">
      <TextInput
        value={formData?.name}
        placeholder="Enter a name for the credential"
        isRequired
        type="text"
        id="credential-name"
        name="name"
        onChange={event => handleInputChange('name', (event.target as HTMLInputElement).value)}
      />
    </FormGroup>

    <FormGroup label="Credentials" fieldId="credentials" isRequired>
      {isNetwork ? (
        <TypeaheadCheckboxes
          onChange={(selections: string[]) => {
            const selectedIds = selections.map(Number);
            const validIds = selectedIds.filter(id => !isNaN(id));
            handleInputChange('credentials', validIds);
          }}
          options={credOptions}
          selectedOptions={formData.credentials?.map(String) || []}
        />
      ) : (
        <FormSelect
          value={formData.credentials[0]?.toString() || ''}
          onChange={(event: FormEvent<HTMLSelectElement>, value: string) => {
            const selectedCredential = Number(value);
            if (!isNaN(selectedCredential)) {
              handleInputChange('credentials', [selectedCredential]);
            } else {
              handleInputChange('credentials', []);
            }
          }}
        >
          <FormSelectOption value="" label="Select a credential" isDisabled />
          {credOptions.map(option => (
            <FormSelectOption
              key={option.value}
              value={option.value.toString()}
              label={option.label}
            />
          ))}
        </FormSelect>
      )}
    </FormGroup>

    {isNetwork ? (
      <>
        <FormGroup label="Search addresses" isRequired fieldId="hosts">
          <TextArea
            placeholder="Enter values separated by commas"
            value={getValue('hosts')}
            onChange={(_ev, val) => setValue('hosts', val)}
            isRequired
            id="source-hosts"
            name="hosts"
          />
          <HelperText>
            Type IP addresses, IP ranges, and DNS host names. Wildcards are valid. Use CIDR or Ansible notation for ranges.
          </HelperText>
        </FormGroup>

        <FormGroup label="Port" fieldId="port">
          <TextInput
            value={getValue('port')}
            placeholder="Optional"
            type="text"
            id="source-port"
            name="port"
            onChange={ev => {
              setValue('port', (ev.target as HTMLInputElement).value);
            }}
          />
          <HelperText>Default port is 22</HelperText>
        </FormGroup>
      </>
    ) : (
      <>
        <FormGroup label="IP address or hostname" isRequired fieldId="hosts">
          <TextInput
            value={getValue('hosts')}
            onChange={(_ev, val) => setValue('hosts', val)}
            isRequired
            id="source-hosts"
            name="hosts"
          />
          <HelperText>Enter an IP address or hostname</HelperText>
        </FormGroup>

        <FormGroup label="Port" fieldId="port">
          <TextInput
            value={getValue('port')}
            placeholder="Optional"
            type="text"
            id="source-port"
            name="port"
            onChange={ev => {
              setValue('port', (ev.target as HTMLInputElement).value);
            }}
          />
          <HelperText>Default port is 443</HelperText>
        </FormGroup>
      </>
    )}

    {isNetwork ? (
      <FormGroup fieldId="paramiko">
        <Checkbox
          key="paramiko"
          label="Connect using Paramiko instead of Open SSH"
          id="paramiko"
          isChecked={formData.useParamiko}
          onChange={(_ev, checked) => handleInputChange('useParamiko', checked)}
        />
      </FormGroup>
    ) : (
      <>
        <FormGroup label="Connection" fieldId="connection">
          <SimpleDropdown
            isFullWidth
            label={formData.sslProtocol}
            variant="default"
            onSelect={item => handleInputChange('sslProtocol', item)}
            dropdownItems={['SSLv23', 'TLSv1', 'TLSv1.1', 'TLSv1.2', 'Disable SSL']}
          />
        </FormGroup>

        <FormGroup fieldId="ssl_verify">
          <Checkbox
            key="ssl_verify"
            label="Verify SSL certificate"
            id="ssl_verify"
            isDisabled={formData.sslProtocol === 'Disable SSL'}
            isChecked={formData.sslProtocol !== 'Disable SSL' && formData.sslVerify}
            onChange={(_ev, checked) => handleInputChange('sslVerify', checked)}
          />
        </FormGroup>
      </>
    )}
  </>
);

const AddSourceModal: React.FC<AddSourceModalProps> = ({
  isOpen,
  source,
  sourceType,
  onClose = Function.prototype,
  onSubmit = Function.prototype,
  useGetCredentials = useGetCredentialsApi
}) => {
  const { getCredentials } = useGetCredentials();
  const [credOptions, setCredOptions] = useState<{ value: string; label: string }[] | []>([]);

  const {
    formData,
    isNetwork,
    handleInputChange,
    resetForm,
    filterFormData
  } = useSourceForm(sourceType, source);

  useEffect(() => {
    if (isOpen) {
      getCredentials({
        params: {
          cred_type: sourceType?.split(' ')?.shift()?.toLowerCase() || ''
        }
      })
        .then(response => {
          const updatedOptions = response?.data?.results?.map(({ name, id }) => ({ label: name, value: `${id}` }));
          setCredOptions(updatedOptions || []);
        })
        .catch(err => {
          if (!helpers.TEST_MODE) {
            console.error(err);
          }
        });
    }
  }, [getCredentials, sourceType, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, sourceType, resetForm]);

  const onAdd = (values: any) => {
    const filteredData = filterFormData(values);
    console.log("!!!!!!!!");  // Check if name is correctly set here

    console.log(filteredData.name);  // Check if name is correctly set here
    onSubmit(filteredData);
  };

  return (
    <Modal
      variant={ModalVariant.small}
      title={(source && 'Edit') || `Add Source: ${sourceType}`}
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
    >
      <FormContextProvider
        initialValues={{
          name: formData.name,
          hosts: formData.hosts,
          port: formData.port
        }}
      >
        {({ setValue, getValue, values }) => (
          <Form>
            <SourceFormFields
              formData={formData}
              credOptions={credOptions}
              isNetwork={isNetwork}
              handleInputChange={handleInputChange}
              setValue={setValue}
              getValue={getValue}
            />
            <ActionGroup>
              <Button
                variant="primary"
                onClick={() => {
                  onAdd(values);
                  resetForm();
                  onClose();
                }}
              >
                Save
              </Button>
              <Button variant="link" onClick={() => onClose()}>
                Cancel
              </Button>
            </ActionGroup>
          </Form>
        )}
      </FormContextProvider>
    </Modal>
  );
};

export { AddSourceModal as default, AddSourceModal, type AddSourceModalProps };
