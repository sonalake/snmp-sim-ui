import React, { FC } from 'react'

export const StatusIndicator: FC<{ title: string; isActive: boolean }> = ({ title, isActive }) => (
  <span className="flex flex-row items-center">
    <span
      data-testid="status"
      className="w-2.5 h-2.5 mr-1 rounded-full"
      style={{ background: isActive ? 'green' : 'red' }}
    />
    {title}
  </span>
)
