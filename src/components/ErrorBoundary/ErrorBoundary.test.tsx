import React from 'react'
import { render, screen } from '../../utils/testUtils/testUtils'
import { ErrorBoundary } from './ErrorBoundary'

const testError = 'testError'

const ProblemChild = () => {
  throw new Error(testError)
}

describe('ErrorBoundary', () => {
  it(`should render error boundary component when there is an error`, async () => {
    // This is needed for suppressing the testError appearing as uncaught
    jest.spyOn(console, 'error').mockImplementation(() => null)

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    )

    expect(await screen.findByText(testError)).toBeInTheDocument()
    expect(await screen.findByText('Error')).toBeInTheDocument()
    expect(await screen.findByText('Refresh')).toBeInTheDocument()
  })
})
