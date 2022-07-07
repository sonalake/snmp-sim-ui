import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { DeviceDetails } from './DeviceDetails'
import { mockDevices } from '../../utils/testUtils/mocks/mockDevices'
import axios from 'axios'
import { customRender } from '../../utils/testUtils/testUtils'

jest.mock('axios')

axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: mockDevices[0] }))

beforeEach(async () => await waitFor(() => customRender(<DeviceDetails />)))

describe('DeviceDetails', () => {
  it('should render the component', async () => {
    await waitFor(() => expect(screen.getByText(`Device Details - ${mockDevices[0].name}`)).toBeInTheDocument())
  })
})
