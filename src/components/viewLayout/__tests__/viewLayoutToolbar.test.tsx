import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { AppToolbar as ViewToolbar } from '../viewLayoutToolbar';

describe('ViewToolbar', () => {
  it('should render a basic component', () => {
    const props = {};
    const { asFragment } = render(<ViewToolbar {...props} />);
    expect(asFragment()).toMatchSnapshot('basic');
  });

  it('should attempt to load and display a username', async () => {
    const mockGetUser = jest.fn().mockResolvedValue('Dolor sit');
    const props = {
      useUser: jest.fn().mockReturnValue({ getUser: mockGetUser })
    };

    await act(() => render(<ViewToolbar {...props} />));
    expect(mockGetUser).toHaveBeenCalledTimes(1);
    // expect(screen.getByDisplayValue('Dolor sit')).toMatchSnapshot('user');
  });
});
