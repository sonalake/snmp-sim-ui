import React, { ChangeEvent, FC, useMemo } from 'react'
import { Label } from 'flowbite-react'
import { Device } from '../../models'
import { useFetchDevices } from '../../api/devices/devices.api'
import { Checkbox } from '../Form/Checkbox'

export type TypeCheck = {
  type: string
  checked: boolean
}

interface TypesProps {
  handleSelectedTypes?: ({ type, checked }: TypeCheck) => void
}

interface DevicesByType {
  [key: string]: Device[]
}

export const Types: FC<TypesProps> = ({ handleSelectedTypes }) => {
  const { data: devices } = useFetchDevices()

  const deviceGroupsByType = useMemo(
    () =>
      devices?.items.reduce((acc: DevicesByType, device: Device) => {
        const { type } = device
        const devices = acc[type] || []
        acc[type] = [...devices, device]
        return acc
      }, {} as DevicesByType),
    [devices],
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { id, checked },
    } = event
    handleSelectedTypes?.({ type: id, checked })
  }

  return (
    <div>
      <h3 className="font-medium text-gray-800 dark:text-white mb-4">Devices</h3>
      <form className="flex max-w-md flex-col gap-4">
        {deviceGroupsByType &&
          Object.entries(deviceGroupsByType).map(([type, devices]) => (
            <div className="flex items-start gap-2" key={type}>
              <Checkbox id={type} onChange={handleChange} />
              <Label htmlFor={type}>
                <div className="leading-3 text-sm text-gray-900 dark:text-white font-medium">{type}</div>
                <div className="text-sx text-gray-500 dark:text-gray-400 font-normal">
                  {devices.length} device{devices.length > 1 ? 's' : ''}
                </div>
              </Label>
            </div>
          ))}
      </form>
    </div>
  )
}
