import { context, useGetSources, useOnDelete, usePoll } from '../sourcesContext';
import { apiTypes } from '../../../constants/apiConstants';
import { reduxTypes } from '../../../redux';

describe('SourcesContext', () => {
  it('should return specific properties', () => {
    expect(context).toMatchSnapshot('specific properties');
  });

  it('should handle deleting a source with a confirmation', async () => {
    const mockConfirmation = jest.fn();
    const mockSource = {
      [apiTypes.API_RESPONSE_SOURCE_NAME]: 'lorem ipsum name',
      [apiTypes.API_RESPONSE_SOURCE_ID]: 'dolor sit id'
    };

    const { result } = await shallowHook(() =>
      useOnDelete({
        useConfirmation: () => mockConfirmation
      })
    );

    result(mockSource);

    expect(mockConfirmation.mock.calls).toMatchSnapshot('dispatch onDelete');
    mockConfirmation.mockClear();
  });

  it('should attempt to poll sources', async () => {
    const mockUseTimeout = jest.fn();
    const options = {
      pollInterval: 0,
      useSelector: () => [{ connection: { status: 'pending' } }],
      useTimeout: (callback, interval) => {
        mockUseTimeout({
          callback: callback(),
          interval
        });
        return {};
      }
    };

    await shallowHook(() => usePoll(options));
    await shallowHook(() =>
      usePoll({
        ...options,
        useSelector: () => []
      })
    );

    expect(mockUseTimeout.mock.calls).toMatchSnapshot('timeout');
  });

  it('should apply a hook for retrieving data from multiple selectors', () => {
    const { result: errorResponse } = shallowHook(() =>
      useGetSources({
        useSelectorsResponse: () => ({ error: true, message: 'Lorem ipsum' })
      })
    );

    const { result: pendingResponse } = shallowHook(() =>
      useGetSources({
        useSelectorsResponse: () => ({ pending: true })
      })
    );

    const { result: fulfilledResponse } = shallowHook(() =>
      useGetSources({
        useSelectorsResponse: () => ({ fulfilled: true, data: { view: { results: ['dolor', 'sit'] } } })
      })
    );

    const { result: mockStoreSuccessResponse } = shallowHook(() => useGetSources(), {
      state: {
        viewOptions: {
          [reduxTypes.view.SOURCES_VIEW]: {}
        },
        sources: {
          expanded: {},
          selected: {},
          view: {
            fulfilled: true,
            data: {
              results: ['lorem', 'ipsum']
            }
          }
        }
      }
    });

    expect({ errorResponse, fulfilledResponse, pendingResponse, mockStoreSuccessResponse }).toMatchSnapshot(
      'responses'
    );
  });
});