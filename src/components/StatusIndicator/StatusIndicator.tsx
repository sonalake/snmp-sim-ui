import { Badge } from 'flowbite-react'
import React, { FC } from 'react'
import { HiCheckCircle, HiXCircle } from 'react-icons/hi'

export const StatusIndicator: FC<{ title: string; isActive: boolean }> = ({ title, isActive }) => (
  <span className="flex flex-row items-center">
    <Badge
      data-testid="status"
      className="flex items-center w-fit"
      color={isActive ? 'success' : 'failure'}
      icon={isActive ? HiCheckCircle : HiXCircle}
    >
      {title}
    </Badge>
  </span>
)
