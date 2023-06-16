import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { fireEvent, render } from '@testing-library/react'
import { agentsMockedResponse } from '../../utils/testUtils/mockAgents'
import { render as customRender, screen, waitFor } from '../../utils/testUtils/testUtils'
import { baseApi } from '../../api/api'
import { App } from '../../App'
import { devicesMockedResponse } from '../../utils/testUtils/mockDevices'
import { Agents } from './Agents'

describe('Agents', () => {
  let baseApiMock: MockAdapter

  beforeEach(() => {
    baseApiMock = new MockAdapter(baseApi)
    baseApiMock.onGet('api/agents').reply(200, agentsMockedResponse)
    baseApiMock.onGet('api/devices').reply(200, devicesMockedResponse)
  })

  afterEach(() => {
    baseApiMock.restore()
  })

  it('should render the component', async () => {
    customRender(<Agents />)

    expect(await screen.findByText('Add')).toBeInTheDocument()
  })

  it('should render the table rows', async () => {
    customRender(<Agents />)

    expect(await screen.findByText('No data to display')).toBeInTheDocument()
  })

  it('should automatically navigate to Agents after opening the app', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getAllByText(/agents/i)).toHaveLength(2)
    })
  })

  it('should navigate to devices on side nav panel clicking', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getAllByText(/agents/i)).toHaveLength(2)
    })
    fireEvent.click(screen.getByText('Devices'))

    await waitFor(() => {
      expect(screen.getAllByText(/devices/i)).toHaveLength(2)
    })
  })
})
