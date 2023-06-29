import React from 'react'
import { ColumnDef, Row } from '@tanstack/react-table'
import { DataTable } from '../DataTable/DataTable'
import { PageProps, Pagination } from '../Pagination/Pagination'

interface DataTableWithPatination<T> {
  items: T[]
  columns: Array<ColumnDef<T>>
  totalCount: number
  pageProps: PageProps
  handlePaginationChange: (pageProps: PageProps) => void
  handleSelectItems?: (val: Array<Row<T>>) => void
  isSelectable?: boolean
  disabled: boolean
}
export const DataTableWithPatination = <T,>({
  items,
  columns,
  totalCount,
  pageProps,
  handlePaginationChange,
  handleSelectItems,
  isSelectable,
  disabled,
}: DataTableWithPatination<T>) => {
  return (
    <>
      <DataTable<T> data={items} columns={columns} onSelection={handleSelectItems} isSelectable={isSelectable} />

      <Pagination
        onPaginationChange={handlePaginationChange}
        totalCount={totalCount}
        disabled={disabled}
        pageProps={pageProps}
      />
    </>
  )
}
