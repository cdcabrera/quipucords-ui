import sourcesReducer from '../sourcesReducer';
import { sourcesTypes as types } from '../../constants';
import helpers from '../../../common/helpers';

describe('SourcesReducer', () => {
  it('should return the initial state', () => {
    expect(sourcesReducer.initialState).toBeDefined();
  });

  it('should handle specific defined types', () => {
    const specificTypes = [types.UPDATE_SOURCES];

    specificTypes.forEach(value => {
      const dispatched = {
        type: value
      };

      const resultState = sourcesReducer(undefined, dispatched);

      expect({ type: value, result: resultState }).toMatchSnapshot(`defined type ${value}`);
    });
  });

  it('should handle all defined error types', () => {
    const specificTypes = [types.GET_SOURCES];

    specificTypes.forEach(value => {
      const dispatched = {
        type: helpers.REJECTED_ACTION(value),
        error: true,
        payload: {
          message: 'MESSAGE',
          response: {
            status: 0,
            statusText: 'ERROR TEST',
            data: {
              detail: 'ERROR'
            }
          }
        }
      };

      const resultState = sourcesReducer(undefined, dispatched);

      expect({ type: helpers.REJECTED_ACTION(value), result: resultState }).toMatchSnapshot(`rejected types ${value}`);
    });
  });

  it('should handle all defined pending types', () => {
    const specificTypes = [types.GET_SOURCES];

    specificTypes.forEach(value => {
      const dispatched = {
        type: helpers.PENDING_ACTION(value)
      };

      const resultState = sourcesReducer(undefined, dispatched);

      expect({ type: helpers.PENDING_ACTION(value), result: resultState }).toMatchSnapshot(`pending types ${value}`);
    });
  });

  it('should handle all defined fulfilled types', () => {
    const specificTypes = [types.GET_SOURCES];

    specificTypes.forEach(value => {
      const dispatched = {
        type: helpers.FULFILLED_ACTION(value),
        payload: {
          data: {
            test: 'success'
          }
        }
      };

      const resultState = sourcesReducer(undefined, dispatched);

      expect({ type: helpers.FULFILLED_ACTION(value), result: resultState }).toMatchSnapshot(
        `fulfilled types ${value}`
      );
    });
  });
});
