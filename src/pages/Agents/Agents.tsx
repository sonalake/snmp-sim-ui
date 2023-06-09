import { ColumnDef, Row } from '@tanstack/react-table'
import { Button, Tooltip } from 'flowbite-react'
import React, { useCallback, useMemo, useState } from 'react'
import { HiOutlinePencil, HiPlusCircle, HiTrash } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { Alert, DataTable, Form, LoadingIndicator, Modal, PageProps, PageWrapper, Pagination } from '../../components'
import { agentsColumns } from '../../components/DataTable/tableColumns/agentsColumns'
import { handleResource } from '../../components/DataTable/tableColumns/handleResource'
import { agentFormFields, agentInitialValues } from '../../components/Form/formFields'
import { Agent, AgentsQueryParams } from '../../models'
import { useFetchAgents } from '../../api/agents/agents.api'
import { PAGINATION_DEFAULT_PAGE_SIZE_OPTION } from '../../constants'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon'

const resource = 'agents'

export const Agents = () => {
  const [selectedAgents, setSelectedAgents] = useState<Array<Row<Agent>>>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent>()

  const [agentQueryParams, setAgentQueryParams] = useState<AgentsQueryParams>({
    page: 1,
    pageSize: PAGINATION_DEFAULT_PAGE_SIZE_OPTION,
  })

  const { data: agents, isLoading, refetch: refetchAgents } = useFetchAgents(agentQueryParams)

  const openModal = () => setIsModalOpen(true)

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedAgent(undefined)
  }, [])

  const handleSelectAgent = useCallback((agent: Agent) => {
    setSelectedAgent(agent)
    openModal()
  }, [])

  const handlePaginationChange = (pageProps: PageProps) => setAgentQueryParams(pageProps)

  const agentActionsColumn: ColumnDef<Agent> = useMemo(
    () => ({
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex flex-row">
          <Tooltip content="Update agent">
            <HiOutlinePencil className="mr-2 h-5 w-5 cursor-pointer" onClick={() => handleSelectAgent(row.original)} />
          </Tooltip>
        </div>
      ),
    }),
    [handleSelectAgent],
  )

  return (
    <PageWrapper>
      {isLoading && (
        <div className="mt-64">
          <LoadingIndicator />
        </div>
      )}

      {!!agents && (
        <>
          <PageTitle>Agents</PageTitle>

          <div className="flex items-center gap-1 justify-end mb-5">
            <Button color="info" onClick={openModal}>
              <ButtonIcon as={HiPlusCircle} />
              Add
            </Button>

            <Button
              color="failure"
              disabled={!selectedAgents.length}
              onClick={() =>
                confirm('Delete the selected agents? - to be implemented') &&
                toast(<Alert color="success" message={'The selected agents were deleted! - to be implemented'} />)
              }
            >
              <ButtonIcon as={HiTrash} />
              Delete
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
            onPaginationChange={handlePaginationChange}
            totalCount={agents.count}
            disabled={isLoading}
            pageProps={agentQueryParams}
          />
        </>
      )}

      <Modal isVisible={isModalOpen} title={selectedAgent ? 'Update agent' : 'Add new agent'} onClose={onCloseModal}>
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

            refetchAgents()
            onCloseModal()
          }}
        />
      </Modal>
    </PageWrapper>
  )
}
