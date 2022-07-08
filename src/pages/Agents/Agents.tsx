import { Button } from 'flowbite-react'
import React, { useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { BreadCrumbs, DataTable, LoadingIndicator, PageWrapper, Pagination } from '../../components'
import { PAGINATION_PAGE_SIZE_OPTIONS } from '../../constants'
import { useFetch } from '../../hooks'
import { Agent } from '../../models'
import { agentsColumns } from '../../utils/tableColumns/agentsColumns'

export const Agents = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGINATION_PAGE_SIZE_OPTIONS[0])

  const {
    resource: agents,
    isLoading,
    error,
  } = useFetch<Agent[]>(`/api/agents?page=${currentPage}&page_size=${pageSize}`)

  if (error) {
    throw error
  }

  return (
    <PageWrapper>
      {isLoading && !agents?.length && <LoadingIndicator />}

      {!!agents && (
        <>
          <BreadCrumbs />

          <div className="flex flex-row items-center gap-1 justify-end my-5">
            <Button color="light">
              <AiOutlinePlusCircle className="mr-2 h-5 w-5" /> Add
            </Button>
          </div>

          {/* @TODO: make DataTable properly generic and remove this casting */}
          <DataTable data={agents} columns={agentsColumns as []} isSelectable={false} />

          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            pageSize={pageSize}
            onPageSizeChange={(size) => setPageSize(size)}
          />
        </>
      )}
    </PageWrapper>
  )
}
