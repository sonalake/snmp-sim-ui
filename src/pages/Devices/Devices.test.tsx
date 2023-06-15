import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { mockDevices } from '../../utils/testUtils/mockDevices'
import { render, screen } from '../../utils/testUtils/testUtils'
import { baseApi } from '../../api/api'
import { mockAgents } from '../../utils/testUtils/mockAgents'
import { Devices } from './Devices'

describe('Devices', () => {
  let baseApiMock: MockAdapter

  beforeEach(() => {
    baseApiMock = new MockAdapter(baseApi)
    baseApiMock.onGet('api/agents').reply(200, mockAgents)
    baseApiMock.onGet('api/devices').reply(200, mockDevices)
  })

  afterEach(() => {
    baseApiMock.restore()
  })

  it('should render the component', async () => {
    render(<Devices />)

    expect(await screen.findByText('Add')).toBeInTheDocument()
  })

  it('should render the table rows', async () => {
    render(<Devices />)
    expect(await screen.findByText('No data to display')).toBeInTheDocument()
  })
})
