import { ColumnDef } from '@tanstack/react-table'
import { Tooltip } from 'flowbite-react'
import React from 'react'
import { StatusIndicator, StyledLink } from '../..'
import { Device } from '../../../models'

export type DevicesColumns = Array<ColumnDef<Device>>

export const devicesColumns: DevicesColumns = [
  {
    header: 'Name',
    cell: ({ row: { original } }) =>
      original?.description ? (
        <Tooltip content={original.description}>
          <StyledLink href={`/devices/${original.id}`} label={original.name} />
        </Tooltip>
      ) : (
        <StyledLink href={`/devices/${original?.id}`} label={original?.name} />
      ),
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
