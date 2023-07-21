import { FC } from 'react';
import { Button } from 'flowbite-react';

import { DeviceStatus } from '../../../models';

interface DeviceStatusProps {
  handleSelectStatus?: (deviceStatus: DeviceStatus) => void;
  active?: DeviceStatus;
}

const buttons = [
  { status: DeviceStatus.ALL, name: 'All' },
  { status: DeviceStatus.RUNNING, name: 'Running' },
  { status: DeviceStatus.STOPPED, name: 'Stopped' }
];

export const DeviceStatusSelection: FC<DeviceStatusProps> = ({ handleSelectStatus, active }) => {
  return (
    <div>
      <h3 className='font-medium text-gray-800 dark:text-white mb-4'>Status</h3>
      <Button.Group>
        {buttons.map(btn => (
          <Button
            key={btn.status}
            color='gray'
            className={`dark:text-white ${
              active === btn.status ? 'bg-gray-200 dark:bg-blue-600' : ''
            }`}
            onClick={() => handleSelectStatus?.(btn.status)}
          >
            {btn.name}
          </Button>
        ))}
      </Button.Group>
    </div>
  );
};
