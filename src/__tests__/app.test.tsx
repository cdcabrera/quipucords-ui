import React from 'react';
import { shallowComponent } from '../../config/jest.setupTests';
import { App } from '../app';

describe('App', () => {
  it('should render a basic component', async () => {
    const props = {};
    const component = await shallowComponent(<App {...props} />);
    expect(component).toMatchSnapshot('basic');
  });
});
