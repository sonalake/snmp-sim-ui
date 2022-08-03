import { ColumnDef } from '@tanstack/react-table'
import { Tooltip } from 'flowbite-react'
import React from 'react'
import { StyledLink } from '../..'
import { Agent } from '../../../models'

export type AgentsColumns = Array<ColumnDef<Agent>>

export const agentsColumns: AgentsColumns = [
  {
    header: 'Name',
    cell: ({ row: { original } }) =>
      original?.description ? (
        <Tooltip content={original.description}>
          <StyledLink href={`/agents/${original.id}`} label={original.name} />
        </Tooltip>
      ) : (
        <StyledLink href={`/agents/${original?.id}`} label={original?.name} />
      ),
    accessorFn: (row) => row.name,
  },
  {
    header: 'SNMP data URL',
    accessorFn: (row) => row.snmp_data_url,
  },
]
