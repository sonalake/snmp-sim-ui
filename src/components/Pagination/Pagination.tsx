import { Pagination as FlowbitePagination, Select } from 'flowbite-react'
import React, { FC, useMemo } from 'react'
import { PAGINATION_DEFAULT_PAGE_SIZE_OPTION, PAGINATION_PAGE_SIZE_OPTIONS } from '../../constants'

export interface PageProps {
  page: number
  pageSize: number
}

export const Pagination: FC<{
  onPaginationChange: (pageProps: PageProps) => void
  pageProps: PageProps
  totalCount: number
  disabled: boolean
}> = ({ onPaginationChange, pageProps, totalCount, disabled }) => {
  const numberOfPages = useMemo(() => Math.ceil(totalCount / pageProps.pageSize), [pageProps.pageSize, totalCount])

  const displayPagination = useMemo(() => totalCount >= PAGINATION_DEFAULT_PAGE_SIZE_OPTION, [totalCount])

  const handlePageChange = (page: number) => {
    onPaginationChange({ ...pageProps, page })
  }

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const size = parseInt(event.target.value, 10)
    onPaginationChange({ ...pageProps, pageSize: size })
  }

  return displayPagination ? (
    <div className="flex justify-end items-center gap-2 mt-3 pb-32">
      <FlowbitePagination
        currentPage={pageProps.page}
        onPageChange={handlePageChange}
        totalPages={numberOfPages}
        unselectable={disabled ? 'off' : 'on'}
      />

      <div className="flex items-center mt-2">
        <div className="w-32">
          <Select sizing="sm" value={pageProps.pageSize} onChange={handlePageSizeChange} disabled={disabled}>
            {PAGINATION_PAGE_SIZE_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item} / page
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  ) : null
}
