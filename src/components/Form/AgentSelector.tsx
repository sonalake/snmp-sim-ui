import { Label, Select, Tooltip } from 'flowbite-react'
import { FormikErrors, FormikHandlers, FormikTouched, FormikValues, useFormikContext } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import { useMutation } from 'react-query'
import { Agent, FormField } from '../../models'
import { Modal } from '../Modal/Modal'
import { ButtonIcon } from '../ButtonIcon/ButtonIcon'
import { createAgent, useFetchAgents } from '../../api/agents/agents.api'
import { successToast } from '../Toasts/toasts'
import { Form } from './Form'
import { agentFormFields, agentInitialValues } from './formFields'
import { HelperText } from './HelperText'

export const AgentSelector: FC<{
  formItem: FormField
  value: string
  touched: FormikTouched<Record<keyof FormField, string>>
  errors: FormikErrors<Record<keyof FormField, string>>
  handleChange: FormikHandlers['handleChange']
  handleBlur: FormikHandlers['handleBlur']
}> = ({ formItem: { name, label, required, validation }, value, touched, errors, handleChange, handleBlur }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const { data: agents } = useFetchAgents()

  const { values } = useFormikContext<Record<keyof FormField, string | Partial<Agent>>>()

  useEffect(() => {
    if (!(values?.agent as Agent)?.id && !value && agents?.items?.length) {
      values.agent = {
        id: agents.items[0].id,
      }
    }
  }, [agents?.items, value, values])

  const { mutateAsync: createNewAgent } = useMutation({
    mutationFn: (agent: Omit<Agent, 'id'>) => createAgent(agent),
    onSuccess: () => {
      successToast('Agent created!')
      closeModal()
    },
  })

  const handleSubmitAndCloseModal = async (formValues: FormikValues) => {
    const newAgentValues = formValues as unknown as Omit<Agent, 'id'>
    createNewAgent(newAgentValues)
  }

  return (
    <div className="m-1">
      <div className="mb-2 flex items-center gap-1">
        <div>
          <Label value={label} />
          {required && <span className="text-red-600">*</span>}
        </div>

        <Tooltip content="Add new agent">
          <ButtonIcon as={HiOutlinePlusCircle} onClick={openModal} />
        </Tooltip>
      </div>

      <div id="select">
        <Select
          name={name}
          value={value}
          required={required}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={<HelperText errors={errors} touched={touched} name={name} validation={validation} />}
        >
          {agents?.items?.map((option) => (
            <option key={option?.id} value={option?.id}>
              {option?.name}
            </option>
          ))}
        </Select>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} title="Add new agent" onClose={closeModal}>
          <Form formFields={agentFormFields} initialValues={agentInitialValues} onSubmit={handleSubmitAndCloseModal} />
        </Modal>
      )}
    </div>
  )
}
