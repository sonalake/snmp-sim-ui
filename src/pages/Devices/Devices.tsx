import { ColumnDef, Row } from '@tanstack/react-table'
import { Button, Tooltip } from 'flowbite-react'
import React, { useCallback, useMemo, useState } from 'react'
import { HiOutlinePencil, HiPlay, HiPlusCircle, HiStop, HiTrash } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from 'react-query'
import { Alert, LoadingIndicator, PageProps, PageWrapper } from '../../components'
import { devicesColumns } from '../../components/DataTable/tableColumns/devicesColumns'
import { LOCALHOST, PAGINATION_DEFAULT_PAGE_SIZE_OPTION } from '../../constants'
import { Device, DevicesQueryParams } from '../../models'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon'
import { startDevice, stopDevice, useFetchDevices } from '../../api/devices/devices.api'
import { useFetchAgents } from '../../api/agents/agents.api'
import { DataTableWithPatination } from '../../components/DataTableWithPagination/DataTableWithPagination'
import { successToast } from '../../components/Toasts/toasts'
import { QueryKey } from '../../api/query-keys'
import { DevicesModal } from './DevicesModal'

export const Devices = () => {
  const [selectedDevices, setSelectedDevices] = useState<Array<Row<Device>>>([])
  const [selectedDevice, setSelectedDevice] = useState<Device>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryCache = useQueryClient()

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

  const refetchDevices = async () => await queryCache.invalidateQueries({ queryKey: [QueryKey.DEVICES] })

  const { mutateAsync: start } = useMutation({
    mutationFn: (deviceId: string) => startDevice(deviceId),
    onSuccess: async () => {
      successToast('Device started!')
      await refetchDevices()
    },
  })

  const { mutateAsync: stop } = useMutation({
    mutationFn: (deviceId: string) => stopDevice(deviceId),
    onSuccess: async () => {
      successToast('Device stopped!')
      await refetchDevices()
    },
  })

  const handleStartDevice = (deviceId: string) => start(deviceId)
  const handleStopDevice = (deviceId: string) => stop(deviceId)

  const devicesActionsColumn: ColumnDef<Device> = useMemo(
    () => ({
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex flex-row">
          {row.original.snmp_host !== LOCALHOST ? (
            <Tooltip content="Start device">
              <ButtonIcon as={HiPlay} className="text-green-700" onClick={() => handleStartDevice(row.original.id)} />
            </Tooltip>
          ) : (
            <Tooltip content="Stop device">
              <ButtonIcon as={HiStop} className="text-red-700" onClick={() => handleStopDevice(row.original.id)} />
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
              <Button color="info" onClick={openModal}>
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

            <DataTableWithPatination<Device>
              items={devices.items}
              columns={devicesColumns.concat(devicesActionsColumn)}
              handleSelectItems={setSelectedDevices}
              isSelectable
              handlePaginationChange={handlePaginationChange}
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
