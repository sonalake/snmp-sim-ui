import { Button } from 'flowbite-react'
import React from 'react'
import { AiOutlineClose, AiOutlineTool } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { Alert, BreadCrumbs, LoadingIndicator, PageWrapper } from '../../components'
import { handleResource } from '../../components/DataTable/tableColumns/handleResource'
import { useFetch } from '../../hooks'
import { Agent } from '../../models'

const resource = 'agents'

export const AgentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { resource: device, isLoading, error } = useFetch<Agent>(`/api/agents/${id}`)

  if (error) {
    throw error
  }

  return (
    <PageWrapper>
      {isLoading && <LoadingIndicator />}

      {device && (
        <>
          <BreadCrumbs />

          <h1 className="text-4xl font-bolder mt-5 mb-8">{device.name} - details - WIP</h1>

          <div className="flex flex-row items-center gap-1 my-5">
            <Button
              color="light"
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
              <AiOutlineClose className="mr-2 h-5 w-5 cursor-pointer" /> Delete
            </Button>

            <Button
              color="light"
              onClick={() => toast(<Alert color="success" message="Agent updated! - to be implemented" />)}
            >
              <AiOutlineTool className="mr-2 h-5 w-5 cursor-pointer" /> Update
            </Button>
          </div>

          <p>Description: {device.description || 'N/A'}</p>
          <p>Data URL: {device.snmp_data_url}</p>
        </>
      )}
    </PageWrapper>
  )
}
