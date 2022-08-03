import { Button } from 'flowbite-react'
import React from 'react'
import { HiTrash } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router'
import { Form, LoadingIndicator, PageWrapper } from '../../components'
import { handleResource } from '../../components/DataTable/tableColumns/handleResource'
import { agentFormFields } from '../../components/Form/formFields'
import { useFetch } from '../../hooks'
import { Agent } from '../../models'

const resource = 'agents'

export const AgentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { resource: agent, isLoading, error, fetchData } = useFetch<Agent>(`/api/agents/${id}`)

  if (error) {
    throw error
  }

  return (
    <PageWrapper>
      {isLoading && <LoadingIndicator />}

      {agent && (
        <div className="pb-32">
          <h1 className="text-5xl font-semibold mb-7">{agent.name}</h1>

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
              <HiTrash className="mr-2 h-5 w-5 cursor-pointer" /> Delete
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

              fetchData()
            }}
          />
        </div>
      )}
    </PageWrapper>
  )
}
