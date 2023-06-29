import { Button } from 'flowbite-react'
import React, { FC } from 'react'
import { DeviceStatus } from '../../models'

interface StatusProps {
  handleSelectStatus?: (deviceStatus: DeviceStatus) => void
}

const buttons = [
  { status: DeviceStatus.ALL, name: 'All' },
  { status: DeviceStatus.RUNNING, name: 'Running' },
  { status: DeviceStatus.STOPPED, name: 'Stopped' },
]

export const Status: FC<StatusProps> = ({ handleSelectStatus }) => {
  return (
    <div>
      <h3 className="font-medium text-gray-800 dark:text-white mb-4">Status</h3>
      <Button.Group>
        {buttons.map((btn) => (
          <Button
            key={btn.status}
            color="gray"
            className="dark:text-white"
            onClick={() => handleSelectStatus?.(btn.status)}
          >
            {btn.name}
          </Button>
        ))}
      </Button.Group>
    </div>
  )
}
