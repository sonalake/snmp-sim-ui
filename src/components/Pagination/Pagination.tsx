import { Pagination as FlowbitePagination, Select } from 'flowbite-react'
import React, { FC, useMemo } from 'react'
import { PAGINATION_DEFAULT_PAGE_SIZE_OPTION, PAGINATION_PAGE_SIZE_OPTIONS } from '../../constants'

export const Pagination: FC<{
  currentPage: number
  onPageChange: (value: number) => void
  pageSize: number
  onPageSizeChange: (value: number) => void
  totalCount: number
  disabled: boolean
}> = ({ currentPage, onPageChange, pageSize, onPageSizeChange, totalCount, disabled }) => {
  const numberOfPages = useMemo(() => Math.ceil(totalCount / pageSize), [pageSize, totalCount])

  const displayPagination = useMemo(() => totalCount >= PAGINATION_DEFAULT_PAGE_SIZE_OPTION, [totalCount])

  return displayPagination ? (
    <div className="flex justify-end items-center gap-2 mt-3 pb-32">
      <FlowbitePagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={numberOfPages}
        unselectable={disabled ? 'off' : 'on'}
      />

      <div className="flex items-center mt-2">
        <div className="w-32">
          <Select
            sizing="sm"
            value={pageSize}
            onChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
            disabled={disabled}
          >
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
