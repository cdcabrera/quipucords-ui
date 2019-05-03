import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { ConnectedScanHostList, ScanHostList } from '../scanHostList';

describe('ScanHostList Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component', () => {
    const store = generateEmptyStore({
      scansAction: {
        connection: {},
        inspection: {}
      }
    });

    const props = {
      id: 1,
      filter: { lorem: 'ipsum' },
      useConnectionResults: true,
      useInspectionResults: true
    };

    const component = shallow(<ConnectedScanHostList {...props}>{() => 'lorem ipsum'}</ConnectedScanHostList>, {
      context: { store }
    });

    expect(component).toMatchSnapshot('connected');
  });

  it('should render a non-connected component', () => {
    const props = {
      id: 1,
      useConnectionResults: true,
      useInspectionResults: true,
      hostsList: [
        {
          credentialName: 'dolor',
          jobType: 'connection',
          name: 'lorem',
          sourceId: 15,
          sourceName: 'lorem source'
        },
        {
          credentialName: 'set',
          jobType: 'inspection',
          name: 'ipsum',
          sourceId: 16,
          sourceName: 'ipsum source'
        }
      ]
    };

    const component = mount(<ScanHostList {...props}>{({ host }) => JSON.stringify(host)}</ScanHostList>);

    expect(component.render()).toMatchSnapshot('non-connected');
  });
});
