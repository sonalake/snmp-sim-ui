import { useState } from 'react';
import { Button } from 'flowbite-react';

import { DeviceTypeModal } from './DeviceTypeModal';

export const DeviceTypeSelector = () => {
  const [isDeviceTypeOpen, setIsDeviceTypeOpen] = useState(false);
  return (
    <>
      <Button
        className='bg-primary-700 dark:bg-primary-700 text-white'
        onClick={() => setIsDeviceTypeOpen(true)}
      >
        Select from the list
      </Button>
      <DeviceTypeModal isOpen={isDeviceTypeOpen} onClose={() => setIsDeviceTypeOpen(false)} />
    </>
  );
};
