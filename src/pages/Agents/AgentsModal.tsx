import React, { FC } from 'react'
import { FormikValues } from 'formik'
import { useMutation, useQueryClient } from 'react-query'
import { Form, Modal } from '../../components'
import { Agent } from '../../models'
import { agentFormFields, agentInitialValues } from '../../components/Form/formFields'
import { createAgent, updateAgent } from '../../api/agents/agents.api'
import { QueryKey } from '../../api/query-keys'
import { successToast } from '../../components/Toasts/toasts'

interface AgentsModalProps {
  isOpen: boolean
  onClose: () => void
  selectedAgent?: Agent
}
export const AgentsModal: FC<AgentsModalProps> = ({ isOpen, onClose, selectedAgent }) => {
  const { invalidateQueries } = useQueryClient()

  const refetchAgentsAndClose = async () => {
    await invalidateQueries({ queryKey: QueryKey.AGENTS })
    onClose()
  }

  const { mutateAsync: createNewAgent } = useMutation({
    mutationFn: (agent: Omit<Agent, 'id'>) => createAgent(agent),
    onSuccess: () => {
      successToast('Agent created!')
      refetchAgentsAndClose()
    },
  })

  const { mutateAsync: updateExistingAgent } = useMutation({
    mutationFn: (agent: Agent) => updateAgent(agent),
    onSuccess: () => {
      successToast('Agent updated!')
      refetchAgentsAndClose()
    },
  })

  const handleSubmit = async (formValues: FormikValues) => {
    // @TODO Formik needs to be generic
    const newAgentvalues = formValues as unknown as Omit<Agent, 'id'>
    const agentValues = formValues as unknown as Agent
    selectedAgent ? updateExistingAgent(agentValues) : createNewAgent(newAgentvalues)
  }

  return (
    <Modal isOpen={isOpen} title={selectedAgent ? 'Update agent' : 'Add new agent'} onClose={onClose}>
      <Form formFields={agentFormFields} initialValues={selectedAgent || agentInitialValues} onSubmit={handleSubmit} />
    </Modal>
  )
}
