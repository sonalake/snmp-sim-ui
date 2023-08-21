import { FC } from 'react';
import { HiOutlineUpload } from 'react-icons/hi';
import { Card } from 'flowbite-react';

import { StatusIndicator } from 'app/components';
import { Device } from 'app/types';

const customTheme = {
  root: {
    base: 'flex flex-col rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 hover:bg-blue-50 hover:border-blue-400 hover:dark:border-blue-400',
    children: 'flex h-full flex-col justify-center gap-4 p-4'
  }
};

interface DeviceCardProps {
  device: Device;
}

export const DeviceCard: FC<DeviceCardProps> = ({ device }) => (
  <Card theme={customTheme} className=''>
    <div className='flex flex-row justify-between items-center'>
      <div
        className='font-semibold text-base text-gray-900 dark:text-white truncate break-all'
        title={device.name}
      >
        {device.name}
      </div>
      <div>
        <HiOutlineUpload className='text-gray-500 dark:text-gray-50' size='20' />
      </div>
    </div>
    <div className='text-sm font-normal text-gray-500 dark:text-gray-400'>{device.type}</div>
    <div className='flex flex-row justify-between gap-1'>
      <div className='flex flex-row gap-[2px]'>
        <div className='font-normal text-sm text-blue-800 dark:text-gray-200 mr-2'>
          {device.snmp_host}
        </div>
        <div className='font-normal text-sm text-blue-800 dark:text-gray-200'>
          {device.snmp_port}
        </div>
      </div>
      <StatusIndicator
        title={device.status === 'running' ? 'Running' : 'Stopped'}
        isActive={device.status === 'running'}
      />
    </div>
  </Card>
);
