import React, { FC, useCallback } from 'react'
import { Button, Modal, TextInput, Label } from 'flowbite-react'
import axios from 'axios'

export const AddNewDeviceModal: FC<{ isVisible: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {
  const createDevice = useCallback(async (values: unknown) => {
    console.log(values)
    try {
      const { data } = await axios.post('/api/devices', values)
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }, [])

  return (
    <Modal show={isVisible} onClose={() => onClose()}>
      <Modal.Header>Add New Device</Modal.Header>

      <Modal.Body>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()

            const formData = new FormData(e.target as HTMLFormElement)
            const formValues = Object.fromEntries(formData)

            createDevice(formValues)
          }}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name">
                Name<span className="text-red-600">*</span>
              </Label>
            </div>

            <TextInput
              type="text"
              name="name"
              placeholder="Name"
              helperText={<span className="text-red-600">Please provide a name</span>}
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="description">
                Description<span className="text-red-600">*</span>
              </Label>
            </div>

            <TextInput
              type="text"
              name="description"
              placeholder="Description"
              helperText={<span className="text-red-600">Please provide a description</span>}
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="snmp_data_url">
                SNMP data URL<span className="text-red-600">*</span>
              </Label>
            </div>

            <TextInput
              type="text"
              name="snmp_data_url"
              placeholder="SNMP data URL"
              helperText={<span className="text-red-600">Please provide an SNMP data URL</span>}
              required
            />
          </div>

          <div className="w-full flex justify-end gap-1">
            <Button color="light" onClick={() => onClose()}>
              Cancel
            </Button>

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
