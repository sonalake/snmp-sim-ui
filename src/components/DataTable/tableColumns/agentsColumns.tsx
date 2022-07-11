import { ColumnDef } from '@tanstack/react-table'
import { Tooltip } from 'flowbite-react'
import React from 'react'
import { AiOutlineClose, AiOutlineTool } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { Alert, StyledLink } from '../..'
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
  {
    header: 'Actions',
    cell: () => (
      <div className="flex flex-row">
        <Tooltip content="Delete an agent">
          <AiOutlineClose
            className="mr-2 h-5 w-5 cursor-pointer"
            onClick={() =>
              confirm('Delete agent? - to be implemented') &&
              toast(<Alert color="success" message="Agent deleted! - to be implemented" />)
            }
          />
        </Tooltip>

        <Tooltip content="Modify an agent">
          <AiOutlineTool
            className="mr-2 h-5 w-5 cursor-pointer"
            onClick={() => toast(<Alert color="success" message="Agent modified! - to be implemented" />)}
          />
        </Tooltip>
      </div>
    ),
  },
]
