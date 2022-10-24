import React from 'react';
import { context, useOnSubmitCredential, useOnUpdateCredential } from '../createCredentialDialogContext';

describe('CredentialsContext', () => {
  it('should return specific properties', () => {
    expect(context).toMatchSnapshot('specific properties');
  });

  it('should attempt to handle submitting a credential with a toast confirmation', async () => {
    const mockCredential = {
      mockId: 'lorem ipsum base id',
      mockName: 'lorem ipsum name'
    };
    const mockUseState = jest.spyOn(React, 'useState').mockImplementation(() => [mockCredential, jest.fn()]);
    const mockDispatch = jest.fn();
    const { result } = await mountHook(() =>
      useOnSubmitCredential({
        useDispatch: () => mockDispatch,
        useCredential: () => ({ fulfilled: true })
      })
    );

    result(mockCredential);

    expect(mockDispatch.mock.calls).toMatchSnapshot('dispatch onSubmit');
    mockDispatch.mockClear();
    mockUseState.mockClear();
  });

  it('should handle credential actions for onEdit, onHide, onAdd', async () => {
    const mockDispatch = jest.fn();
    const { result } = await shallowHook(() =>
      useOnUpdateCredential({
        useDispatch: () => mockDispatch
      })
    );

    result.onEdit({
      mockId: 'lorem ipsum base id',
      mockName: 'lorem ipsum name'
    });
    result.onHide();
    result.onAdd('lorem ipsum mock credential type');

    expect(mockDispatch.mock.calls).toMatchSnapshot('dispatch onEdit');
    mockDispatch.mockClear();
  });
});
