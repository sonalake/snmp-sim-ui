import { FC, useMemo } from 'react';
import { Pagination as FlowbitePagination } from 'flowbite-react';

import { PAGINATION_DEFAULT_PAGE_SIZE_OPTION } from '../../constants';

export interface PageProps {
  page: number;
  pageSize: number;
}

const customTheme = {
  base: '',
  layout: {
    table: {
      base: 'text-sm text-gray-700 dark:text-gray-400',
      span: 'font-semibold text-gray-900 dark:text-white'
    }
  },
  pages: {
    base: 'xs:mt-0 mt-2 inline-flex items-center -space-x-px',
    showIcon: 'inline-flex',
    previous: {
      base: 'ml-0 rounded-l-lg border border-gray-300 bg-white py-1.5 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white font-medium text-sm',
      icon: 'h-5 w-5'
    },
    next: {
      base: 'rounded-r-lg border border-gray-300 bg-white py-1.5 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white font-medium text-sm',
      icon: 'h-5 w-5'
    },
    selector: {
      base: 'border border-gray-300 bg-white py-1.5 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white font-medium text-sm',
      active:
        'bg-primary-100 text-primary-600 hover:bg-primary-200 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white',
      disabled: 'opacity-50 cursor-normal'
    }
  }
};

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
        theme={customTheme}
        currentPage={pageProps.page}
        onPageChange={handlePageChange}
        totalPages={numberOfPages}
        unselectable={disabled ? 'off' : 'on'}
      />
    </div>
  ) : null;
};
