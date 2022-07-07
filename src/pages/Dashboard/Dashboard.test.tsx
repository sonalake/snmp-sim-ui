import React from 'react'
import { screen } from '@testing-library/react'
import { Dashboard } from './Dashboard'
import { customRender } from '../../utils/testUtils/testUtils'

describe('Dashboard', () => {
  it('should render the component', () => {
    customRender(<Dashboard />)

    expect(screen.getByText('Welcome to the SNMP Simulator Web Console')).toBeInTheDocument()
  })
})
