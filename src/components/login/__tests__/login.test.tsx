import React from 'react';
import { shallowComponent } from '../../../../config/jest.setupTests';
import { Login } from '../login';

describe('Login', () => {
  it('should render a basic component', async () => {
    const props = {
      children: 'Lorem ipsum'
    };
    const component = await shallowComponent(<Login {...props} />);
    expect(component).toMatchSnapshot('basic');
  });

  it('should render authorized children', async () => {
    const props = {
      children: 'Lorem ipsum',
      useGetSetAuth: () => ({ isAuthorized: true })
    };
    const component = await shallowComponent(<Login {...props} />);
    expect(component).toMatchSnapshot('authorized');
  });
});
