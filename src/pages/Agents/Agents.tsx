import { ColumnDef } from '@tanstack/react-table'
import { Button, Tooltip } from 'flowbite-react'
import React, { useCallback, useMemo, useState } from 'react'
import { AiOutlineClose, AiOutlinePlusCircle, AiOutlineTool } from 'react-icons/ai'
import { BreadCrumbs, DataTable, Form, LoadingIndicator, Modal, PageWrapper, Pagination } from '../../components'
import { agentsColumns } from '../../components/DataTable/tableColumns/agentsColumns'
import {
  createResource,
  deleteResource,
  updateResource,
} from '../../components/DataTable/tableColumns/handleResourceMethods'
import { agentFormFields } from '../../components/Form/formFields'
import { PAGINATION_DEFAULT_PAGE_SIZE_OPTION } from '../../constants'
import { useFetch } from '../../hooks'
import { Agent, AgentResponse } from '../../models'

export const Agents = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGINATION_DEFAULT_PAGE_SIZE_OPTION)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent>()

  const {
    resource: agents,
    isLoading,
    error,
    fetchData,
  } = useFetch<AgentResponse>(`/api/agents?page=${currentPage}&page_size=${pageSize}`)

  const onCloseModal = useCallback(() => {
    if (isModalVisible) {
      setIsModalVisible(false)
    } else if (selectedAgent) {
      setSelectedAgent(undefined)
    }
  }, [isModalVisible, selectedAgent])

  const agentActionsColumn: ColumnDef<Agent> = useMemo(
    () => ({
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex flex-row">
          <Tooltip content="Delete agent">
            <AiOutlineClose
              className="mr-2 h-5 w-5 cursor-pointer"
              onClick={() => confirm('Delete agent?') && deleteResource(row.original?.id, 'agent', fetchData)}
            />
          </Tooltip>

          <Tooltip content="Update agent">
            <AiOutlineTool className="mr-2 h-5 w-5 cursor-pointer" onClick={() => setSelectedAgent(row.original)} />
          </Tooltip>
        </div>
      ),
    }),
    [fetchData],
  )

  if (error) {
    throw error
  }

  return (
    <PageWrapper>
      {isLoading && !agents?.agents?.length && (
        <div className="mt-64">
          <LoadingIndicator />
        </div>
      )}

      {!!agents && (
        <>
          <BreadCrumbs />

          <div className="flex flex-row items-center gap-1 justify-end my-5">
            <Button color="light" onClick={() => setIsModalVisible(true)}>
              <AiOutlinePlusCircle className="mr-2 h-5 w-5" /> Add
            </Button>
          </div>

          {/* @TODO: make DataTable properly generic and remove this casting */}
          <DataTable
            data={agents.agents}
            columns={agentsColumns.concat(agentActionsColumn) as []}
            isSelectable={false}
          />

          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            pageSize={pageSize}
            onPageSizeChange={(size) => setPageSize(size)}
            totalCount={agents.num_items}
          />
        </>
      )}

      {(isModalVisible || !!selectedAgent) && (
        <Modal
          isVisible={isModalVisible || !!selectedAgent}
          title={selectedAgent ? 'Update agent' : 'Add new agent'}
          onClose={onCloseModal}
        >
          <Form
            formFields={agentFormFields}
            selectedResource={selectedAgent}
            onSubmit={(formValues) => {
              if (selectedAgent) {
                updateResource(formValues, selectedAgent.id, 'agents', fetchData)
              } else {
                createResource(formValues, 'agents', fetchData)
              }

              onCloseModal()
            }}
          />
        </Modal>
      )}
    </PageWrapper>
  )
}
