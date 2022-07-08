import { Pagination as FlowbitePagination, Select } from 'flowbite-react'
import React, { FC } from 'react'
import { PAGINATION_PAGE_SIZE_OPTIONS } from '../../constants'

export const Pagination: FC<{
  currentPage: number
  onPageChange: (value: number) => void
  pageSize: number
  onPageSizeChange: (value: number) => void
}> = ({ currentPage, onPageChange, pageSize, onPageSizeChange }) => (
  <div className="flex flex-row items-center gap-2 mt-3">
    <FlowbitePagination currentPage={currentPage} onPageChange={onPageChange} totalPages={100} />

    <div className="w-32 mt-2">
      <Select
        id="countries"
        sizing="sm"
        value={pageSize}
        onChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
      >
        {PAGINATION_PAGE_SIZE_OPTIONS.map((item) => (
          <option key={item} value={item}>
            {item} / page
          </option>
        ))}
      </Select>
    </div>
  </div>
)
