import { Pagination as FlowbitePagination, Select } from 'flowbite-react'
import React, { FC, useMemo } from 'react'
import { PAGINATION_DEFAULT_PAGE_SIZE_OPTION, PAGINATION_PAGE_SIZE_OPTIONS } from '../../constants'

export const Pagination: FC<{
  currentPage: number
  onPageChange: (value: number) => void
  pageSize: number
  onPageSizeChange: (value: number) => void
  totalCount: number
}> = ({ currentPage, onPageChange, pageSize, onPageSizeChange, totalCount }) => {
  const numberOfPages = useMemo(() => Math.ceil(totalCount / pageSize), [pageSize, totalCount])

  const displayPagination = useMemo(() => totalCount >= PAGINATION_DEFAULT_PAGE_SIZE_OPTION, [totalCount])

  return displayPagination ? (
    <div className="flex flex-row items-center gap-2 mt-3 pb-32">
      <FlowbitePagination currentPage={currentPage} onPageChange={onPageChange} totalPages={numberOfPages} />

      <div className="w-32 mt-2">
        <Select sizing="sm" value={pageSize} onChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}>
          {PAGINATION_PAGE_SIZE_OPTIONS.map((item) => (
            <option key={item} value={item}>
              {item} / page
            </option>
          ))}
        </Select>
      </div>
    </div>
  ) : null
}
