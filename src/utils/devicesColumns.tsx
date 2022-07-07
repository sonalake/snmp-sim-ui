import React from 'react'
import { StatusIndicator, StyledLink } from '../components'
import { ColumnDef } from '@tanstack/react-table'
import { AiOutlineCaretRight, AiOutlineClose, AiOutlinePause, AiOutlineTool } from 'react-icons/ai'
import { Device } from '../models'

export const devicesColumns: ColumnDef<Device>[] = [
  {
    header: 'ID',
    cell: ({ row: { original } }) =>
      original?.id && <StyledLink href={`/devices/${original?.id}`} label={original.id} />,
    footer: (props) => props.column.id,
  },
  {
    header: 'Address',
    accessorFn: (row) => row.snmp_host,
    footer: (props) => props.column.id,
  },
  {
    header: 'Netmask',
    cell: () => 22,
    footer: (props) => props.column.id,
  },
  {
    header: 'Port',
    accessorFn: (row) => row.snmp_port,
    footer: (props) => props.column.id,
  },
  {
    header: 'State',
    cell: () => <StatusIndicator title={true ? 'Running' : 'Stopped'} isActive={true} />,
    footer: (props) => props.column.id,
  },
  {
    header: 'Type',
    accessorFn: (row) => row.name,
    footer: (props) => props.column.id,
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
    footer: (props) => props.column.id,
  },
]
