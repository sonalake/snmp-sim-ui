import { ColumnDef } from '@tanstack/react-table';

import { StatusIndicator } from 'app/components';
import { Device } from 'app/types';

export const devicesColumns: ColumnDef<Device>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    cell: ({ row: { original } }) => (
      <div
        className='font-normal text-sm text-gray-900 dark:text-gray-200 max-w-[200px] truncate break-all'
        title={original.name}
      >
        {original.name}
      </div>
    )
  },
  {
    header: 'Type',
    accessorKey: 'type',
    cell: ({ row: { original } }) => (
      <div className='font-bold text-sm text-gray-900 dark:text-gray-200'>{original.type}</div>
    )
  },
  {
    header: 'IP address',
    accessorKey: 'snmp_host',
    cell: ({ row: { original } }) => (
      <div className='font-normal text-sm text-gray-900 dark:text-gray-200'>
        {original.snmp_host}
      </div>
    )
  },
  {
    header: 'Port',
    accessorKey: 'snmp_port',
    cell: ({ row: { original } }) => (
      <div className='font-normal text-sm text-gray-900 dark:text-gray-200'>
        {original.snmp_port}
      </div>
    )
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      const isActive = row.original.status === 'running';
      return <StatusIndicator title={isActive ? 'Running' : 'Stopped'} isActive={isActive} />;
    }
  }
];
