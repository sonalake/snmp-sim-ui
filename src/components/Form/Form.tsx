import { Button } from 'flowbite-react'
import { Formik, FormikValues } from 'formik'
import React, { FC, useMemo } from 'react'
import { Agent, Device, FormField } from '../../models'
import { AgentSelector } from './AgentSelector'
import { SNMPVersionSelector } from './SNMPVersionSelector'
import { TextInput } from './TextInput'

type Resource = Agent | Device

type InitialValues = Record<string, unknown>

export const Form: FC<{
  formFields: Record<string, FormField>
  selectedResource?: Resource
  withRadio?: boolean
  onSubmit: (values: FormikValues) => void
}> = ({ formFields, selectedResource, onSubmit, withRadio }) => {
  const initialValues = useMemo(
    () =>
      Object.keys(formFields).reduce((acc, key) => {
        if (key.includes('.')) {
          const [parent, child] = key.split('.') as [keyof Resource, keyof Resource['id']]

          acc[parent] = {
            [child]: selectedResource ? selectedResource[parent][child] : formFields[key].initialValue,
          }
        } else {
          acc[key] = selectedResource ? selectedResource[key as keyof Resource] : formFields[key].initialValue
        }
        return acc
      }, {} as InitialValues),
    [formFields, selectedResource],
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
      {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="overflow-scroll">
          {Object.values(formFields).map((item) =>
            item.type === 'TEXT' ? (
              <TextInput
                key={item.name}
                formItem={item}
                value={values[item.name] as string}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            ) : (
              item.type === 'AGENT_SELECT' && (
                <AgentSelector
                  key={item.name}
                  formItem={item}
                  value={(values.agent as Agent).id}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              )
            ),
          )}

          {withRadio && <SNMPVersionSelector />}

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
