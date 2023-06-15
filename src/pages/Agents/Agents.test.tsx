import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { mockAgents } from '../../utils/testUtils/mockAgents'
import { render, screen } from '../../utils/testUtils/testUtils'
import { baseApi } from '../../api/api'
import { Agents } from './Agents'

describe('Agents', () => {
  let baseApiMock: MockAdapter

  beforeEach(() => {
    baseApiMock = new MockAdapter(baseApi)
    baseApiMock.onGet('api/agents').reply(200, mockAgents)
  })

  afterEach(() => {
    baseApiMock.restore()
  })

  it('should render the component', async () => {
    render(<Agents />)

    expect(await screen.findByText('Add')).toBeInTheDocument()
  })

  it('should render the table rows', async () => {
    render(<Agents />)

    expect(await screen.findByText('No data to display')).toBeInTheDocument()
  })
})
