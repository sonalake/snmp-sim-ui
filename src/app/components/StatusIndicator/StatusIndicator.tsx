import { FC, useMemo } from 'react';
import { Badge, CustomFlowbiteTheme, useTheme } from 'flowbite-react';

import FanRunningDark from 'assets/fan_running_darkmode.gif';
import FanRunningLight from 'assets/fan_running_lightmode.gif';

import { FanStoppedDark } from '../Icons/FanStoppedDark';
import { FanStoppedLight } from '../Icons/FanStoppedLight';

const customTheme: CustomFlowbiteTheme['badge'] = {
  root: {
    color: {
      success: 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300 font-medium',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 font-medium'
    }
  }
};

export const StatusIndicator: FC<{ title: string; isActive: boolean }> = ({ title, isActive }) => {
  const { mode } = useTheme();

  const staticFan = useMemo(() => {
    if (!isActive && mode === 'light') {
      return FanStoppedLight;
    }
    if (!isActive && mode === 'dark') {
      return FanStoppedDark;
    }
  }, [isActive, mode]);

  const runningFan = useMemo(() => {
    if (isActive && mode === 'light') {
      return FanRunningLight;
    }
    if (isActive && mode === 'dark') {
      return FanRunningDark;
    }
  }, [isActive, mode]);

  return (
    <span className='flex flex-row items-center'>
      <Badge
        data-testid='status'
        className='flex items-center w-fit'
        style={{ borderRadius: '6px' }}
        color={isActive ? 'success' : 'warning'}
        icon={staticFan}
        theme={customTheme}
      >
        <div className='flex items-center gap-1'>
          {runningFan && <img className='w-3 h-3' src={runningFan} />}
          <div>{title}</div>
        </div>
      </Badge>
    </span>
  );
};
