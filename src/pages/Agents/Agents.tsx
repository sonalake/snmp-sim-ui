import { ColumnDef, Row } from '@tanstack/react-table'
import { Button, Tooltip } from 'flowbite-react'
import React, { useCallback, useMemo, useState } from 'react'
import { HiOutlinePencil, HiPlusCircle, HiTrash } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { Alert, DataTable, Form, LoadingIndicator, Modal, PageWrapper, Pagination } from '../../components'
import { agentsColumns } from '../../components/DataTable/tableColumns/agentsColumns'
import { handleResource } from '../../components/DataTable/tableColumns/handleResource'
import { agentFormFields, agentInitialValues } from '../../components/Form/formFields'
import { PAGINATION_DEFAULT_PAGE_SIZE_OPTION } from '../../constants'
import { useFetch } from '../../hooks'
import { Agent, ResourceResponse } from '../../models'

const resource = 'agents'

export const Agents = () => {
  const [selectedAgents, setSelectedAgents] = useState<Array<Row<Agent>>>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGINATION_DEFAULT_PAGE_SIZE_OPTION)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent>()

  const {
    resource: agents,
    isLoading,
    error,
    fetchData,
  } = useFetch<ResourceResponse>(`/api/agents?page=${currentPage}&page_size=${pageSize}`)

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
          <Tooltip content="Update agent">
            <HiOutlinePencil className="mr-2 h-5 w-5 cursor-pointer" onClick={() => setSelectedAgent(row.original)} />
          </Tooltip>
        </div>
      ),
    }),
    [],
  )

  if (error) {
    throw error
  }

  return (
    <PageWrapper>
      {isLoading && !agents?.items?.length && (
        <div className="mt-64">
          <LoadingIndicator />
        </div>
      )}

      {!!agents && (
        <>
          <h1 className="text-5xl font-semibold mb-7">Agents</h1>

          <div className="flex items-center gap-1 justify-end mb-5">
            <Button color="info" onClick={() => setIsModalVisible(true)}>
              <HiPlusCircle className="mr-2 h-5 w-5" /> Add
            </Button>

            <Button
              color="failure"
              disabled={!selectedAgents.length}
              onClick={() =>
                confirm('Delete the selected agents? - to be implemented') &&
                toast(<Alert color="success" message={'The selected agents were deleted! - to be implemented'} />)
              }
            >
              <HiTrash className="mr-2 h-5 w-5" /> Delete
            </Button>
          </div>

          {/* @TODO: make DataTable properly generic and remove this casting */}
          <DataTable
            data={agents.items}
            columns={agentsColumns.concat(agentActionsColumn) as []}
            onSelection={(selectedRows) => setSelectedAgents(selectedRows as Array<Row<Agent>>)}
            isSelectable
          />

          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            pageSize={pageSize}
            onPageSizeChange={(size) => setPageSize(size)}
            totalCount={agents.count}
            disabled={isLoading}
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
            initialValues={selectedAgent || agentInitialValues}
            onSubmit={async (formValues) => {
              if (selectedAgent) {
                await handleResource({
                  resource,
                  operation: 'put',
                  id: selectedAgent.id,
                  body: formValues,
                })
              } else {
                await handleResource({
                  resource,
                  operation: 'post',
                  body: formValues,
                })
              }

              fetchData()
              onCloseModal()
            }}
          />
        </Modal>
      )}
    </PageWrapper>
  )
}
