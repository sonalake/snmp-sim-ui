import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { BreadCrumbs } from './BreadCrumbs'
import { customRender } from '../../utils/testUtils/testUtils'

describe('BreadCrumbs', () => {
  it('should render the component', async () => {
    await waitFor(() => customRender(<BreadCrumbs />))

    await waitFor(() => expect(screen.getByText('Dashboard')).toBeInTheDocument())
  })
})
