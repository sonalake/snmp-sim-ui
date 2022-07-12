import { ColumnDef, Row } from '@tanstack/react-table'
import { Button, Tooltip } from 'flowbite-react'
import React, { useCallback, useMemo, useState } from 'react'
import {
  AiOutlineCaretRight,
  AiOutlineClose,
  AiOutlinePause,
  AiOutlinePlusCircle,
  AiOutlineReload,
  AiOutlineTool,
} from 'react-icons/ai'
import { toast } from 'react-toastify'
import { Alert, BreadCrumbs, DataTable, Form, LoadingIndicator, Modal, PageWrapper, Pagination } from '../../components'
import { createResource } from '../../components/DataTable/tableColumns/createResource'
import { deleteResource } from '../../components/DataTable/tableColumns/deleteResource'
import { devicesColumns } from '../../components/DataTable/tableColumns/devicesColumns'
import { deviceFormFields } from '../../components/Form/formFields'
import { PAGINATION_DEFAULT_PAGE_SIZE_OPTION } from '../../constants'
import { useFetch } from '../../hooks'
import { Device, DeviceResponse } from '../../models'

export const Devices = () => {
  const [selectedDevices, setSelectedDevices] = useState<Array<Row<Device>>>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGINATION_DEFAULT_PAGE_SIZE_OPTION)
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

  const devicesActionsColumn: ColumnDef<Device> = useMemo(
    () => ({
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex flex-row">
          <Tooltip content="Start device">
            <AiOutlineCaretRight
              className="mr-2 h-5 w-5 cursor-pointer"
              onClick={() => toast(<Alert color="success" message="Device started! - to be implemented" />)}
            />
          </Tooltip>

          <Tooltip content="Stop running device">
            <AiOutlinePause
              className="mr-2 h-5 w-5 cursor-pointer"
              onClick={() => toast(<Alert color="success" message="Device stopped! - to be implemented" />)}
            />
          </Tooltip>

          <Tooltip content="Delete device">
            <AiOutlineClose
              className="mr-2 h-5 w-5 cursor-pointer"
              onClick={() => confirm('Delete device?') && deleteResource(row.original?.id, 'device', fetchData)}
            />
          </Tooltip>

          <Tooltip content="Modify device">
            <AiOutlineTool
              className="mr-2 h-5 w-5 cursor-pointer"
              onClick={() => toast(<Alert color="success" message="Device modified! - to be implemented" />)}
            />
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
            columns={devicesColumns.concat(devicesActionsColumn) as []}
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
              onSubmit={(formValues) => {
                createResource(formValues, 'devices', fetchData)
                setIsModalVisible(false)
              }}
            />
          </Modal>
        </>
      )}
    </PageWrapper>
  )
}
