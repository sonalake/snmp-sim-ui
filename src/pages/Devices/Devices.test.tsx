import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { Devices } from './Devices'
import { mockDevices } from '../../utils/testUtils/mocks/mockDevices'
import { customRender } from '../../utils/testUtils/testUtils'
import axios from 'axios'

jest.mock('axios')

axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: mockDevices }))

beforeEach(async () => await waitFor(() => customRender(<Devices />)))

describe('Devices', () => {
  it('should render the component', async () => {
    await waitFor(() => expect(screen.getByText('Refresh')).toBeInTheDocument())
  })

  it('should render the table rows', async () => {
    await waitFor(() => expect(screen.getByText('Port')).toBeInTheDocument())
  })
})
