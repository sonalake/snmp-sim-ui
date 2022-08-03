import { ColumnDef, Row } from '@tanstack/react-table'
import { Button, Tooltip } from 'flowbite-react'
import React, { useCallback, useMemo, useState } from 'react'
import { HiOutlinePencil, HiPlay, HiPlusCircle, HiStop, HiTrash } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { Alert, DataTable, Form, LoadingIndicator, Modal, PageWrapper, Pagination } from '../../components'
import { devicesColumns } from '../../components/DataTable/tableColumns/devicesColumns'
import { handleResource } from '../../components/DataTable/tableColumns/handleResource'
import { deviceFormFields, deviceInitialValues } from '../../components/Form/formFields'
import { PAGINATION_DEFAULT_PAGE_SIZE_OPTION } from '../../constants'
import { useFetch } from '../../hooks'
import { Device, ResourceResponse } from '../../models'

const resource = 'devices'

export const Devices = () => {
  const [selectedDevices, setSelectedDevices] = useState<Array<Row<Device>>>([])
  const [selectedDevice, setSelectedDevice] = useState<Device>()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGINATION_DEFAULT_PAGE_SIZE_OPTION)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const {
    resource: devices,
    isLoading,
    error,
    fetchData,
  } = useFetch<ResourceResponse>(`/api/devices?page=${currentPage}&page_size=${pageSize}`)
  const { resource: agents } = useFetch<ResourceResponse>(`/api/agents`)

  const onCloseModal = useCallback(() => {
    if (isModalVisible) {
      setIsModalVisible(false)
    } else if (selectedDevice) {
      setSelectedDevice(undefined)
    }
  }, [isModalVisible, selectedDevice])

  const devicesActionsColumn: ColumnDef<Device> = useMemo(
    () => ({
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex flex-row">
          {row.original.snmp_host !== '127.0.0.1' ? (
            <Tooltip content="Start device">
              <HiPlay
                className="mr-2 h-5 w-5 cursor-pointer text-green-700"
                onClick={() => toast(<Alert color="success" message="Device started! - to be implemented" />)}
              />
            </Tooltip>
          ) : (
            <Tooltip content="Stop device">
              <HiStop
                className="mr-2 h-5 w-5 cursor-pointer text-red-700"
                onClick={() => toast(<Alert color="success" message="Device stopped! - to be implemented" />)}
              />
            </Tooltip>
          )}

          <Tooltip content="Update device">
            <HiOutlinePencil className="mr-2 h-5 w-5 cursor-pointer" onClick={() => setSelectedDevice(row.original)} />
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
      {isLoading && !devices?.items?.length && (
        <div className="mt-64">
          <LoadingIndicator />
        </div>
      )}

      {!!devices && (
        <>
          <h1 className="text-5xl font-semibold mb-7">Devices</h1>

          <div className="flex items-center gap-1 justify-end mb-5">
            <Button color="info" onClick={() => setIsModalVisible(true)}>
              <HiPlusCircle className="mr-2 h-5 w-5" /> Add
            </Button>

            <Button
              color="success"
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
              <HiPlay className="mr-2 h-5 w-5" />
              Start
            </Button>

            <Button
              color="dark"
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
              <HiStop className="mr-2 h-5 w-5" /> Stop
            </Button>

            <Button
              color="failure"
              disabled={!selectedDevices.length}
              onClick={() =>
                confirm('Delete the selected devices? - to be implemented') &&
                toast(<Alert color="success" message={'The selected devices were deleted! - to be implemented'} />)
              }
            >
              <HiTrash className="mr-2 h-5 w-5" /> Delete
            </Button>
          </div>

          {/* @TODO: make DataTable properly generic and remove these castings */}
          <DataTable
            data={devices.items}
            columns={devicesColumns.concat(devicesActionsColumn) as Array<Row<Device>>}
            isSelectable
            onSelection={(selectedRows) => setSelectedDevices(selectedRows as Array<Row<Device>>)}
          />

          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            pageSize={pageSize}
            onPageSizeChange={(size) => setPageSize(size)}
            totalCount={devices.count}
            disabled={isLoading}
          />

          {(isModalVisible || !!selectedDevice) && agents?.items?.length && (
            <Modal
              isVisible={isModalVisible || !!selectedDevice}
              title={selectedDevice ? 'Update device' : 'Add new device'}
              onClose={onCloseModal}
            >
              <Form
                formFields={deviceFormFields}
                initialValues={
                  selectedDevice || {
                    ...deviceInitialValues,
                    agent: { id: agents.items[0].id },
                  }
                }
                snmpInputs
                onSubmit={async (formValues) => {
                  if (selectedDevice) {
                    await handleResource({
                      resource,
                      operation: 'put',
                      id: selectedDevice.id,
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
        </>
      )}
    </PageWrapper>
  )
}
