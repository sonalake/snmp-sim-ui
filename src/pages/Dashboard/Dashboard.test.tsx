import { screen } from '@testing-library/react'
import React from 'react'
import { customRender } from '../../utils/testUtils/testUtils'
import { Dashboard } from './Dashboard'

describe('Dashboard', () => {
  it('should render the component', () => {
    customRender(<Dashboard />)

    expect(screen.getByText('Welcome to the SNMP Simulator Web Console')).toBeInTheDocument()
  })
})
