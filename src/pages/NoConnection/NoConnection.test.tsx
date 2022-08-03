import { screen } from '@testing-library/react'
import React from 'react'
import { customRender } from '../../utils/testUtils/testUtils'
import { NoConnection } from './NoConnection'

describe('NoConnection', () => {
  it('should render the component', () => {
    customRender(<NoConnection />)

    expect(screen.getByText('No connection')).toBeInTheDocument()
  })
})
