import { FC, useState } from 'react';
import { Button } from 'flowbite-react';

import { Heading } from 'app/components';
import { DeviceStatus } from 'app/constants';

interface DeviceStatusFilterProps {
  onStatusSelect: (deviceStatus: DeviceStatus) => void;
}

const STATUS_OPTIONS = [
  { status: DeviceStatus.ALL, name: 'All' },
  { status: DeviceStatus.RUNNING, name: 'Running' },
  { status: DeviceStatus.STOPPED, name: 'Stopped' }
];

const customTheme = {
  base: 'group flex h-min items-center justify-center text-center relative focus:z-10 focus:outline-none'
};

export const DeviceStatusFilter: FC<DeviceStatusFilterProps> = ({ onStatusSelect }) => {
  const [activeStatus, setActiveStatus] = useState<DeviceStatus>(DeviceStatus.ALL);

  const handleSelect = (val: DeviceStatus) => {
    setActiveStatus(val);
    onStatusSelect(val);
  };
  return (
    <div>
      <Heading.H3>Status</Heading.H3>
      <Button.Group>
        {STATUS_OPTIONS.map(btn => (
          <Button
            key={btn.status}
            theme={customTheme}
            color='gray'
            className={`dark:text-white ${
              activeStatus === btn.status
                ? 'bg-blue-100 dark:bg-primary-600 dark:border-primary-900'
                : ''
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
