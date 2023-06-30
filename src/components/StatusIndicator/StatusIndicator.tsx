import { Badge, CustomFlowbiteTheme, useTheme } from 'flowbite-react'
import React, { FC, useMemo } from 'react'
import { FanStoppedLight } from '../Icons/FanStoppedLight'
import { FanStoppedDark } from '../Icons/FanStoppedDark'
import fanRunningLight from '../../assets/images/fan_running_lightmode.gif'
import fanRunningDark from '../../assets/images/fan_running_darkmode.gif'

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

  const staticFan = useMemo(() => {
    if (!isActive && mode === 'light') {
      return FanStoppedLight
    }
    if (!isActive && mode === 'dark') {
      return FanStoppedDark
    }
  }, [mode])

  const runingFan = useMemo(() => {
    if (isActive && mode === 'light') {
      return fanRunningLight
    }
    if (isActive && mode === 'dark') {
      return fanRunningDark
    }
  }, [mode])

  return (
    <span className="flex flex-row items-center">
      <Badge
        data-testid="status"
        className="flex items-center w-fit"
        style={{ borderRadius: '6px' }}
        color={isActive ? 'success' : 'warning'}
        icon={staticFan}
        theme={customTheme}
      >
        <div className="flex items-center gap-1">
          {runingFan && <img className="w-3 h-3" src={runingFan} />}
          <div>{title}</div>
        </div>
      </Badge>
    </span>
  )
}
