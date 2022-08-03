import { screen } from '@testing-library/react'
import React from 'react'
import { customRender } from '../../utils/testUtils/testUtils'
import { ErrorBoundary } from './ErrorBoundary'

const testError = 'testError'

const ProblemChild = () => {
  throw new Error(testError)
}

describe('ErrorBoundary', () => {
  it(`should render error boundary component when there is an error`, async () => {
    // This is needed for suppressing the testError appearing as uncaught
    jest.spyOn(console, 'error').mockImplementation(() => null)

    customRender(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    )

    expect(await screen.findByText(testError)).toBeInTheDocument()
    expect(await screen.findByText('Error')).toBeInTheDocument()
    expect(await screen.findByText('Refresh')).toBeInTheDocument()
  })
})
