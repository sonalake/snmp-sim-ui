import { Button } from 'flowbite-react'
import { Formik, FormikValues } from 'formik'
import React, { FC, useMemo } from 'react'
import { FormField } from '../../models'
import { TextInput } from './TextInput'

export const Form: FC<{
  formFields: Record<string, FormField>
  onSubmit: (values: FormikValues) => void
}> = ({ formFields, onSubmit }) => {
  const initialValues = useMemo(
    () =>
      Object.keys(formFields).reduce((acc, key) => {
        acc[key] = formFields[key].initialValue
        return acc
      }, {} as Record<string, string>),
    [formFields],
  )

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) =>
        Object.keys(values).reduce((acc, key) => {
          if (!values[key] && formFields[key].required) {
            acc[key] = 'Required'
          }

          return acc
        }, {} as Record<string, string>)
      }
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values)
        setSubmitting(false)
      }}
    >
      {({ errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {Object.values(formFields).map(
            (item) =>
              item.type === 'TEXT' && (
                <TextInput
                  key={item.name}
                  formItem={item}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              ),
          )}

          <div className="w-full flex justify-end gap-1 mt-3">
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}
