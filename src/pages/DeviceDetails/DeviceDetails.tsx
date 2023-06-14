import { Button } from 'flowbite-react'
import React, { useState } from 'react'
import { HiPlay, HiStop, HiTrash } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from 'react-query'
import { FormikValues } from 'formik'
import { Alert, Form, LoadingIndicator, PageWrapper, StatusIndicator } from '../../components'
import { deviceFormFields } from '../../components/Form/formFields'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon'
import { deleteDevice, updateDevice, useFetchDevice } from '../../api/devices/devices.api'
import { QueryKey } from '../../api/query-keys'
import { successToast } from '../../components/Toasts/toasts'
import { Device } from '../../models'

export const DeviceDetails = () => {
  const [isRunning, setIsRunning] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()
  const { invalidateQueries } = useQueryClient()

  const { data: device, isLoading } = useFetchDevice(id)

  const refetchDevices = () => {
    invalidateQueries([QueryKey.DEVICES])
  }

  const { mutateAsync: deleteDeviceAndRedirect } = useMutation({
    mutationFn: id ? () => deleteDevice(id) : undefined,
    onSuccess: () => {
      successToast('Device deleted!')
      refetchDevices()
      navigate('/devices', { replace: true })
    },
  })

  const { mutateAsync: updateExistingDevice } = useMutation({
    mutationFn: (updatedDevice: Device) => updateDevice(updatedDevice),
    onSuccess: () => {
      successToast('Device updated!')
    },
  })

  const handleSubmit = (formValues: FormikValues) => {
    const deviceValues = formValues as unknown as Device
    updateExistingDevice(deviceValues)
  }

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
                  deleteDeviceAndRedirect()
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
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </PageWrapper>
  )
}
