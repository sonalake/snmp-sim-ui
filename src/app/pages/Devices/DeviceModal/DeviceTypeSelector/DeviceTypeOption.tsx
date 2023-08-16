import { FC } from 'react';

import { DeviceTypeCount } from 'app/types';

interface DeviceTypeOptionProps {
  deviceType: DeviceTypeCount;
  onClick: (deviceType: DeviceTypeCount) => void;
}

export const DeviceTypeOption: FC<DeviceTypeOptionProps> = ({ deviceType, onClick }) => (
  <div
    className='flex items-center justify-between rounded-lg p-3 cursor-pointer bg-blue-50 dark:bg-gray-700 text-blue-800 dark:text-white'
    onClick={() => onClick(deviceType)}
  >
    <span className='text-base font-bold'>{deviceType.name}</span>
    {!!deviceType.deviceCount && (
      <span className='text-xs leading-normal rounded-md py-0.5 px-2.5 bg-blue-100 dark:bg-gray-800 dark:text-gray-300'>
        {deviceType.deviceCount} devices
      </span>
    )}
  </div>
);
