import React from 'react'
import { screen } from '@testing-library/react'
import { ErrorBoundary } from './ErrorBoundary'
import { customRender } from '../../utils/testUtils/testUtils'

describe('ErrorBoundary', () => {
  it(`should render error boundary component when there is an error`, () => {
    // This is needed for suppressing the testError appearing as uncaught
    const mock = jest.spyOn(console, 'error').mockImplementation(() => {})

    const testError = 'testError'

    const ProblemChild = () => {
      throw new Error(testError)
    }

    customRender(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    )

    expect(screen.getByText(testError)).toBeInTheDocument()

    mock.mockRestore()
  })
})
