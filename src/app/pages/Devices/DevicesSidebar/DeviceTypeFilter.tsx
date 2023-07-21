import { ChangeEvent, FC, useMemo, useState } from 'react';
import { Label } from 'flowbite-react';

import { useFetchDevices } from 'app/api/devices.api';
import { Checkbox } from 'app/components/Form/Checkbox';
import { Device } from 'app/models';

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
    const types = [...selectedTypes];
    if (checked && !types.includes(id)) {
      types.push(id);
    } else if (!checked && types.includes(id)) {
      types.filter(type => type !== id);
    }
    setSelectedTypes(types);
    onSelectionChange(types);
  };

  return (
    <div>
      <h3 className='font-medium text-gray-800 dark:text-white mb-4'>Device Types</h3>
      <form className='flex max-w-md flex-col gap-4'>
        {deviceGroupsByType &&
          Object.entries(deviceGroupsByType).map(([type, devices]) => (
            <div className='flex items-start gap-2' key={type}>
              <Checkbox id={type} onChange={handleChange} />
              <Label htmlFor={type}>
                <div className='leading-3 text-sm text-gray-900 dark:text-white font-medium'>
                  {type}
                </div>
                <div className='text-sx text-gray-500 dark:text-gray-400 font-normal'>
                  {devices.length} device{devices.length > 1 ? 's' : ''}
                </div>
              </Label>
            </div>
          ))}
      </form>
    </div>
  );
};
