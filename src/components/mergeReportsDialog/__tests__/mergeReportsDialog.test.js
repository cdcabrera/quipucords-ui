import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { ConnectedMergeReportsDialog, MergeReportsDialog } from '../mergeReportsDialog';

describe('ToastNotificationsList Component', () => {
  // const generateEmptyStore = () => configureMockStore()({ scans: {} });
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component', () => {
    const store = generateEmptyStore({
      scans: {
        mergeDialog: {
          details: false,
          show: true,
          scans: [
            { id: 1, mostRecentStatus: 'completed', mostRecentReportId: 2, name: 'lorem' },
            { id: 2, mostRecentStatus: 'pending', mostRecentReportId: 2, name: 'ipsum' }
          ]
        }
      }
    });

    const props = {};
    const component = shallow(<ConnectedMergeReportsDialog {...props} />, { context: { store } });

    expect(component).toMatchSnapshot('connected');
  });

  it('should render a non-connected component, failure and success', () => {
    const props = {
      details: true,
      show: true,
      scans: [
        { id: 1, mostRecentStatus: 'completed', mostRecentReportId: 2, name: 'lorem' },
        { id: 2, mostRecentStatus: 'pending', mostRecentReportId: 2, name: 'ipsum' }
      ]
    };

    const component = mount(<MergeReportsDialog {...props} />);
    expect(component.render()).toMatchSnapshot('non-connected');
  });
});
