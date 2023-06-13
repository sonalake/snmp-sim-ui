import { ColumnDef, Row } from '@tanstack/react-table'
import { Button, Tooltip } from 'flowbite-react'
import React, { useCallback, useMemo, useState } from 'react'
import { HiOutlinePencil, HiPlusCircle, HiTrash } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { Alert, DataTable, LoadingIndicator, PageProps, PageWrapper, Pagination } from '../../components'
import { agentsColumns } from '../../components/DataTable/tableColumns/agentsColumns'
import { Agent, AgentsQueryParams } from '../../models'
import { useFetchAgents } from '../../api/agents/agents.api'
import { PAGINATION_DEFAULT_PAGE_SIZE_OPTION } from '../../constants'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon'
import { AgentsModal } from './AgentsModal'

export const Agents = () => {
  const [selectedAgents, setSelectedAgents] = useState<Array<Row<Agent>>>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent>()

  const [agentQueryParams, setAgentQueryParams] = useState<AgentsQueryParams>({
    page: 1,
    pageSize: PAGINATION_DEFAULT_PAGE_SIZE_OPTION,
  })

  const { data: agents, isLoading } = useFetchAgents(agentQueryParams)

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
            <ButtonIcon as={HiOutlinePencil} onClick={() => handleSelectAgent(row.original)} />
          </Tooltip>
        </div>
      ),
    }),
    [handleSelectAgent],
  )

  return (
    <PageWrapper>
      <>
        {isLoading && (
          <div className="mt-64">
            <LoadingIndicator />
          </div>
        )}
      </>

      <>
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

            <DataTable
              data={agents.items}
              columns={agentsColumns.concat(agentActionsColumn)}
              onSelection={(selectedRows) => setSelectedAgents(selectedRows)}
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
      </>

      <AgentsModal isOpen={isModalOpen} onClose={onCloseModal} selectedAgent={selectedAgent} />
    </PageWrapper>
  )
}
