import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { shallowComponent } from '../../../../config/jest.setupTests';
import { Login } from '../login';

// est.mock('@patternfly/react-core', () => ({
//  ...jest.requireActual('@patternfly/react-core'),
//  LoginForm: (...args) => <div>{Object.entries(args)}</div>
// }));

describe('Login', () => {
  it('should render a basic component', async () => {
    const props = {
      children: 'Lorem ipsum'
    };
    // const component = await shallowComponent(<Login {...props} />);
    // expect(component).toMatchSnapshot('basic');
    const { container } = render(<Login {...props} />);
    expect(container).toMatchSnapshot('basic');
  });

  it('should render authorized children', async () => {
    /*
    const props = {
      children: 'Lorem ipsum',
      useGetSetAuth: jest.fn().mockReturnValue({ isAuthorized: true })
    };
    const component = await shallowComponent(<Login {...props} />);
    expect(component).toMatchSnapshot('logged in');
    */
    const props = {
      children: 'Lorem ipsum',
      // useLogin: jest.fn().mockReturnValue({ isLoggedIn: true })
      useGetSetAuth: jest.fn().mockReturnValue({ isAuthorized: true })
    };

    const { container } = render(<Login {...props} />);
    expect(container).toMatchSnapshot('logged in');
  });

  it('should attempt to use the login service', async () => {
    const mockLogin = jest.fn().mockResolvedValue('success');
    const mockUseLoginApi = jest.fn().mockReturnValue({ login: mockLogin });
    const props = {
      children: 'Lorem ipsum',
      useLogin: mockUseLoginApi
    };
    // const props = {
    //  children: 'Lorem ipsum',
    //  useLogin: jest.fn().mockReturnValue({ login: mockLogin })
    // };

    render(<Login {...props} />);
    // await shallowComponent(<Login useLogin={mockUseLogin}>lorem ipsum</Login>);
    // const { asFragment } = render(<Login useLogin={mockUseLogin}>lorem ipsum</Login>);submit
    // const button = screen.getByText('Log in');
    const user = userEvent.setup();
    //
    // user.type(screen.getByRole('input', { name: 'pf-login-username-id' }), 'lorem');
    await user.type(screen.getByLabelText(/username/i), 'lorem');
    await user.type(screen.getByLabelText(/password/i), 'ipsum');
    await user.click(screen.getByRole('button'));
    // screen.debug();
    // fireEvent.click(button);
    // screen.debug();
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin.mock.calls).toMatchSnapshot('submit');
    // const out = await component.getProps();
    // expect(out).toMatchSnapshot('test');
  });
});
