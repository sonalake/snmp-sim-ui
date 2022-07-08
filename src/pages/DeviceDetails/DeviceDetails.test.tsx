import { screen } from '@testing-library/react'
import axios from 'axios'
import React from 'react'
import { mockDevices } from '../../utils/testUtils/mocks/mockDevices'
import { customRender } from '../../utils/testUtils/testUtils'
import { DeviceDetails } from './DeviceDetails'

jest.mock('axios')

axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: mockDevices[0] }))

describe('DeviceDetails', () => {
  it('should render the component', async () => {
    customRender(<DeviceDetails />)

    expect(await screen.findByText(`Device Details - ${mockDevices[0].name}`)).toBeInTheDocument()
  })
})
