import { Button } from 'flowbite-react'
import React, { useState } from 'react'
import { AiOutlineCaretRight, AiOutlineClose, AiOutlinePause, AiOutlineTool } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { Alert, BreadCrumbs, LoadingIndicator, PageWrapper, StatusIndicator } from '../../components'
import { handleResource } from '../../components/DataTable/tableColumns/handleResource'
import { useFetch } from '../../hooks'
import { Device } from '../../models'

const resource = 'devices'

export const DeviceDetails = () => {
  const [isRunning, setIsRunning] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const { resource: device, isLoading, error } = useFetch<Device>(`/api/devices/${id}`)

  if (error) {
    throw error
  }

  return (
    <PageWrapper>
      {isLoading && <LoadingIndicator />}

      {device && (
        <div className="pb-32">
          <BreadCrumbs />

          <h1 className="text-4xl font-bolder mt-5 mb-8">{device.name} - details - WIP</h1>

          <div className="flex flex-row items-center gap-1 my-5">
            {!isRunning ? (
              <Button
                color="light"
                onClick={() => {
                  // runDevice(device.id, true)
                  setIsRunning(true)
                  toast(<Alert color="success" message="Device running! - to be implemented" />)
                }}
              >
                <AiOutlineCaretRight className="mr-2 h-5 w-5 cursor-pointer" /> Start
              </Button>
            ) : (
              <Button
                color="light"
                onClick={() => {
                  // runDevice(device.id, false)
                  setIsRunning(false)
                  toast(<Alert color="success" message="Device stopped! - to be implemented" />)
                }}
              >
                <AiOutlinePause className="mr-2 h-5 w-5 cursor-pointer" /> Stop
              </Button>
            )}

            <Button
              color="light"
              onClick={async () => {
                if (confirm('Delete device?')) {
                  await handleResource({
                    resource,
                    operation: 'delete',
                    id,
                  })

                  navigate('/devices', { replace: true })
                }
              }}
            >
              <AiOutlineClose className="mr-2 h-5 w-5 cursor-pointer" /> Delete
            </Button>

            <Button
              color="light"
              onClick={() => toast(<Alert color="success" message="Device updated! - to be implemented" />)}
            >
              <AiOutlineTool className="mr-2 h-5 w-5 cursor-pointer" /> Update
            </Button>
          </div>

          <p className="flex gap-1">
            Status: <StatusIndicator title={isRunning ? 'Running' : 'Stopped'} isActive={isRunning} />
          </p>

          <p>Description: {device.description || 'N/A'}</p>
          <p>Host: {device.snmp_host}</p>
          <p>Port: {device.snmp_port}</p>
          <p>SNMP protocol attributes: {JSON.stringify(device.snmp_protocol_attributes, null, 2)}</p>
          <p>Agent: {device.agent.name}</p>
        </div>
      )}
    </PageWrapper>
  )
}
