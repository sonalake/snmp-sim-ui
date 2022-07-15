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
import { devicesColumns } from '../../components/DataTable/tableColumns/devicesColumns'
import { handleResource } from '../../components/DataTable/tableColumns/handleResource'
import { deviceFormFields } from '../../components/Form/formFields'
import { PAGINATION_DEFAULT_PAGE_SIZE_OPTION } from '../../constants'
import { useFetch } from '../../hooks'
import { Device, ResourceResponse } from '../../models'

const resource = 'devices'

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
  } = useFetch<ResourceResponse>(`/api/devices?page=${currentPage}&page_size=${pageSize}`)

  const onCloseModal = useCallback(() => {
    if (isModalVisible) {
      setIsModalVisible(false)
    }
  }, [isModalVisible])

  const devicesActionsColumn: ColumnDef<Device> = useMemo(
    () => ({
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex flex-row">
          {row.original.snmp_host !== '127.0.0.1' ? (
            <Tooltip content="Start device">
              <AiOutlineCaretRight
                className="mr-2 h-5 w-5 cursor-pointer"
                onClick={() => toast(<Alert color="success" message="Device started! - to be implemented" />)}
              />
            </Tooltip>
          ) : (
            <Tooltip content="Stop device">
              <AiOutlinePause
                className="mr-2 h-5 w-5 cursor-pointer"
                onClick={() => toast(<Alert color="success" message="Device stopped! - to be implemented" />)}
              />
            </Tooltip>
          )}

          <Tooltip content="Delete device">
            <AiOutlineClose
              className="mr-2 h-5 w-5 cursor-pointer"
              onClick={async () => {
                if (confirm('Delete device?')) {
                  await handleResource({
                    resource,
                    operation: 'delete',
                    id: row.original?.id,
                  })
                }

                fetchData()
              }}
            />
          </Tooltip>

          <Tooltip content="Update device">
            <AiOutlineTool
              className="mr-2 h-5 w-5 cursor-pointer"
              onClick={() => toast(<Alert color="success" message="Device updated! - to be implemented" />)}
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
      {isLoading && !devices?.items?.length && (
        <div className="mt-64">
          <LoadingIndicator />
        </div>
      )}

      {!!devices?.items?.length && (
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
            data={devices.items}
            columns={devicesColumns.concat(devicesActionsColumn) as []}
            isSelectable
            onSelection={(selectedRows) => setSelectedDevices(selectedRows as [])}
          />

          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            pageSize={pageSize}
            onPageSizeChange={(size) => setPageSize(size)}
            totalCount={devices.count}
            disabled={isLoading}
          />

          {isModalVisible && (
            <Modal
              isVisible={isModalVisible}
              title="Add new device (WIP - feature works, but 'snmp_protocol_attributes' is hardcoded)"
              onClose={onCloseModal}
            >
              <Form
                formFields={deviceFormFields}
                withRadio
                onSubmit={async (formValues) => {
                  const newDevice = {
                    ...formValues,
                    snmp_port: parseInt(formValues.snmp_port, 10),
                    snmp_protocol_attributes: { snmp_v1: { community: 'Public' } },
                  }

                  await handleResource({
                    resource,
                    operation: 'post',
                    body: newDevice,
                  })

                  fetchData()

                  onCloseModal()
                }}
              />
            </Modal>
          )}
        </>
      )}
    </PageWrapper>
  )
}
