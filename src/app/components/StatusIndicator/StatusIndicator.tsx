import { FC, useMemo } from 'react';
import { Badge, CustomFlowbiteTheme } from 'flowbite-react';

import { FanIcon } from '../Icons';

const customTheme: CustomFlowbiteTheme['badge'] = {
  root: {
    color: {
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    }
  }
};

export const StatusIndicator: FC<{ title: string; isActive: boolean }> = ({ title, isActive }) => {
  const animated = useMemo(() => (isActive ? 'animate-spin ' : ''), [isActive]);

  return (
    <Badge
      data-testid='status'
      className='flex items-center w-fit py-0.5 px-2.5'
      style={{ borderRadius: '6px' }}
      color={isActive ? 'success' : 'warning'}
      theme={customTheme}
    >
      <div className='flex items-center gap-1'>
        <div className={`${animated} w-3 h-3`}>
          <FanIcon />
        </div>
        <div className='leading-[1.125rem] font-medium'>{title}</div>
      </div>
    </Badge>
  );
};
