import { Button, DarkThemeToggle, TextInput } from 'flowbite-react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { HiPlay, HiPlus, HiStop } from 'react-icons/hi'
import { LoadingIndicator, PageProps, PageWrapper } from '../../components'
import { devicesColumns } from '../../components/DataTable/tableColumns/devicesColumns'
import { PAGINATION_DEFAULT_PAGE_SIZE_OPTION } from '../../constants'
import { Device, DeviceStatus, DevicesQueryParams } from '../../models'
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon'
import { useFetchDevices } from '../../api/devices/devices.api'
import { DataTableWithPatination } from '../../components/DataTableWithPagination/DataTableWithPagination'
import { DeviceTypeCheck } from '../../components/Sidebar/DeviceTypes'
import { useDebounce } from '../../hooks/useDebounce'
import { ViewToggle, ViewToggleState } from './ViewToggle'
import { DeviceCard } from './DeviceCard'

export const Devices = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [viewState, changeViewState] = useState<ViewToggleState>(ViewToggleState.LIST)

  const handleStateChange = (state: ViewToggleState) => changeViewState(state)

  const debouncedSearchValue = useDebounce(searchValue)

  const [deviceQueryParams, setDeviceQueryParams] = useState<DevicesQueryParams>({
    page: 1,
    pageSize: PAGINATION_DEFAULT_PAGE_SIZE_OPTION,
    types: [],
    status: DeviceStatus.ALL,
    search: '',
  })

  useEffect(() => {
    if (debouncedSearchValue !== deviceQueryParams.search && debouncedSearchValue !== undefined) {
      setDeviceQueryParams((query) => ({ ...query, search: debouncedSearchValue }))
    }
  }, [debouncedSearchValue])

  const handlePaginationChange = (pageProps: PageProps) => {
    setDeviceQueryParams((query) => ({
      ...query,
      ...pageProps,
    }))
  }

  const { data: devices, isLoading } = useFetchDevices(deviceQueryParams)

  const handleSelectedTypes = (payload: DeviceTypeCheck) => {
    const types = [...deviceQueryParams.types]
    if (payload.checked && !types.includes(payload.type)) {
      types.push(payload.type)
    } else if (!payload.checked && types.includes(payload.type)) {
      types.filter((type) => type !== payload.type)
    }
    setDeviceQueryParams((query) => ({
      ...query,
      types,
    }))
  }

  const handleSelectStatus = (deviceStatus: DeviceStatus) => {
    setDeviceQueryParams((params) => ({
      ...params,
      status: deviceStatus,
    }))
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)

  return (
    <PageWrapper
      handleSelectedTypes={handleSelectedTypes}
      handleSelectStatus={handleSelectStatus}
      activeStatus={deviceQueryParams.status}
    >
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
            <div className="flex items-center justify-between mb-5">
              <div>
                <TextInput
                  className="w-[520px]"
                  placeholder="Search devices"
                  value={debouncedSearchValue}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex items-center gap-2 justify-between">
                <Button className="bg-blue-700 dark:bg-blue-700 text-white">
                  <ButtonIcon as={HiPlus} />
                  Add device
                </Button>
                <Button color="gray">
                  <ButtonIcon as={HiPlay} />
                  Start all
                </Button>
                <Button color="gray">
                  <ButtonIcon as={HiStop} />
                  Stop all
                </Button>
              </div>
              <div className="flex items-center">
                <DarkThemeToggle />
                <ViewToggle viewState={viewState} changeViewState={handleStateChange} />
              </div>
            </div>

            {viewState === ViewToggleState.LIST ? (
              <DataTableWithPatination<Device>
                items={devices.items}
                columns={devicesColumns}
                isSelectable={false}
                handlePaginationChange={handlePaginationChange}
                totalCount={devices.count}
                disabled={isLoading}
                pageProps={deviceQueryParams}
              />
            ) : (
              <div className="flex flex-wrap items-start content-start gap-4 self-stretch">
                {devices.items.map((device) => (
                  <DeviceCard key={device.id} device={device} />
                ))}
              </div>
            )}
          </>
        )}
      </>
    </PageWrapper>
  )
}
