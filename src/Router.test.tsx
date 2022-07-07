import React from 'react'
import { render, screen } from '@testing-library/react'
import { Router } from './Router'

describe('Router', () => {
  it('should render the component', () => {
    render(<Router />)

    expect(screen.getByText('Welcome to the SNMP Simulator Web Console')).toBeInTheDocument()
  })
})
