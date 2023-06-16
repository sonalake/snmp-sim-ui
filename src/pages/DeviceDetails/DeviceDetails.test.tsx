import { screen } from '@testing-library/react'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { mockDevices } from '../../utils/testUtils/mockDevices'
import { render } from '../../utils/testUtils/testUtils'
import { baseApi } from '../../api/api'
import { mockAgents } from '../../utils/testUtils/mockAgents'
import { DeviceDetails } from './DeviceDetails'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    id: 'device-id',
  }),
}))

describe('DeviceDetails', () => {
  let baseApiMock: MockAdapter

  beforeEach(() => {
    baseApiMock = new MockAdapter(baseApi)
    baseApiMock.onGet('api/devices/device-id').reply(200, mockDevices[0])
    baseApiMock.onGet('api/agents').reply(200, mockAgents)
  })

  afterEach(() => {
    baseApiMock.restore()
  })

  it('should render the component', async () => {
    render(<DeviceDetails />)

    expect(await screen.findByText(mockDevices[0].name)).toBeInTheDocument()
  })
})
