import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { AiOutlineCaretRight, AiOutlineClose, AiOutlinePause, AiOutlineTool } from 'react-icons/ai'
import { StatusIndicator, StyledLink } from '../../components'
import { Device } from '../../models'

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
    header: 'Host',
    accessorFn: (row) => row.snmp_host,
  },
  {
    header: 'Port',
    accessorFn: (row) => row.snmp_port,
  },
  {
    header: 'State',
    cell: ({ row: { original } }) => {
      const isMockActive = original?.snmp_host.includes('14') || false

      return <StatusIndicator title={isMockActive ? 'Running' : 'Stopped'} isActive={isMockActive} />
    },
    accessorFn: (row) => row.snmp_host.includes('14'),
  },

  {
    header: 'Actions',
    cell: () => (
      <div className="flex flex-row">
        <AiOutlineCaretRight className="mr-2 h-5 w-5" />
        <AiOutlinePause className="mr-2 h-5 w-5" />
        <AiOutlineClose className="mr-2 h-5 w-5" />
        <AiOutlineTool className="mr-2 h-5 w-5" />
      </div>
    ),
  },
]
