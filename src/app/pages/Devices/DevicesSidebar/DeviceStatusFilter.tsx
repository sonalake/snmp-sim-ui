import { FC, useState } from 'react';
import { Button } from 'flowbite-react';

import { DeviceStatus } from 'app/constants';

interface DeviceStatusFilterProps {
  onStatusSelect: (deviceStatus: DeviceStatus) => void;
}

const STATUS_OPTIONS = [
  { status: DeviceStatus.ALL, name: 'All' },
  { status: DeviceStatus.RUNNING, name: 'Running' },
  { status: DeviceStatus.STOPPED, name: 'Stopped' }
];

export const DeviceStatusFilter: FC<DeviceStatusFilterProps> = ({ onStatusSelect }) => {
  const [activeStatus, setActiveStatus] = useState<DeviceStatus>(DeviceStatus.ALL);

  const handleSelect = (val: DeviceStatus) => {
    setActiveStatus(val);
    onStatusSelect(val);
  };
  return (
    <div>
      <h3 className='font-medium text-gray-800 dark:text-white mb-4'>Status</h3>
      <Button.Group>
        {STATUS_OPTIONS.map(btn => (
          <Button
            key={btn.status}
            color='gray'
            className={`dark:text-white ${
              activeStatus === btn.status ? 'bg-gray-200 dark:bg-blue-600' : ''
            }`}
            onClick={() => handleSelect(btn.status)}
          >
            {btn.name}
          </Button>
        ))}
      </Button.Group>
    </div>
  );
};
