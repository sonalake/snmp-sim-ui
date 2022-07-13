import { Label, Select } from 'flowbite-react'
import { FormikErrors, FormikHandlers, FormikTouched, useFormikContext } from 'formik'
import React, { FC, useEffect } from 'react'
import { useFetch } from '../../hooks'
import { FormField, ResourceResponse } from '../../models'

export const SelectInput: FC<{
  formItem: FormField
  value: string
  touched: FormikTouched<Record<keyof FormField, string>>
  errors: FormikErrors<Record<keyof FormField, string>>
  handleChange: FormikHandlers['handleChange']
  handleBlur: FormikHandlers['handleBlur']
}> = ({ formItem: { name, label, required, validation }, value, touched, errors, handleChange, handleBlur }) => {
  const { resource: agents } = useFetch<ResourceResponse>(`/api/agents`)

  const { values } = useFormikContext<Record<keyof FormField, string>>()

  useEffect(() => {
    if (!values['agent.id'] && !value && agents?.items?.length) {
      values['agent.id'] = agents.items[0].id
    }
  }, [agents?.items, value, values])

  return (
    <>
      <div className="my-1">
        <div className="mb-2 block">
          <Label value={label} />
        </div>
      </div>

      <div id="select">
        <Select
          name={name}
          value={value}
          required={required}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={
            <span style={{ visibility: errors[name] && touched[name] ? 'visible' : 'hidden' }} className="text-red-600">
              {validation}
            </span>
          }
        >
          {agents?.items?.map((option) => (
            <option key={option?.id} value={option?.id}>
              {option?.name}
            </option>
          ))}
        </Select>
      </div>
    </>
  )
}
