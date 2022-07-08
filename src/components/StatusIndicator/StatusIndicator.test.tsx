import { render, screen } from '@testing-library/react'
import React from 'react'
import { StatusIndicator } from './StatusIndicator'

describe('StatusIndicator', () => {
  const testId = 'status'

  it('should have the correct color and display value if active', () => {
    const isActive = true
    const activeText = 'Active'

    render(<StatusIndicator title={isActive ? activeText : ''} isActive={isActive} />)

    expect(screen.getByText(activeText)).toBeInTheDocument()
    expect(screen.getByTestId(testId)).toHaveStyle('background: green;')
  })

  it('should have the correct color and display value if inactive', () => {
    const isActive = false
    const inActiveText = 'Inactive'

    render(<StatusIndicator title={isActive ? '' : inActiveText} isActive={isActive} />)

    expect(screen.getByText(inActiveText)).toBeInTheDocument()
    expect(screen.getByTestId(testId)).toHaveStyle('background: red;')
  })
})
