import { screen } from '@testing-library/react'
import axios from 'axios'
import React from 'react'
import { mockDevices } from '../../utils/testUtils/mockDevices'
import { customRender } from '../../utils/testUtils/testUtils'
import { AgentDetails } from './AgentDetails'

jest.mock('axios')

axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: mockDevices[0] }))

describe('AgentDetails', () => {
  it('should render the component', async () => {
    customRender(<AgentDetails />)

    expect(await screen.findByText(`${mockDevices[0].name} - details - WIP`)).toBeInTheDocument()
  })
})
