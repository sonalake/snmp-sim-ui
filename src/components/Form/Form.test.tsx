import React from 'react'
import { render, screen } from '../../utils/testUtils/testUtils'
import { Form } from './Form'
import { agentFormFields, agentInitialValues } from './formFields'

describe('Form', () => {
  it('should render the component', () => {
    const onSubmit = jest.fn()

    render(<Form formFields={agentFormFields} initialValues={agentInitialValues} onSubmit={onSubmit} />)

    expect(screen.getByText(agentFormFields.name.label)).toBeInTheDocument()
  })
})
