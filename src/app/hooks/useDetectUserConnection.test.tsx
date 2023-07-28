import { renderHook } from '@testing-library/react-hooks';

import { useDetectUserConnection } from './useDetectUserConnection';

describe('useDetectUserConnection', () => {
  it('should set the state to true if the user is online', () => {
    const hook = renderHook(() => useDetectUserConnection());
    expect(hook.result.current.isBrowserOnline).toBe(true);
  });

  it('should set the state to false if the user is offline', () => {
    const mockNavigator = jest.spyOn(window.navigator, 'onLine', 'get').mockReturnValueOnce(false);

    const hook = renderHook(() => useDetectUserConnection());
    expect(hook.result.current.isBrowserOnline).toBe(false);

    mockNavigator.mockRestore();
  });
});
