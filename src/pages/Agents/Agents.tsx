import axios, { AxiosError } from 'axios'
import { Button } from 'flowbite-react'
import React, { useCallback, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { Alert, BreadCrumbs, DataTable, Form, LoadingIndicator, Modal, PageWrapper, Pagination } from '../../components'
import { agentFormFields } from '../../components/Form/formFields'
import { PAGINATION_PAGE_SIZE_OPTIONS } from '../../config/constants'
import { agentsColumns } from '../../config/tableColumns/agentsColumns'
import { useFetch } from '../../hooks'
import { Agent, AgentResponse } from '../../models'

export const Agents = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGINATION_PAGE_SIZE_OPTIONS[0])
  const [isModalVisible, setIsModalVisible] = useState(false)

  const {
    resource: agents,
    isLoading,
    error,
    fetchData,
  } = useFetch<AgentResponse>(`/api/agents?page=${currentPage}&page_size=${pageSize}`)

  const onCloseModal = useCallback(() => {
    setIsModalVisible(false)
    fetchData()
  }, [fetchData])

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
          <DataTable data={agents.agents} columns={agentsColumns as []} isSelectable={false} />

          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            pageSize={pageSize}
            onPageSizeChange={(size) => setPageSize(size)}
            totalCount={agents.num_items}
          />
        </>
      )}

      <Modal isVisible={isModalVisible} title="Add new agent" onClose={onCloseModal}>
        <Form
          formFields={agentFormFields}
          onSubmit={async (values: Partial<Agent>) => {
            try {
              await axios.post('/api/agents', values)

              toast(<Alert color="success" message="Agent created!" />)

              onCloseModal()
            } catch (err) {
              toast(
                <Alert
                  color="failure"
                  message={(err as Error)?.message}
                  additionalContent={
                    <>
                      <span>{(err as AxiosError).code}:</span>
                      <br />
                      <span>{(err as AxiosError<{ error: string }>)?.response?.data?.error}</span>
                    </>
                  }
                />,
              )
            }
          }}
        />
      </Modal>
    </PageWrapper>
  )
}
