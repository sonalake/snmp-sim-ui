import { screen } from '@testing-library/react'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { mockDevices } from '../../utils/testUtils/mockDevices'
import { render, userEvent } from '../../utils/testUtils/testUtils'
import { baseApi } from '../../api/api'
import { mockAgents } from '../../utils/testUtils/mockAgents'
import { DeviceDetails } from './DeviceDetails'

const MOCKED_DEVICE_ID = 'device-id'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    id: MOCKED_DEVICE_ID,
  }),
}))

describe('DeviceDetails', () => {
  let baseApiMock: MockAdapter

  beforeEach(() => {
    baseApiMock = new MockAdapter(baseApi)
    baseApiMock.onGet(`api/devices/${MOCKED_DEVICE_ID}`).reply(200, mockDevices[0])
    baseApiMock.onGet('api/agents').reply(200, mockAgents)
    baseApiMock.onPut(`api/devices/${MOCKED_DEVICE_ID}/start`).reply(200, {})
    baseApiMock.onPut(`api/devices/${MOCKED_DEVICE_ID}/stop`).reply(200, {})
  })

  afterEach(() => {
    baseApiMock.restore()
  })

  it('should render the component', async () => {
    render(<DeviceDetails />)

    expect(await screen.findByText(mockDevices[0].name)).toBeInTheDocument()
  })

  it('should start and stop device', async () => {
    render(<DeviceDetails />)

    expect(await screen.findByText(mockDevices[0].name)).toBeInTheDocument()

    expect(await screen.findByText(/start/i)).toBeInTheDocument()
    expect(await screen.findByText(/stopped/i)).toBeInTheDocument()

    userEvent.click(screen.getByText(/start/i))

    expect(await screen.findByText(/running/i)).toBeInTheDocument()
    expect(await screen.findByText(/stop/i)).toBeInTheDocument()

    userEvent.click(screen.getByText(/stop/i))
    expect(await screen.findByText(/stopped/i)).toBeInTheDocument()
  })
})
