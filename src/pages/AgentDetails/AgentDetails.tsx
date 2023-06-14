import { Button } from 'flowbite-react'
import React from 'react'
import { HiTrash } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router'
import { useMutation } from 'react-query'
import { FormikValues } from 'formik'
import { Form, LoadingIndicator, PageWrapper } from '../../components'
import { agentFormFields } from '../../components/Form/formFields'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon'
import { deleteAgent, updateAgent, useFetchAgent } from '../../api/agents/agents.api'
import { successToast } from '../../components/Toasts/toasts'
import { Agent } from '../../models'

export const AgentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: agent, isLoading } = useFetchAgent(id)

  const { mutateAsync: deleteAgentAndRedirect } = useMutation({
    mutationFn: id ? () => deleteAgent(id) : undefined,
    onSuccess: async () => {
      successToast('Agent deleted!')
      navigate('/agents', { replace: true })
    },
  })

  const { mutateAsync: updateExistingAgent } = useMutation({
    mutationFn: (updatedAgent: Agent) => updateAgent(updatedAgent),
    onSuccess: () => {
      successToast('Agent updated!')
    },
  })

  const handleSubmit = (formValues: FormikValues) => {
    // TODO: formi should be generic
    const agentValues = formValues as unknown as Agent
    updateExistingAgent(agentValues)
  }

  return (
    <PageWrapper>
      {isLoading && <LoadingIndicator />}

      {agent && (
        <div className="pb-32">
          <PageTitle>{agent.name}</PageTitle>

          <div className="flex flex-row items-center justify-end mb-5">
            <Button
              color="failure"
              onClick={deleteAgentAndRedirect}
            >
              <ButtonIcon as={HiTrash} />
              Delete
            </Button>
          </div>

          <Form
            formFields={agentFormFields}
            initialValues={agent}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </PageWrapper>
  )
}
