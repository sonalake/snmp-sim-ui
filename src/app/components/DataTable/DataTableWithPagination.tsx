import { ColumnDef, Row } from '@tanstack/react-table';

import { PageProps, Pagination } from '../Pagination';

import { DataTable } from './DataTable';

interface DataTableWithPatinationProps<T> {
  columns: Array<ColumnDef<T>>;
  disabled: boolean;
  isSelectable?: boolean;
  items: T[];
  pageProps: PageProps;
  totalCount: number;
  handlePaginationChange: (pageProps: PageProps) => void;
  handleSelectItems?: (val: Array<Row<T>>) => void;
}

export const DataTableWithPatination = <T,>({
  columns,
  disabled,
  isSelectable,
  items,
  pageProps,
  totalCount,
  handlePaginationChange,
  handleSelectItems
}: DataTableWithPatinationProps<T>) => (
  <>
    <DataTable<T>
      data={items}
      columns={columns}
      onSelection={handleSelectItems}
      isSelectable={isSelectable}
    />
    <Pagination
      onPaginationChange={handlePaginationChange}
      totalCount={totalCount}
      disabled={disabled}
      pageProps={pageProps}
    />
  </>
);
