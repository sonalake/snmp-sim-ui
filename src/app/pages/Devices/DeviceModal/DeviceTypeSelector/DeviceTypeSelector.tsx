import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { Button, Label } from 'flowbite-react';

import { DeviceTypeModal } from './DeviceTypeModal';

const customTheme = {
  base: 'group flex h-min items-center relative w-full text-center relative focus:z-10 focus:outline-none border',
  color: {
    info: 'bg-gray-50 border-gray-300 text-gray-600 enabled:hover:bg-gray-100 enabled:hover:text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 dark:focus:border-cyan-500 dark:focus:ring-cyan-500'
  },
  inner: {
    base: 'flex flex-1 items-center justify-between transition-all duration-200'
  },
  size: {
    md: 'text-sm p-2.5'
  }
};

export const DeviceTypeSelector = () => {
  const [isDeviceTypeOpen, setIsDeviceTypeOpen] = useState(false);
  return (
    <>
      <div>
        <div className='mb-2 block'>
          <Label className='leading-normal dark:text-white' value='Type' />
        </div>
        <div className='flex'>
          <Button theme={customTheme} color='info' onClick={() => setIsDeviceTypeOpen(true)}>
            Select from the list
            <HiChevronDown className='h-4 w-4' />
          </Button>
        </div>
      </div>
      <DeviceTypeModal isOpen={isDeviceTypeOpen} onClose={() => setIsDeviceTypeOpen(false)} />
    </>
  );
};
