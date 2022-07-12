import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { StatusIndicator, StyledLink } from '../..'
import { Device } from '../../../models'

export type DevicesColumns = Array<ColumnDef<Device>>

export const devicesColumns: DevicesColumns = [
  {
    header: 'ID',
    cell: ({ row: { original } }) =>
      original?.id && <StyledLink href={`/devices/${original?.id}`} label={original.id} />,
    accessorFn: (row) => row.id,
  },
  {
    header: 'Name',
    accessorFn: (row) => row.name,
  },
  {
    header: 'Description',
    accessorFn: (row) => row.description,
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
    cell: () => {
      const isMockActive = false

      return <StatusIndicator title={isMockActive ? 'Running' : 'Stopped'} isActive={isMockActive} />
    },
  },
]
