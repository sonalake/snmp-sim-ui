import { FC, useMemo } from 'react';
import { Pagination as FlowbitePagination } from 'flowbite-react';

import { PAGINATION_DEFAULT_PAGE_SIZE_OPTION } from '../../constants';

export interface PageProps {
  page: number;
  pageSize: number;
}

export const Pagination: FC<{
  onPaginationChange: (pageProps: PageProps) => void;
  pageProps: PageProps;
  totalCount: number;
  disabled: boolean;
}> = ({ onPaginationChange, pageProps, totalCount, disabled }) => {
  const numberOfPages = useMemo(
    () => Math.ceil(totalCount / pageProps.pageSize),
    [pageProps.pageSize, totalCount]
  );

  const displayPagination = useMemo(
    () => totalCount >= PAGINATION_DEFAULT_PAGE_SIZE_OPTION,
    [totalCount]
  );

  const handlePageChange = (page: number) => {
    onPaginationChange({ ...pageProps, page });
  };

  return displayPagination ? (
    <div className='flex items-center gap-2 mt-3 pb-3'>
      <FlowbitePagination
        currentPage={pageProps.page}
        onPageChange={handlePageChange}
        totalPages={numberOfPages}
        unselectable={disabled ? 'off' : 'on'}
      />
    </div>
  ) : null;
};
