import { ColumnDef } from '@tanstack/react-table'
import { Tooltip } from 'flowbite-react'
import React from 'react'
import { StatusIndicator, StyledLink } from '../..'
import { Device } from '../../../models'
import { LOCALHOST } from '../../../constants'

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
    accessorFn: (row) => row.snmp_host === LOCALHOST,
    cell: ({ row }) => {
      const isMockActive = row.original.snmp_host === LOCALHOST

      return <StatusIndicator title={isMockActive ? 'Running' : 'Stopped'} isActive={isMockActive} />
    },
  },
]
