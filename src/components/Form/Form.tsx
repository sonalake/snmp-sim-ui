import { Button } from 'flowbite-react'
import { Form as FormikForm, Formik, FormikValues } from 'formik'
import React, { FC } from 'react'
import { Device, FormField } from '../../models'
import { SNMPVersionSelector } from './SNMPVersionSelector'
import { TextInput } from './TextInput'

type InitialValues = Partial<Device>

export const Form: FC<{
  formFields: Record<string, FormField>
  initialValues: InitialValues
  snmpInputs?: boolean
  onSubmit: (values: FormikValues) => void
}> = ({ formFields, initialValues, snmpInputs, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={(values) =>
        Object.keys(values).reduce((acc, key) => {
          if (!values[key] && formFields[key]?.required) {
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
      {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <FormikForm>
          {Object.values(formFields).map((item) => {
            return (
              item.type === 'TEXT' ||
              (item.type === 'NUMBER' && (
                <TextInput
                  key={item.name}
                  formItem={item}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              ))
            )
          })}

          {snmpInputs && <SNMPVersionSelector />}

          <div className="w-full flex justify-end gap-1 mt-3">
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </div>
        </FormikForm>
      )}
    </Formik>
  )
}
