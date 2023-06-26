import { Badge } from 'flowbite-react'
import React, { FC } from 'react'
import { FanRunning } from '../Icons/FanRunning'
import { FanStopped } from '../Icons/FanStopped'

export const StatusIndicator: FC<{ title: string; isActive: boolean }> = ({ title, isActive }) => (
  <span className="flex flex-row items-center">
    <Badge
      data-testid="status"
      className="flex items-center w-fit"
      style={{ borderRadius: '6px' }}
      color={isActive ? 'success' : 'warning'}
      icon={isActive ? FanRunning : FanStopped}
    >
      {title}
    </Badge>
  </span>
)
