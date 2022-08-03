import { screen } from '@testing-library/react'
import axios from 'axios'
import React from 'react'
import { mockAgents } from '../../utils/testUtils/mockAgents'
import { customRender } from '../../utils/testUtils/testUtils'
import { Agents } from './Agents'

jest.mock('axios')

axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: mockAgents }))

describe('Agents', () => {
  it('should render the component', async () => {
    customRender(<Agents />)

    expect(await screen.findByText('Add')).toBeInTheDocument()
  })

  it('should render the table rows', async () => {
    customRender(<Agents />)

    expect(await screen.findByText('No data to display')).toBeInTheDocument()
  })
})
