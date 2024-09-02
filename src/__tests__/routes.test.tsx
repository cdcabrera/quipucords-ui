import React from 'react';
import { render } from '@testing-library/react';
// import { shallowComponent } from '../../config/jest.setupTests';
import { AppRoutes as Routes } from '../routes';

describe('Routes', () => {
  it('should render a basic component', async () => {
    const props = {};
    const { asFragment } = render(<Routes {...props} />);
    expect(asFragment()).toMatchSnapshot('basic');
  });
});
