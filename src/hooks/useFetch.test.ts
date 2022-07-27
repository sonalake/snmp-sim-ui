import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { useFetch } from './useFetch'

// This is needed for suppressing the error related to "@testing-library/react-hooks" using React version < 18.0.0 and using ReactDOM.render instead of createRoot.
// Once the package is update is released, this will be safe to remove.
jest.spyOn(console, 'error').mockImplementation(() => null)

describe('useFetch', () => {
  const axiosMock = new MockAdapter(axios)
  const mockUrl = 'http://mock'

  it('should set the response of a successful api call as the resource', async () => {
    const mockResponse = 'response'

    axiosMock.onGet(mockUrl).reply(200, mockResponse)

    const { result, waitForNextUpdate } = renderHook(() => useFetch(mockUrl))

    await waitForNextUpdate()

    const {
      current: { resource, isLoading, error },
    } = result

    expect(resource).toBe(mockResponse)
    expect(isLoading).toBe(false)
    expect(error).toBeNull()
  })

  it('should set an api error as the error', async () => {
    axiosMock.onGet(mockUrl).reply(500)

    const { result, waitForNextUpdate } = renderHook(() => useFetch(mockUrl))

    await waitForNextUpdate()

    const {
      current: { resource, isLoading, error },
    } = result

    expect(resource).toBeUndefined()
    expect(isLoading).toBe(false)
    expect(error).not.toBeNull()
    expect(error).toBeInstanceOf(Error)
  })
})
