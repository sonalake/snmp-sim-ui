import { ColumnDef } from '@tanstack/react-table'
import { Tooltip } from 'flowbite-react'
import React from 'react'
import { StyledLink } from '../..'
import { Agent } from '../../../models'

export type AgentsColumns = Array<ColumnDef<Agent>>

export const agentsColumns: AgentsColumns = [
  {
    header: 'ID',
    cell: ({ row: { original } }) =>
      original?.id && (
        <Tooltip content={original.id}>
          <StyledLink href={`/agents/${original?.id}`} label={`${original.id.slice(0, 8)}...`} />
        </Tooltip>
      ),
    accessorFn: (row) => row.name,
  },
  {
    header: 'Name',
    cell: ({ row: { original } }) =>
      original?.name && <Tooltip content={`Description: ${original.description}`}>{original.name}</Tooltip>,
    accessorFn: (row) => row.name,
  },
  {
    header: 'SNMP data URL',
    accessorFn: (row) => row.snmp_data_url,
  },
]
