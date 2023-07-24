import { FC } from 'react';

import { Divider } from 'app/components';
import { DeviceStatus } from 'app/constants';

import { DeviceStatusFilter } from './DeviceStatusFilter';
import { DeviceTypeFilter } from './DeviceTypeFilter';

interface DevicesSidebarContentProps {
  onSelectionChange: (values: string[]) => void;
  onStatusSelect: (value: DeviceStatus) => void;
}

export const DevicesSidebarContent: FC<DevicesSidebarContentProps> = ({
  onSelectionChange,
  onStatusSelect
}) => {
  return (
    <>
      <DeviceTypeFilter onSelectionChange={onSelectionChange} />
      <Divider />
      <DeviceStatusFilter onStatusSelect={onStatusSelect} />
      <Divider />
    </>
  );
};
