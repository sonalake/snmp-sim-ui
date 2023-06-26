import { Badge, CustomFlowbiteTheme, useTheme } from 'flowbite-react'
import React, { FC, useMemo } from 'react'
import { FanRunningLight } from '../Icons/FanRunningLight'
import { FanStoppedLight } from '../Icons/FanStoppedLight'
import { FanRunningDark } from '../Icons/FanRunningDark'
import { FanStoppedDark } from '../Icons/FanStoppedDark'

export const StatusIndicator: FC<{ title: string; isActive: boolean }> = ({ title, isActive }) => {
  const { mode } = useTheme()
  const customTheme: CustomFlowbiteTheme['badge'] = {
    root: {
      color: {
        success: 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300 font-medium',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 font-medium',
      },
    },
  }

  const fan = useMemo(() => {
    if (isActive && mode === 'light') {
      return FanRunningLight
    }
    if (isActive && mode === 'dark') {
      return FanRunningDark
    }
    if (!isActive && mode === 'light') {
      return FanStoppedLight
    }
    if (!isActive && mode === 'dark') {
      return FanStoppedDark
    }
  }, [mode])

  return (
    <span className="flex flex-row items-center">
      <Badge
        data-testid="status"
        className="flex items-center w-fit"
        style={{ borderRadius: '6px' }}
        color={isActive ? 'success' : 'warning'}
        icon={fan}
        theme={customTheme}
      >
        {title}
      </Badge>
    </span>
  )
}
