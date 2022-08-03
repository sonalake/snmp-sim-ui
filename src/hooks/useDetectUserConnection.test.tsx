import { renderHook } from '@testing-library/react-hooks'
import { useDetectUserConnection } from './useDetectUserConnection'

// This is needed for suppressing the error related to "@testing-library/react-hooks" using React version < 18.0.0 and using ReactDOM.render instead of createRoot.
// Once the package is update is released, this will be safe to remove.
jest.spyOn(console, 'error').mockImplementation(() => null)

describe('useDetectUserConnection', () => {
  it('should set the state to true if the user is online', () => {
    const { result } = renderHook(() => useDetectUserConnection())

    const {
      current: { isUserOnline },
    } = result

    expect(isUserOnline).toBe(true)
  })

  it('should set the state to false if the user is offline', () => {
    const mockNavigator = jest.spyOn(window.navigator, 'onLine', 'get').mockReturnValueOnce(false)

    const { result } = renderHook(() => useDetectUserConnection())

    const {
      current: { isUserOnline },
    } = result

    expect(isUserOnline).toBe(false)

    mockNavigator.mockRestore()
  })
})
