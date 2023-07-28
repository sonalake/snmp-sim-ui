import { ChangeEvent, FC, useMemo, useState } from 'react';
import { Label } from 'flowbite-react';

import { Checkbox, Heading } from 'app/components';
import { useFetchDevices } from 'app/queries/useDeviceQueries';
import { Device } from 'app/types';

interface DeviceTypeFilterProps {
  onSelectionChange: (values: string[]) => void;
}

interface DevicesByType {
  [key: string]: Device[];
}

export const DeviceTypeFilter: FC<DeviceTypeFilterProps> = ({ onSelectionChange }) => {
  const { data } = useFetchDevices();

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const deviceGroupsByType = useMemo(
    () =>
      (data?.items || []).reduce((acc: DevicesByType, device: Device) => {
        const { type } = device;
        const devices = acc[type] || [];
        acc[type] = [...devices, device];
        return acc;
      }, {} as DevicesByType),
    [data]
  );

  const handleChange = ({ target: { id, checked } }: ChangeEvent<HTMLInputElement>) => {
    let types = [...selectedTypes];
    if (checked && !types.includes(id)) {
      types.push(id);
    } else if (!checked && types.includes(id)) {
      types = [...selectedTypes].filter(type => type !== id);
    }
    setSelectedTypes(types);
    onSelectionChange(types);
  };

  return (
    <div>
      <Heading.H3>Device Types</Heading.H3>
      <form className='flex max-w-md flex-col gap-4'>
        {deviceGroupsByType &&
          Object.entries(deviceGroupsByType).map(([type, devices]) => (
            <div className='flex items-start gap-2' key={type}>
              <Checkbox id={type} onChange={handleChange} />
              <Label htmlFor={type}>
                <div className='text-sm leading-4 font-medium text-gray-900 dark:text-white'>
                  {type}
                </div>
                <div className='text-xs leading-normal font-normal text-gray-500 dark:text-gray-400'>
                  {devices.length} device{devices.length > 1 ? 's' : ''}
                </div>
              </Label>
            </div>
          ))}
      </form>
    </div>
  );
};
