import React from 'react';
import { shallowComponent } from '../../../../config/jest.setupTests';
import { AppToolbar as ViewToolbar } from '../viewLayoutToolbar';

describe('ViewToolbar', () => {
  it('should render a basic component', async () => {
    const props = {};
    const component = await shallowComponent(<ViewToolbar {...props} />);
    expect(component).toMatchSnapshot('basic');
  });
});
