import { ColumnDef } from '@tanstack/react-table'
import { Tooltip } from 'flowbite-react'
import React from 'react'
import { StatusIndicator, StyledLink } from '../..'
import { Device } from '../../../models'

export type DevicesColumns = Array<ColumnDef<Device>>

export const devicesColumns: DevicesColumns = [
  {
    header: 'ID',
    cell: ({ row: { original } }) =>
      original?.id && (
        <Tooltip content={original.id}>
          <StyledLink href={`/devices/${original.id}`} label={`${original.id.slice(0, 8)}...`} />
        </Tooltip>
      ),
    accessorFn: (row) => row.id,
  },
  {
    header: 'Name',
    cell: ({ row: { original } }) =>
      original?.name && <Tooltip content={`Description: ${original.description}`}>{original.name}</Tooltip>,
    accessorFn: (row) => row.name,
  },
  {
    header: 'Host',
    accessorFn: (row) => row.snmp_host,
  },
  {
    header: 'Port',
    accessorFn: (row) => row.snmp_port,
  },
  {
    header: 'State',
    cell: ({ row }) => {
      const isMockActive = row.original.snmp_host === '127.0.0.1'

      return <StatusIndicator title={isMockActive ? 'Running' : 'Stopped'} isActive={isMockActive} />
    },
  },
]
