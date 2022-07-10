import { ColumnDef } from '@tanstack/react-table'
import { Tooltip } from 'flowbite-react'
import React from 'react'
import { AiOutlineCaretRight, AiOutlineClose, AiOutlinePause, AiOutlineTool } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { Alert, StatusIndicator, StyledLink } from '../../components'
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
    accessorFn: (row) => row.snmp_host.includes('14'),
  },

  {
    header: 'Actions',
    cell: () => (
      <div className="flex flex-row">
        <Tooltip content="Start a device">
          <AiOutlineCaretRight
            className="mr-2 h-5 w-5 cursor-pointer"
            onClick={() => toast(<Alert color="success" message="Device started! - to be implemented" />)}
          />
        </Tooltip>

        <Tooltip content="Stop a running device">
          <AiOutlinePause
            className="mr-2 h-5 w-5 cursor-pointer"
            onClick={() => toast(<Alert color="success" message="Device stopped! - to be implemented" />)}
          />
        </Tooltip>

        <Tooltip content="Delete a device">
          <AiOutlineClose
            className="mr-2 h-5 w-5 cursor-pointer"
            onClick={() =>
              confirm('Delete device? - to be implemented') &&
              toast(<Alert color="success" message="Device deleted! - to be implemented" />)
            }
          />
        </Tooltip>

        <Tooltip content="Modify a device">
          <AiOutlineTool
            className="mr-2 h-5 w-5 cursor-pointer"
            onClick={() => toast(<Alert color="success" message="Device modified! - to be implemented" />)}
          />
        </Tooltip>
      </div>
    ),
  },
]
