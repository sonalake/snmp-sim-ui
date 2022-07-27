import { Button } from 'flowbite-react'
import React, { useState } from 'react'
import { AiOutlineCaretRight, AiOutlineClose, AiOutlinePause } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { Alert, BreadCrumbs, Form, LoadingIndicator, PageWrapper, StatusIndicator } from '../../components'
import { handleResource } from '../../components/DataTable/tableColumns/handleResource'
import { deviceFormFields } from '../../components/Form/formFields'
import { useFetch } from '../../hooks'
import { Device } from '../../models'

const resource = 'devices'

export const DeviceDetails = () => {
  const [isRunning, setIsRunning] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const { resource: device, isLoading, error, fetchData } = useFetch<Device>(`/api/devices/${id}`)

  if (error) {
    throw error
  }

  return (
    <PageWrapper>
      {isLoading && <LoadingIndicator />}

      {device && (
        <div className="pb-32">
          <BreadCrumbs />

          <h1 className="text-4xl font-bolder mt-5 mb-8">{device.name}</h1>

          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-3">
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

              <p className="flex gap-1">
                <StatusIndicator title={isRunning ? 'Running' : 'Stopped'} isActive={isRunning} />
              </p>
            </div>

            <Button
              color="failure"
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
          </div>

          <Form
            formFields={deviceFormFields}
            initialValues={{ ...device, agent: { id: device.agent.id } }}
            snmpInputs
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
