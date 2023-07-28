import { SetStateAction, useEffect, useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { HiChevronUpDown } from 'react-icons/hi2';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import { Table } from 'flowbite-react';

import { DataTableCheckbox } from './DataTableCheckbox/DataTableCheckbox';

interface Props<T> {
  data: T[];
  columns: Array<ColumnDef<T>>;
  isSelectable?: boolean;
  sortingState: SortingState;
  onSelection?: (val: Array<Row<T>>) => void;
  onSortingChange: (newState: SetStateAction<SortingState>) => void;
}

export const DataTable = <T,>({
  data = [],
  columns,
  isSelectable,
  sortingState,
  onSelection,
  onSortingChange
}: Props<T>) => {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: { sorting: sortingState, rowSelection },
    manualSorting: true,
    onSortingChange: onSortingChange,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  useEffect(() => {
    if (rowSelection && table) {
      const { flatRows } = table.getSelectedRowModel();
      onSelection?.(flatRows);
    }
  }, [onSelection, rowSelection, table]);

  return (
    <div className='relative overflow-x-auto shadow-md rounded-lg'>
      {!!table && (
        <Table hoverable className='shadow-md'>
          <Table.Head className='border-b-[1px] dark:border-gray-700'>
            {isSelectable && !!table.getRowModel().rows.length && (
              <Table.HeadCell className='!p-4 hover:bg-primary-50 dark:hover:bg-gray-700 bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                <DataTableCheckbox
                  {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler()
                  }}
                />
              </Table.HeadCell>
            )}

            {table.getHeaderGroups().map(headerGroup =>
              headerGroup.headers.map(header => (
                <Table.HeadCell
                  key={header.id}
                  colSpan={header.colSpan}
                  className='p-4 hover:bg-primary-50 dark:hover:bg-gray-700 bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                >
                  {!header.isPlaceholder && (
                    <div className='flex flex-col relative' style={{ minWidth: '5vw' }}>
                      <div className='flex gap-1 items-center'>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none flex gap-1'
                              : 'flex justify-between gap-1',
                            onClick: header.column.getToggleSortingHandler()
                          }}
                        >
                          <div className='text-gray-500 font-semibold dark:text-gray-300'>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </div>
                          {
                            {
                              asc: <HiChevronUp size='16' />,
                              desc: <HiChevronDown size='16' />
                            }[header.column.getIsSorted() as string]
                          }

                          {header.column.getCanSort() && !header.column.getIsSorted() && (
                            <HiChevronUpDown size='16' />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Table.HeadCell>
              ))
            )}
          </Table.Head>

          <Table.Body className='divide-y'>
            {!table.getRowModel().rows.length ? (
              <Table.Row className='hover:bg-primary-50 dark:hover:bg-gray-700 bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell
                  className='whitespace-nowrap font-normal text-sm text-gray-900 dark:text-gray-200'
                  colSpan={columns.length}
                >
                  No data to display
                </Table.Cell>
              </Table.Row>
            ) : (
              table.getRowModel().rows.map(row => (
                <Table.Row
                  key={row.id}
                  className='hover:bg-primary-50 dark:hover:bg-gray-700 bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  {isSelectable && (
                    <Table.Cell className='!p-4'>
                      <DataTableCheckbox
                        {...{
                          checked: row.getIsSelected(),
                          indeterminate: row.getIsSomeSelected(),
                          onChange: row.getToggleSelectedHandler()
                        }}
                      />
                    </Table.Cell>
                  )}
                  {row.getVisibleCells().map(cell => (
                    <Table.Cell
                      key={cell.id}
                      className='p-4 whitespace-nowrap font-normal text-gray-900 dark:text-gray-200'
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};
