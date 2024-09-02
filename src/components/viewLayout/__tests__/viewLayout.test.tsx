import React from 'react';
import { render } from '@testing-library/react';
import { AppLayout as ViewLayout } from '../viewLayout';

describe('ViewLayout', () => {
  it('should render a basic component', () => {
    const props = {
      children: 'Lorem ipsum'
    };
    const { asFragment } = render(<ViewLayout {...props} />);
    expect(asFragment()).toMatchSnapshot('basic');
  });
});
