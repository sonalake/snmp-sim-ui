import { ColumnDef } from '@tanstack/react-table';
import { Badge } from 'flowbite-react';

import { StatusIndicator } from 'app/components';
import { Device } from 'app/models';

export const devicesColumns: ColumnDef<Device>[] = [
  {
    header: 'Name',
    accessorFn: row => row.name,
    cell: ({ row: { original } }) => (
      <div className='font-normal text-gray-900 text-sm dark:text-gray-200'>{original.name}</div>
    )
  },
  {
    header: 'Type',
    accessorFn: row => row.type,
    cell: ({ row: { original } }) => (
      <div className='font-bold text-gray-900 text-sm dark:text-gray-200'>{original.type}</div>
    )
  },
  {
    header: 'IP address',
    accessorFn: row => row.snmp_host,
    cell: ({ row: { original } }) => (
      <Badge style={{ width: 'fit-content' }}>
        <div className='font-medium text-sm leading-5s'>{original.snmp_host}</div>
      </Badge>
    )
  },
  {
    header: 'Port',
    accessorFn: row => row.snmp_port,
    cell: ({ row: { original } }) => (
      <Badge style={{ width: 'fit-content' }}>
        <div className='font-medium text-sm leading-5s'>{original.snmp_port}</div>
      </Badge>
    )
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
