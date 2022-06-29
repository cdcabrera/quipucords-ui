import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { ConnectedConfirmationModal, ConfirmationModal } from '../confirmationModal';

describe('Confirmation Modal Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component', () => {
    const store = generateEmptyStore({
      confirmationModal: {
        show: true,
        title: 'Confirm',
        heading: 'test',
        icon: null,
        body: 'Test body',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      }
    });
    const component = shallow(
      <Provider store={store}>
        <ConnectedConfirmationModal />
      </Provider>
    );

    expect(component.find(ConnectedConfirmationModal)).toMatchSnapshot('connected');
  });

  it('should display a confirmation modal', async () => {
    const onCancel = jest.fn();
    const props = {
      show: true,
      title: 'Confirm',
      heading: 'test',
      icon: undefined,
      body: 'Test body',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel
    };

    const component = await mountHookComponent(<ConfirmationModal {...props} />);
    expect(component.render()).toMatchSnapshot('show');

    component.find('button[className="pf-c-button pf-m-secondary"]').simulate('click');
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should NOT display a confirmation modal', async () => {
    const props = {
      show: false
    };

    const component = await mountHookComponent(<ConfirmationModal {...props} />);
    expect(component.render()).toMatchSnapshot('hidden');
  });
});
