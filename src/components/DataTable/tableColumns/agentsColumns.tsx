import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { StyledLink } from '../..'
import { Agent } from '../../../models'

export type AgentsColumns = Array<ColumnDef<Agent>>

export const agentsColumns: AgentsColumns = [
  {
    header: 'ID',
    cell: ({ row: { original } }) =>
      original?.id && <StyledLink href={`/agents/${original?.id}`} label={original.id} />,
    accessorFn: (row) => row.name,
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
    header: 'SNMP data URL',
    accessorFn: (row) => row.snmp_data_url,
  },
]
