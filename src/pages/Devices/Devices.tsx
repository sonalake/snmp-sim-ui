import { Row } from '@tanstack/react-table'
import axios, { AxiosError } from 'axios'
import { Button } from 'flowbite-react'
import React, { useCallback, useState } from 'react'
import { AiOutlineCaretRight, AiOutlinePause, AiOutlinePlusCircle, AiOutlineReload } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { Alert, BreadCrumbs, DataTable, Form, LoadingIndicator, Modal, PageWrapper, Pagination } from '../../components'
import { devicesColumns } from '../../components/DataTable/tableColumns/devicesColumns'
import { deviceFormFields } from '../../components/Form/formFields'
import { PAGINATION_PAGE_SIZE_OPTIONS } from '../../constants'
import { useFetch } from '../../hooks'
import { Device, DeviceResponse } from '../../models'

export const Devices = () => {
  const [selectedDevices, setSelectedDevices] = useState<Array<Row<Device>>>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGINATION_PAGE_SIZE_OPTIONS[0])
  const [isModalVisible, setIsModalVisible] = useState(false)

  const {
    resource: devices,
    isLoading,
    error,
    fetchData,
  } = useFetch<DeviceResponse>(`/api/devices?page=${currentPage}&page_size=${pageSize}`)

  const onCloseModal = useCallback(() => {
    setIsModalVisible(false)
    fetchData()
  }, [fetchData])

  if (error) {
    throw error
  }

  return (
    <PageWrapper>
      {isLoading && !devices?.devices?.length && (
        <div className="mt-64">
          <LoadingIndicator />
        </div>
      )}

      {!!devices?.devices?.length && (
        <>
          <BreadCrumbs />

          <div className="flex flex-row items-center justify-end mt-5 mb-5">
            <div className="flex flex-row items-center gap-1">
              <Button color="light" onClick={() => setIsModalVisible(true)}>
                <AiOutlinePlusCircle className="mr-2 h-5 w-5" /> Add
              </Button>

              <Button
                color="light"
                onClick={() =>
                  toast(
                    <Alert
                      color="success"
                      message={`${
                        selectedDevices.length ? 'The selected devices were started!' : 'All devices were started!'
                      } - to be implemented`}
                    />,
                  )
                }
              >
                <AiOutlineCaretRight className="mr-2 h-5 w-5" />
                Start all
              </Button>

              <Button
                color="light"
                onClick={() =>
                  toast(
                    <Alert
                      color="success"
                      message={`${
                        selectedDevices.length ? 'The selected devices were stopped!' : 'All devices were stopped!'
                      } - to be implemented`}
                    />,
                  )
                }
              >
                <AiOutlinePause className="mr-2 h-5 w-5" /> Stop all
              </Button>

              <Button
                onClick={() => {
                  fetchData()

                  toast(<Alert color="info" message="Data refreshed!" />)
                }}
                color="light"
              >
                <AiOutlineReload className="mr-2 h-5 w-5" /> Refresh
              </Button>
            </div>
          </div>

          {/* @TODO: make DataTable properly generic and remove these castings */}
          <DataTable
            data={devices.devices}
            columns={devicesColumns as []}
            isSelectable
            onSelection={(selectedRows) => setSelectedDevices(selectedRows as [])}
          />

          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            pageSize={pageSize}
            onPageSizeChange={(size) => setPageSize(size)}
            totalCount={devices.num_items}
          />

          <Modal isVisible={isModalVisible} title="Add new device - to be implemented" onClose={onCloseModal}>
            <Form
              formFields={deviceFormFields}
              onSubmit={async (values: Partial<Device>) => {
                try {
                  await axios.post('/api/devices', values)

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
        </>
      )}
    </PageWrapper>
  )
}
