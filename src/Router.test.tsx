import { render, screen } from '@testing-library/react'
import React from 'react'
import { App } from './App'

describe('Router', () => {
  it('should render the component', () => {
    render(<App />)

    expect(screen.getByText('Agents')).toBeInTheDocument()
  })
})
