import { Label, TextInput as FlowbiteTextInput } from 'flowbite-react'
import { FormikErrors, FormikHandlers, FormikTouched } from 'formik'
import React, { FC } from 'react'
import { FormField } from '../../models'

export const TextInput: FC<{
  formItem: FormField
  value: string
  touched: FormikTouched<Record<keyof FormField, string>>
  errors: FormikErrors<Record<keyof FormField, string>>
  handleChange: FormikHandlers['handleChange']
  handleBlur: FormikHandlers['handleBlur']
}> = ({ formItem: { name, label, required, validation }, value, errors, touched, handleChange, handleBlur }) => (
  <div className="my-1">
    <div className="mb-2 block">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-600">*</span>}
      </Label>
    </div>

    <FlowbiteTextInput
      type="text"
      name={name}
      value={value}
      placeholder={label}
      onChange={handleChange}
      onBlur={handleBlur}
      required={required}
      helperText={
        <span style={{ visibility: errors[name] && touched[name] ? 'visible' : 'hidden' }} className="text-red-600">
          {validation}
        </span>
      }
    />
  </div>
)
