import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { ConnectedScans, Scans } from '../scans';
import { apiTypes } from '../../../constants/apiConstants';

describe('Sources Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component with default props', () => {
    const store = generateEmptyStore({ scans: { view: {} }, viewOptions: {} });
    const component = shallow(<ConnectedScans />, { context: { store } });

    expect(component).toMatchSnapshot('connected');
  });

  it('should render a non-connected component', () => {
    const props = {
      fulfilled: true,
      scans: [
        {
          [apiTypes.API_RESPONSE_SCAN_ID]: 1
        }
      ],
      viewOptions: {
        selectedItems: []
      }
    };

    const component = shallow(<Scans {...props} />);

    expect(component).toMatchSnapshot('non-connected');
  });

  it('should render a non-connected component error', () => {
    const props = {
      error: true
    };

    const component = shallow(<Scans {...props} />);

    expect(component).toMatchSnapshot('error');
  });

  it('should render a non-connected component pending', () => {
    const props = {
      pending: true
    };

    const component = shallow(<Scans {...props} />);

    expect(component).toMatchSnapshot('pending');
  });

  it('should render a non-connected component with empty state', () => {
    const props = {};

    const component = mount(<Scans {...props} />);

    expect(component.find('button').length).toEqual(1);
    expect(component.render()).toMatchSnapshot('empty state');
  });
});
