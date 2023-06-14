import { Button } from 'flowbite-react'
import React from 'react'
import { HiTrash } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router'
import { useQueryClient } from 'react-query'
import { Form, LoadingIndicator, PageWrapper } from '../../components'
import { handleResource } from '../../components/DataTable/tableColumns/handleResource'
import { agentFormFields } from '../../components/Form/formFields'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon'
import { useFetchAgent } from '../../api/agents/agents.api'
import { QueryKey } from '../../api/query-keys'

const resource = 'agents'

export const AgentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { invalidateQueries } = useQueryClient()

  const { data: agent, isLoading, error } = useFetchAgent(id)

  const refetchAgents = () => {
    invalidateQueries([QueryKey.AGENT, id])
  }

  if (error) {
    throw error
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
              onClick={async () => {
                if (confirm('Delete agent?')) {
                  await handleResource({
                    resource,
                    operation: 'delete',
                    id,
                  })

                  navigate('/agents', { replace: true })
                }
              }}
            >
              <ButtonIcon as={HiTrash} />
              Delete
            </Button>
          </div>

          <Form
            formFields={agentFormFields}
            initialValues={agent}
            onSubmit={async (formValues) => {
              await handleResource({
                resource,
                operation: 'put',
                id,
                body: formValues,
              })

              refetchAgents()
            }}
          />
        </div>
      )}
    </PageWrapper>
  )
}
