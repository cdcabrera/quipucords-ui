import React from 'react';
import { render } from '@testing-library/react';
// import { shallowComponent } from '../../config/jest.setupTests';
import { App } from '../app';

describe('App', () => {
  it('should render a basic component', async () => {
    const props = {};
    const { asFragment } = render(<App {...props} />);
    expect(asFragment()).toMatchSnapshot('basic');
  });
});
