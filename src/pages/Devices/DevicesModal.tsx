import React, { FC } from 'react'
import { FormikValues } from 'formik'
import { useMutation, useQueryClient } from 'react-query'
import { Form, Modal } from '../../components'
import { deviceFormFields, deviceInitialValues } from '../../components/Form/formFields'
import { Device, ResourceResponse } from '../../models'
import { successToast } from '../../components/Toasts/toasts'
import { QueryKey } from '../../api/query-keys'
import { createDevice, updateDevice } from '../../api/devices/devices.api'

interface DevicesModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDevice?: Device
  agents?: ResourceResponse
}
export const DevicesModal: FC<DevicesModalProps> = ({ isOpen, onClose, selectedDevice, agents }) => {
  const queryClient = useQueryClient()

  const refetchAgentsAndClose = async () => {
    await queryClient.invalidateQueries({ queryKey: QueryKey.DEVICES })
    onClose()
  }

  const { mutateAsync: createNewDevice } = useMutation({
    mutationFn: (device: Omit<Device, 'id'>) => createDevice(device),
    onSuccess: () => {
      successToast('Device created!')
      refetchAgentsAndClose()
    },
  })

  const { mutateAsync: updateExistingDevice } = useMutation({
    mutationFn: (device: Device) => updateDevice(device),
    onSuccess: () => {
      successToast('Device updated!')
      refetchAgentsAndClose()
    },
  })

  const handleSubmit = async (formValues: FormikValues) => {
    // @TODO Formik needs to be generic
    const newDeviceValues = formValues as unknown as Omit<Device, 'id'>
    const deviceValues = formValues as unknown as Device
    selectedDevice ? updateExistingDevice(deviceValues) : createNewDevice(newDeviceValues)
  }

  return (
    <Modal isOpen={isOpen && !!agents} title={selectedDevice ? 'Update device' : 'Add new device'} onClose={onClose}>
      <Form
        formFields={deviceFormFields}
        initialValues={
          selectedDevice || {
            ...deviceInitialValues,
            agent: { id: agents.items[0].id },
          }
        }
        snmpInputs
        onSubmit={handleSubmit}
      />
    </Modal>
  )
}
