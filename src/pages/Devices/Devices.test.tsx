import { screen } from '@testing-library/react'
import axios from 'axios'
import React from 'react'
import { mockDevices } from '../../utils/testUtils/mockDevices'
import { customRender } from '../../utils/testUtils/testUtils'
import { Devices } from './Devices'

jest.mock('axios')

axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: mockDevices }))

describe('Devices', () => {
  it('should render the component', async () => {
    customRender(<Devices />)

    expect(await screen.findByText('Add')).toBeInTheDocument()
  })

  it('should render the table rows', async () => {
    customRender(<Devices />)

    expect(await screen.findByText('No data to display')).toBeInTheDocument()
  })
})
