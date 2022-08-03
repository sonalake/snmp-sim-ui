import { screen } from '@testing-library/react'
import React from 'react'
import { customRender } from '../../../utils/testUtils/testUtils'
import { DataTableCheckbox } from './DataTableCheckbox'

describe('DataTableCheckbox', () => {
  it(`should render the component`, async () => {
    customRender(<DataTableCheckbox data-testid="test" />)

    expect(screen.getByTestId('test')).toBeInTheDocument()
  })
})
