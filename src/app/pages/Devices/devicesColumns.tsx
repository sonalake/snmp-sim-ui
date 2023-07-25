import { ColumnDef } from '@tanstack/react-table';

import { StatusIndicator } from 'app/components';
import { Device } from 'app/types';

import { DeviceBadge } from './DeviceBadge';

export const devicesColumns: ColumnDef<Device>[] = [
  {
    header: 'Name',
    accessorFn: row => row.name,
    cell: ({ row: { original } }) => (
      <div className='font-normal text-sm text-gray-900 dark:text-gray-200'>{original.name}</div>
    )
  },
  {
    header: 'Type',
    accessorFn: row => row.type,
    cell: ({ row: { original } }) => (
      <div className='font-bold text-sm text-gray-900 dark:text-gray-200'>{original.type}</div>
    )
  },
  {
    header: 'IP address',
    accessorFn: row => row.snmp_host,
    cell: ({ row: { original } }) => <DeviceBadge>{original.snmp_host}</DeviceBadge>
  },
  {
    header: 'Port',
    accessorFn: row => row.snmp_port,
    cell: ({ row: { original } }) => <DeviceBadge>{original.snmp_port}</DeviceBadge>
  },
  {
    header: 'Status',
    accessorFn: row => row.status,
    cell: ({ row }) => {
      const isActive = row.original.status === 'running';
      return <StatusIndicator title={isActive ? 'Running' : 'Stopped'} isActive={isActive} />;
    }
  }
];
