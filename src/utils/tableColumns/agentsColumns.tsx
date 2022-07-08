import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { AiOutlineClose, AiOutlineTool } from 'react-icons/ai'
import { StyledLink } from '../../components'
import { Agent } from '../../models'

export type AgentsColumns = Array<ColumnDef<Agent>>

export const agentsColumns: Array<ColumnDef<Agent>> = [
  {
    header: 'ID',
    cell: ({ row: { original } }) =>
      original?.id && <StyledLink href={`/agents/${original?.id}`} label={original.id} />,
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
    header: 'Actions',
    cell: () => (
      <div className="flex flex-row">
        <AiOutlineClose className="mr-2 h-5 w-5" />
        <AiOutlineTool className="mr-2 h-5 w-5" />
      </div>
    ),
  },
]
