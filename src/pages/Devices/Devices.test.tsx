import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { mockDevices } from '../../utils/testUtils/mockDevices'
import { render, screen, userEvent, waitFor } from '../../utils/testUtils/testUtils'
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

  it('should show left panel', async () => {
    render(<Devices />)
    expect(await screen.findByText('Devices')).toBeInTheDocument()
    expect(await screen.findByText('OS Windows Server')).toBeInTheDocument()
    expect(await screen.findByText('Dell 5448')).toBeInTheDocument()
    expect(await screen.findAllByText('1 device')).toHaveLength(2)

    userEvent.click(screen.getByText('OS Windows Server'))
    await waitFor(() => {
      expect(baseApiMock.history.get).toHaveLength(4)
    })

    await waitFor(() => {
      expect(baseApiMock.history.get[3].params).toEqual({
        page: 1,
        page_size: 10,
        types: ['OS Windows Server'],
      })
    })
  })
})
