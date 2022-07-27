import { screen } from '@testing-library/react'
import axios from 'axios'
import React from 'react'
import { mockAgents } from '../../utils/testUtils/mockAgents'
import { customRender } from '../../utils/testUtils/testUtils'
import { AgentDetails } from './AgentDetails'

jest.mock('axios')

axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: mockAgents[0] }))

describe('AgentDetails', () => {
  it('should render the component', async () => {
    customRender(<AgentDetails />)

    expect(await screen.findByText(mockAgents[0].name)).toBeInTheDocument()
  })
})
