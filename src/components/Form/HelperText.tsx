import { FormikErrors, FormikTouched } from 'formik'
import React, { FC } from 'react'
import { FormField } from '../../models'

interface HelperTextProps {
  errors: FormikErrors<Record<keyof FormField, string>>
  touched: FormikTouched<Record<keyof FormField, string>>
  name: string
  validation: string
}
export const HelperText: FC<HelperTextProps> = ({ errors, touched, name, validation }) => {
  return (
    <span style={{ visibility: errors[name] && touched[name] ? 'visible' : 'hidden' }} className="text-red-600">
      {validation}
    </span>
  )
}
