import { screen } from '@testing-library/react'
import axios from 'axios'
import React from 'react'
import { mockAgents } from '../../utils/testUtils/mockAgents'
import { customRender } from '../../utils/testUtils/testUtils'
import { Agents } from './Agents'

jest.mock('axios')

axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: mockAgents }))

// @TODO: mock @tanstack/react-table
describe('Agents', () => {
  it.skip('should render the component', async () => {
    customRender(<Agents />)

    expect(await screen.findByText('Add')).toBeInTheDocument()
  })

  it.skip('should render the table rows', async () => {
    customRender(<Agents />)

    expect(await screen.findByText('Name')).toBeInTheDocument()
  })
})
