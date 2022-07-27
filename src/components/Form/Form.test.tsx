import { screen } from '@testing-library/react'
import React from 'react'
import { customRender } from '../../utils/testUtils/testUtils'
import { Form } from './Form'
import { agentFormFields, agentInitialValues } from './formFields'

describe('Form', () => {
  it('should render the component', () => {
    const onSubmit = jest.fn()

    customRender(<Form formFields={agentFormFields} initialValues={agentInitialValues} onSubmit={onSubmit} />)

    expect(screen.getByText(agentFormFields.name.label)).toBeInTheDocument()
  })
})
