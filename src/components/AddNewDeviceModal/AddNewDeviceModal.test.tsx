import { render, screen } from '@testing-library/react'
import React from 'react'
import { AddNewDeviceModal } from './AddNewDeviceModal'

describe('AddNewDeviceModal', () => {
  it('should render the component', () => {
    const setIsVisible = jest.fn()

    render(<AddNewDeviceModal isVisible onClose={setIsVisible} />)

    expect(screen.getByText('Add New Device')).toBeInTheDocument()
  })
})
