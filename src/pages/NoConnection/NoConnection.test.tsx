import React from 'react'
import { screen } from '@testing-library/react'
import { NoConnection } from './NoConnection'
import { customRender } from '../../utils/testUtils/testUtils'

describe('NoConnection', () => {
  it('should render the component', () => {
    customRender(<NoConnection />)

    expect(screen.getByText('No connection')).toBeInTheDocument()
  })
})
