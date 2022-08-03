import { Label, Select, Tooltip } from 'flowbite-react'
import { FormikErrors, FormikHandlers, FormikTouched, useFormikContext } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import { useFetch } from '../../hooks'
import { Agent, FormField, ResourceResponse } from '../../models'
import { handleResource } from '../DataTable/tableColumns/handleResource'
import { Modal } from '../Modal/Modal'
import { Form } from './Form'
import { agentFormFields, agentInitialValues } from './formFields'

export const AgentSelector: FC<{
  formItem: FormField
  value: string
  touched: FormikTouched<Record<keyof FormField, string>>
  errors: FormikErrors<Record<keyof FormField, string>>
  handleChange: FormikHandlers['handleChange']
  handleBlur: FormikHandlers['handleBlur']
}> = ({ formItem: { name, label, required, validation }, value, touched, errors, handleChange, handleBlur }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { resource: agents } = useFetch<ResourceResponse>(`/api/agents`)

  const { values } = useFormikContext<Record<keyof FormField, string | Partial<Agent>>>()

  useEffect(() => {
    if (!(values?.agent as Agent)?.id && !value && agents?.items?.length) {
      values.agent = {
        id: agents.items[0].id,
      }
    }
  }, [agents?.items, value, values])

  return (
    <div className="m-1">
      <div className="mb-2 flex items-center gap-1">
        <div>
          <Label value={label} />
          {required && <span className="text-red-600">*</span>}
        </div>

        <Tooltip content="Add new agent">
          <HiOutlinePlusCircle className="mr-2 h-5 w-5 cursor-pointer" onClick={() => setIsModalVisible(true)} />
        </Tooltip>
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

      {isModalVisible && (
        <Modal isVisible={isModalVisible} title="Add new agent" onClose={() => setIsModalVisible(false)}>
          <Form
            formFields={agentFormFields}
            initialValues={agentInitialValues}
            onSubmit={async (formValues) => {
              await handleResource({
                resource: 'agents',
                operation: 'post',
                body: formValues,
              })

              setIsModalVisible(false)
            }}
          />
        </Modal>
      )}
    </div>
  )
}
