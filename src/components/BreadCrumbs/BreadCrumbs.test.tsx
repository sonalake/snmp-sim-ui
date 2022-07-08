import { screen } from '@testing-library/react'
import React from 'react'
import { customRender } from '../../utils/testUtils/testUtils'
import { BreadCrumbs } from './BreadCrumbs'

describe('BreadCrumbs', () => {
  it('should render the component', async () => {
    customRender(<BreadCrumbs />)

    await screen.findByText('Dashboard')
  })
})
