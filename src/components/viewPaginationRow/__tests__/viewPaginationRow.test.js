import React from 'react';
import { ViewPaginationRow } from '../viewPaginationRow';
import { API_QUERY_TYPES } from '../../../constants/apiConstants';

describe('ViewPaginationRow Component', () => {
  it('should render a basic component', async () => {
    const props = {
      totalResults: 200,
      useView: () => ({ query: { [API_QUERY_TYPES.PAGE]: 1, [API_QUERY_TYPES.PAGE_SIZE]: 10 }, viewId: 'lorem ipsum' })
    };

    const component = await shallowHookComponent(<ViewPaginationRow {...props} />);
    expect(component.render()).toMatchSnapshot('basic');
  });
});
