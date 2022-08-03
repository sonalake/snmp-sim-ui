import { screen } from '@testing-library/react'
import React from 'react'
import { customRender } from '../../utils/testUtils/testUtils'
import { PageNotFound } from './PageNotFound'

describe('PageNotFound', () => {
  it('should render the component', () => {
    customRender(<PageNotFound />)

    expect(screen.getByText('404')).toBeInTheDocument()
  })
})
