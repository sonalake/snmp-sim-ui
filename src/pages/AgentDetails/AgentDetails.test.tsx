import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { mockAgents } from '../../utils/testUtils/mockAgents'
import { render, screen } from '../../utils/testUtils/testUtils'
import { baseApi } from '../../api/api'
import { AgentDetails } from './AgentDetails'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    id: 'agent-id',
  }),
}))

describe('AgentDetails', () => {
  let baseApiMock: MockAdapter

  beforeEach(() => {
    baseApiMock = new MockAdapter(baseApi)
    baseApiMock.onGet('api/agents/agent-id').reply(200, mockAgents[0])
  })

  afterEach(() => {
    baseApiMock.restore()
  })

  it('should render the component', async () => {
    render(<AgentDetails />)

    expect(await screen.findByText(mockAgents[0].name)).toBeInTheDocument()
  })
})
