import { FC } from 'react';

import { DeviceTypeCount } from 'app/types';

interface DeviceTypeOptionProps {
  deviceType: DeviceTypeCount;
}

export const DeviceTypeOption: FC<DeviceTypeOptionProps> = ({ deviceType }) => {
  return (
    <div className='flex items-start justify-between rounded p-3 bg-blue-50 dark:bg-gray-700 text-blue-800 dark:text-white'>
      <span className='text-base font-bold'>{deviceType.name}</span>
      <span className='text-xs leading-normal py-0.5 px-2.5 bg-blue-100 dark:bg-gray-800 dark:text-gray-300'>
        {!!deviceType.deviceCount && `${deviceType.deviceCount} devices`}
      </span>
    </div>
  );
};
