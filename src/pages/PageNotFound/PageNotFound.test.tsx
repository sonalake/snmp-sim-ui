import React from 'react'
import { screen } from '@testing-library/react'
import { PageNotFound } from './PageNotFound'
import { customRender } from '../../utils/testUtils/testUtils'

describe('PageNotFound', () => {
  it('should render the component', () => {
    customRender(<PageNotFound />)

    expect(screen.getByText('404')).toBeInTheDocument()
  })
})
