import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { DataTableCheckbox } from './DataTableCheckbox/DataTableCheckbox'

interface Props<T> {
  data: T[]
  columns: Array<ColumnDef<T>>
  isSelectable?: boolean
  onSelection?: (val: Array<Row<T>>) => void
}

export const DataTable = <T,>({ data, columns, isSelectable, onSelection }: Props<T>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})

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
    <Table hoverable className="shadow-md">
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
                          ? 'cursor-pointer select-none flex gap-1'
                          : 'flex justify-between gap-1',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      <div className="text-gray-500 font-semibold">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                      {
                        {
                          asc: <HiChevronUp />,
                          desc: <HiChevronDown />,
                        }[header.column.getIsSorted() as string]
                      }

                      {header.column.getCanSort() && !header.column.getIsSorted() && (
                        <div className="flex flex-col h-4">
                          <HiChevronUp style={{ marginBottom: '-2px' }} />
                          <HiChevronDown style={{ marginTop: '-2px' }} />
                        </div>
                      )}
                    </div>
                  </div>
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
