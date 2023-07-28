import { SetStateAction } from 'react';
import { ColumnDef, Row, SortingState } from '@tanstack/react-table';

import { PageProps, Pagination } from '../Pagination';

import { DataTable } from './DataTable';

interface DataTableWithPatinationProps<T> {
  columns: Array<ColumnDef<T>>;
  disabled: boolean;
  isSelectable?: boolean;
  items: T[];
  pageProps: PageProps;
  sortingState: SortingState;
  totalCount: number;
  onPaginationChange: (pageProps: PageProps) => void;
  onSelectItems?: (val: Array<Row<T>>) => void;
  onSortingChange: (newState: SetStateAction<SortingState>) => void;
}

export const DataTableWithPatination = <T,>({
  columns,
  disabled,
  isSelectable,
  items,
  pageProps,
  sortingState,
  totalCount,
  onPaginationChange,
  onSelectItems,
  onSortingChange
}: DataTableWithPatinationProps<T>) => (
  <>
    <DataTable<T>
      columns={columns}
      data={items}
      isSelectable={isSelectable}
      sortingState={sortingState}
      onSelection={onSelectItems}
      onSortingChange={onSortingChange}
    />
    <Pagination
      onPaginationChange={onPaginationChange}
      totalCount={totalCount}
      disabled={disabled}
      pageProps={pageProps}
    />
  </>
);
