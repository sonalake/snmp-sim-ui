import { ColumnDef, Row } from '@tanstack/react-table'
import { Button, Tooltip } from 'flowbite-react'
import React, { useCallback, useMemo, useState } from 'react'
import { HiOutlinePencil, HiPlay, HiPlusCircle, HiStop, HiTrash } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { Alert, DataTable, LoadingIndicator, PageProps, PageWrapper, Pagination } from '../../components'
import { devicesColumns } from '../../components/DataTable/tableColumns/devicesColumns'
import { PAGINATION_DEFAULT_PAGE_SIZE_OPTION } from '../../constants'
import { Device, DevicesQueryParams } from '../../models'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon'
import { useFetchDevices } from '../../api/devices/devices.api'
import { useFetchAgents } from '../../api/agents/agents.api'
import { DevicesModal } from './DevicesModal'

export const Devices = () => {
  const [selectedDevices, setSelectedDevices] = useState<Array<Row<Device>>>([])
  const [selectedDevice, setSelectedDevice] = useState<Device>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)

  const [deviceQueryParams, setDeviceQueryParams] = useState<DevicesQueryParams>({
    page: 1,
    pageSize: PAGINATION_DEFAULT_PAGE_SIZE_OPTION,
  })
  const handlePaginationChange = (pageProps: PageProps) => setDeviceQueryParams(pageProps)

  const { data: agents, isLoading: isAgentsLoading } = useFetchAgents()
  const { data: devices, isLoading: isDevicesLoading } = useFetchDevices(deviceQueryParams)

  const isLoading = isAgentsLoading || isDevicesLoading
  const onCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedDevice(undefined)
  }, [])

  const handleSelectDevice = (device: Device) => {
    setSelectedDevice(device)
    openModal()
  }

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
            <ButtonIcon as={HiOutlinePencil} onClick={() => handleSelectDevice(row.original)} />
          </Tooltip>
        </div>
      ),
    }),
    [],
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
        {!!devices && (
          <>
            <PageTitle>Devices</PageTitle>

            <div className="flex items-center gap-1 justify-end mb-5">
              <Button color="info" onClick={() => openModal()}>
                <ButtonIcon as={HiPlusCircle} />
                Add
              </Button>

              <Button
                color="success"
                onClick={() =>
                  toast(
                    <Alert
                      color="success"
                      message={`${selectedDevices.length ? 'The selected devices were started!' : 'All devices were started!'
                        } - to be implemented`}
                    />,
                  )
                }
              >
                <ButtonIcon as={HiPlay} />
                Start
              </Button>

              <Button
                color="dark"
                onClick={() =>
                  toast(
                    <Alert
                      color="success"
                      message={`${selectedDevices.length ? 'The selected devices were stopped!' : 'All devices were stopped!'
                        } - to be implemented`}
                    />,
                  )
                }
              >
                <ButtonIcon as={HiStop} />
                Stop
              </Button>

              <Button
                color="failure"
                disabled={!selectedDevices.length}
                onClick={() =>
                  confirm('Delete the selected devices? - to be implemented') &&
                  toast(<Alert color="success" message={'The selected devices were deleted! - to be implemented'} />)
                }
              >
                <ButtonIcon as={HiTrash} />
                Delete
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
              onPaginationChange={handlePaginationChange}
              totalCount={devices.count}
              disabled={isLoading}
              pageProps={deviceQueryParams}
            />

            <DevicesModal isOpen={isModalOpen} onClose={onCloseModal} selectedDevice={selectedDevice} agents={agents} />
          </>
        )}
      </>
    </PageWrapper>
  )
}
