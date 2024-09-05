import React from 'react';
import { shallowComponent } from '../../../../config/jest.setupTests';
import { RefreshTimeButton } from '../refreshTimeButton';

describe('RefreshTimeButton', () => {
  it('should render a basic component', async () => {
    const props = {};
    const component = await shallowComponent(<RefreshTimeButton {...props} />);
    expect(component).toMatchSnapshot('basic');
  });
});
