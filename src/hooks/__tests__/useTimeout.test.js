import { useTimeout } from '../useTimeout';

describe('useTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should apply a hook for useTimeout', async () => {
    const mockCallback = jest.fn();
    const mockSetTimeout = jest.spyOn(global, 'setTimeout');
    const mockClearTimeout = jest.spyOn(global, 'clearTimeout');
    const { result, unmount } = await renderHook(() => useTimeout(mockCallback));

    unmount();

    expect(mockClearTimeout).toHaveBeenCalledTimes(1);
    expect(mockSetTimeout).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(result).toMatchSnapshot('timeout');
  });
});
