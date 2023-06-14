import { Button } from 'flowbite-react'
import React, { useState } from 'react'
import { HiPlay, HiStop, HiTrash } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { Alert, Form, LoadingIndicator, PageWrapper, StatusIndicator } from '../../components'
import { handleResource } from '../../components/DataTable/tableColumns/handleResource'
import { deviceFormFields } from '../../components/Form/formFields'
import { useFetch } from '../../hooks'
import { Device } from '../../models'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon'

const resource = 'devices'

export const DeviceDetails = () => {
  const [isRunning, setIsRunning] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const { resource: device, isLoading, fetchData } = useFetch<Device>(`/api/devices/${id}`)


  return (
    <PageWrapper>
      {isLoading && <LoadingIndicator />}

      {device && (
        <div className="pb-32">
          <PageTitle>{device.name}</PageTitle>

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              {!isRunning ? (
                <Button
                  color="success"
                  onClick={() => {
                    // runDevice(device.id, true)
                    setIsRunning(true)
                    toast(<Alert color="success" message="Device running! - to be implemented" />)
                  }}
                >
                  <ButtonIcon as={HiPlay} />
                  Start
                </Button>
              ) : (
                <Button
                  color="failure"
                  onClick={() => {
                    // runDevice(device.id, false)
                    setIsRunning(false)
                    toast(<Alert color="success" message="Device stopped! - to be implemented" />)
                  }}
                >
                  <ButtonIcon as={HiStop} />
                  Stop
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
              <ButtonIcon as={HiTrash} />
              Delete
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
