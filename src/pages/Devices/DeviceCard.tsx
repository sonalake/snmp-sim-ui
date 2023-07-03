import React, { FC } from 'react'
import { Badge, Card } from 'flowbite-react'
import { HiUpload } from 'react-icons/hi'
import { Device } from '../../models'
import { StatusIndicator } from '../../components'

interface DeviceCardProps {
  device: Device
}

export const DeviceCard: FC<DeviceCardProps> = ({ device }) => {
  return (
    <Card className="w-[307px] max-w-[307px] h-[131px] flex flex-col grow">
      <div className="flex flex-row justify-between">
        <div className="font-semibold">{device.name}</div>
        <HiUpload />
      </div>
      <div className="text-sm font-normal text-gray-500">{device.type}</div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-[2px]">
          <Badge className="rounded-r-none w-fit">
            <div className="font-medium text-sm leading-5s">{device.snmp_host}</div>
          </Badge>
          <Badge className="rounded-l-none w-fit">
            <div className="font-medium text-sm leading-5s">{device.snmp_port}</div>
          </Badge>
        </div>
        <StatusIndicator
          title={device.status === 'running' ? 'Running' : 'Stopped'}
          isActive={device.status === 'running'}
        />
      </div>
    </Card>
  )
}
