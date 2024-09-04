import React from 'react';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { AddCredentialModal, CredentialFormFields, useCredentialForm } from '../addCredentialModal';

describe('AddCredentialModal', () => {
  let mockOnClose, mockOnSubmit;

  beforeEach(() => {
    mockOnClose = jest.fn();
    mockOnSubmit = jest.fn();
    render(
      <AddCredentialModal
        isOpen={true}
        credentialType="network"
        credential={undefined}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot with the correct title', () => {
    const title = screen.getByText('Add Credential: network');
    expect(title).toMatchSnapshot('AddCredentialModal Title');
  });
  it('should call onSubmit with the correct filtered data when "Save" is clicked', () => {
    const saveButton = screen.getByText('Save');
    const nameInput = screen.getByPlaceholderText('Enter a name for the credential');

    fireEvent.change(nameInput, { target: { value: 'Test Credential' } });
    fireEvent.click(saveButton);

    expect(mockOnSubmit.mock.calls).toMatchSnapshot('onSubmit, filtered data');
  });

  it('should handle input changes correctly and match snapshot', () => {
    const nameInput = screen.getByPlaceholderText('Enter a name for the credential') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Another Test Credential' } });

    expect(nameInput.value).toBe('Another Test Credential');
    expect(nameInput).toMatchSnapshot('Input change - name');
  });
});

describe('useCredentialForm', () => {
  let result;

  beforeEach(() => {
    result = renderHook(() => useCredentialForm('network')).result;
  });

  it('should initialize formData correctly', () => {
    expect(result.current.formData).toEqual({
      name: '',
      authenticationType: '',
      auth_token: '',
      username: '',
      password: '',
      ssh_key: '',
      become_method: '',
      become_user: '',
      become_password: ''
    });
  });

  it('should derive authType based on type and credential', () => {
    const { authType } = result.current;
    expect(authType).toBe('Username and Password');
  });

  it('should derive Token as authType for openshift credential type', () => {
    result = renderHook(() => useCredentialForm('openshift')).result;

    const { authType } = result.current;
    expect(authType).toBe('Token');
  });

  it('should derive Token as authType for rhacs credential type', () => {
    result = renderHook(() => useCredentialForm('rhacs')).result;

    const { authType } = result.current;
    expect(authType).toBe('Token');
  });

  it('should update formData when handleInputChange is called', () => {
    act(() => {
      result.current.handleInputChange('name', 'Updated Credential');
    });

    expect(result.current.formData.name).toBe('Updated Credential');
  });

  it('should filter formData to only include non-empty values', () => {
    act(() => {
      result.current.handleInputChange('name', 'Filtered Credential');
    });

    const filteredData = result.current.filterFormData(result.current.formData);
    expect(filteredData).toEqual({ name: 'Filtered Credential' });
  });
});

describe('CredentialFormFields', () => {
  const mockHandleInputChange = jest.fn();
  const mockSetAuthType = jest.fn();

  const renderComponent = (authType = 'Username and Password', typeValue = 'network') => {
    const formData = {
      name: 'My Credential',
      username: '',
      password: '',
      auth_token: '',
      ssh_key: '',
      become_method: '',
      become_user: '',
      become_password: ''
    };

    return render(
      <CredentialFormFields
        formData={formData}
        authType={authType}
        typeValue={typeValue}
        setAuthType={mockSetAuthType}
        handleInputChange={mockHandleInputChange}
      />
    );
  };

  it('renders the form correctly with "Username and Password" authType for network', () => {
    const { asFragment } = renderComponent('Username and Password', 'network');
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the form correctly with "SSH Key" authType for network', () => {
    const { asFragment } = renderComponent('SSH Key', 'network');
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the form correctly with "Token" authType for openshift', () => {
    const { asFragment } = renderComponent('Token', 'openshift');
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls setAuthType when selecting an authentication type from the dropdown', () => {
    const { getByText } = renderComponent('Username and Password', 'network');

    fireEvent.click(getByText('Username and Password'));
    fireEvent.click(getByText('SSH Key'));

    expect(mockSetAuthType).toHaveBeenCalledWith('SSH Key');
  });

  it('renders Become Method dropdown and selects an option', () => {
    const { getByText } = renderComponent('Username and Password', 'network');

    fireEvent.click(getByText('Select option'));
    fireEvent.click(getByText('sudo'));

    expect(mockHandleInputChange).toHaveBeenCalledWith('become_method', 'sudo');
  });
});
