import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { Card, Table, TextInput } from 'flowbite-react'
import React, { FC, useEffect, useState } from 'react'
import { AiOutlineCaretDown, AiOutlineCaretUp, AiOutlineFilter } from 'react-icons/ai'
import { Agent, Device } from '../../models'
import { DataTableCheckbox } from './DataTableCheckbox/DataTableCheckbox'

interface Props<T extends Agent | Device> {
  data: T[]
  columns: Array<ColumnDef<T>>
  isSelectable: boolean
  onSelection?: (val: Array<Row<T>>) => void
}

export const DataTable: FC<Props<Agent | Device>> = ({ data, columns, isSelectable, onSelection }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [filter, setFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const { flatRows } = table.getSelectedRowModel()

  useEffect(() => {
    onSelection?.(flatRows)
  }, [onSelection, flatRows])

  return (
    <Table hoverable>
      <Table.Head>
        {isSelectable && !!table.getRowModel().rows.length && (
          <Table.HeadCell className="!p-4">
            <DataTableCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          </Table.HeadCell>
        )}

        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
            <Table.HeadCell key={header.id} colSpan={header.colSpan}>
              {!header.isPlaceholder && (
                <div className="flex flex-col relative" style={{ minWidth: '5vw' }}>
                  <div className="flex gap-1 items-center">
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none flex gap-2'
                          : 'flex justify-between gap-2',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {
                        {
                          asc: <AiOutlineCaretUp />,
                          desc: <AiOutlineCaretDown />,
                        }[header.column.getIsSorted() as string]
                      }
                    </div>

                    {header.column.columnDef.header !== 'Actions' && (
                      <AiOutlineFilter
                        className="cursor-pointer"
                        onClick={() =>
                          filter === header.column.columnDef.header
                            ? setFilter('')
                            : setFilter(header.column.columnDef.header as string)
                        }
                      />
                    )}
                  </div>
                  {filter === header.column.columnDef.header && (
                    <Card style={{ position: 'absolute', top: 20, left: 0, width: '20vw' }}>
                      <p>Filter by {header.column.columnDef.header} - to be implemented</p>
                      <TextInput />
                    </Card>
                  )}
                </div>
              )}
            </Table.HeadCell>
          )),
        )}
      </Table.Head>

      <Table.Body className="divide-y">
        {!table.getRowModel().rows.length ? (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              No data to display
            </Table.Cell>
          </Table.Row>
        ) : (
          table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              {isSelectable && (
                <Table.Cell className="!p-4">
                  <DataTableCheckbox
                    {...{
                      checked: row.getIsSelected(),
                      indeterminate: row.getIsSomeSelected(),
                      onChange: row.getToggleSelectedHandler(),
                    }}
                  />
                </Table.Cell>
              )}
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  )
}
