import { reduxHelpers } from '../reduxHelpers';
import { helpers } from '../helpers';

describe('ReduxHelpers', () => {
  it('should have specific functions', () => {
    expect(reduxHelpers).toMatchSnapshot('reduxHelpers');
  });

  it('should generate a standard reducer from promise actions', () => {
    const state = {
      lorem: {},
      ipsum: {}
    };

    const action = {
      meta: {
        id: 'lorem-id'
      },
      payload: {
        data: {
          test: 'test'
        }
      }
    };

    expect(
      reduxHelpers.generatedPromiseActionReducer(
        [{ ref: 'lorem', type: 'LOREM' }, { ref: 'ipsum', type: 'IPSUM' }],
        state,
        { ...action, type: helpers.FULFILLED_ACTION('LOREM') }
      )
    ).toMatchSnapshot('generatedPromiseActionReducer fulfilled');

    expect(
      reduxHelpers.generatedPromiseActionReducer(
        [{ ref: 'lorem', type: 'LOREM' }, { ref: 'ipsum', type: 'IPSUM' }],
        state,
        { ...action, type: helpers.REJECTED_ACTION('LOREM') }
      )
    ).toMatchSnapshot('generatedPromiseActionReducer rejected');

    expect(
      reduxHelpers.generatedPromiseActionReducer(
        [{ ref: 'lorem', type: 'LOREM' }, { ref: 'ipsum', type: 'IPSUM' }],
        state,
        { ...action, type: helpers.PENDING_ACTION('LOREM') }
      )
    ).toMatchSnapshot('generatedPromiseActionReducer rejected');
  });
});
