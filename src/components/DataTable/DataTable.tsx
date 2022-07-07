import React, { FC } from 'react'
import { Device } from '../../models'
import { Table, Checkbox } from 'flowbite-react'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'

export const DataTable: FC<{ data: Device[]; columns: ColumnDef<Device>[] }> = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell className="!p-4">
          <Checkbox />
        </Table.HeadCell>

        {table.getHeaderGroups().map((headerGroup) => {
          return headerGroup.headers.map((header) => {
            // console.log(header)
            return (
              <Table.HeadCell key={header.id} colSpan={header.colSpan}>
                {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
              </Table.HeadCell>
            )
          })
        })}
      </Table.Head>

      <Table.Body className="divide-y">
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="!p-4">
              <Checkbox />
            </Table.Cell>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
