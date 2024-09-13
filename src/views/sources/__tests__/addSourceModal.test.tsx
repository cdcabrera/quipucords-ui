import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { shallowComponent } from '../../../../config/jest.setupTests';
import { AddSourceModal } from '../addSourceModal';
import axios from 'axios';

describe('AddSourceModal', () => {
  let mockOnClose;
  let mockOnSubmit;

  //count?: number;
  //   next?: string | null;
  //   previous?: string | null;
  //   results?: CredentialType[];

  beforeEach(async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({}));

    await act(async () => {
      mockOnClose = jest.fn();
      mockOnSubmit = jest.fn();
      const mockUseCredentialsApi = () => ({
        callbackSuccess: () => jest.fn(),
        callbackError: () => jest.fn(),
        apiCall: () => Promise.resolve({}),
        getCredentials: () => Promise.resolve({ data: { results: [] } })
      });
      await render(
        <AddSourceModal
          isOpen={true}
          sourceType="network"
          source={undefined}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          // useGetCredentials={mockUseCredentialsApi}
        />
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a basic component', async () => {
    const component = await shallowComponent(<AddSourceModal isOpen={true} />);
    expect(component).toMatchSnapshot('basic');
  });

  it('should have the correct title', () => {
    const title = screen.getByText(/Add\sSource:\snetwork/i);
    expect(title).toMatchSnapshot('title');
  });

  it('should call onSubmit with the correct filtered data when "Save" is clicked', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Enter a name for the source'), 'Test Source');
    await user.click(screen.getByText('Save'));

    expect(mockOnSubmit.mock.calls).toMatchSnapshot('onSubmit, filtered data');
  });

  it('should call onClose', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
