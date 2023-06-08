import { Pagination as FlowbitePagination, Select } from 'flowbite-react'
import React, { FC, useMemo, useState } from 'react'
import { PAGINATION_DEFAULT_PAGE_SIZE_OPTION, PAGINATION_PAGE_SIZE_OPTIONS } from '../../constants'

export const Pagination: FC<{
  onPageChange: (value: number) => void
  onPageSizeChange: (value: number) => void
  totalCount: number
  disabled: boolean
}> = ({ onPageChange, onPageSizeChange, totalCount, disabled }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGINATION_DEFAULT_PAGE_SIZE_OPTION)

  const numberOfPages = useMemo(() => Math.ceil(totalCount / pageSize), [pageSize, totalCount])

  const displayPagination = useMemo(() => totalCount >= PAGINATION_DEFAULT_PAGE_SIZE_OPTION, [totalCount])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    onPageChange(page)
  }

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const size = parseInt(event.target.value, 10)
    setPageSize(size)
    onPageSizeChange(size)
  }

  return displayPagination ? (
    <div className="flex justify-end items-center gap-2 mt-3 pb-32">
      <FlowbitePagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={numberOfPages}
        unselectable={disabled ? 'off' : 'on'}
      />

      <div className="flex items-center mt-2">
        <div className="w-32">
          <Select sizing="sm" value={pageSize} onChange={handlePageSizeChange} disabled={disabled}>
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
