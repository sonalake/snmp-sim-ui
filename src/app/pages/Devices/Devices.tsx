import { ChangeEvent, useEffect, useState } from 'react';
import { HiPlus, HiStop } from 'react-icons/hi';
import { HiPlay } from 'react-icons/hi2';
import { Button, DarkThemeToggle, TextInput } from 'flowbite-react';

import { useFetchDevices } from 'app/api/devices.api';
import {
  ButtonIcon,
  DataTableWithPatination,
  LoadingIndicator,
  PageProps,
  PageWrapper
} from 'app/components';
import { DeviceStatus, PAGINATION_DEFAULT_PAGE_SIZE_OPTION, ViewState } from 'app/constants';
import { useDebounce } from 'app/hooks';
import { Device, DevicesQueryParams } from 'app/types';

import { DeviceCard } from './DeviceCard';
import { devicesColumns } from './devicesColumns';
import { DevicesSidebarContent } from './DevicesSidebar';
import { DevicesViewToggle } from './DevicesViewToggle';

export const Devices = () => {
  const [viewState, changeViewState] = useState<ViewState>(ViewState.LIST);
  const [searchValue, setSearchValue] = useState<string>('');
  const [deviceQueryParams, setDeviceQueryParams] = useState<DevicesQueryParams>({
    page: 1,
    pageSize: PAGINATION_DEFAULT_PAGE_SIZE_OPTION,
    types: [],
    status: DeviceStatus.ALL,
    search: ''
  });

  const debouncedSearchValue = useDebounce(searchValue);

  const { data: devices, isLoading } = useFetchDevices(deviceQueryParams);

  const handlePaginationChange = (pageProps: PageProps) =>
    setDeviceQueryParams(query => ({
      ...query,
      ...pageProps
    }));

  const handleSelectionChange = (types: string[]) =>
    setDeviceQueryParams(query => ({
      ...query,
      types
    }));

  const handleStatusSelect = (deviceStatus: DeviceStatus) =>
    setDeviceQueryParams(params => ({
      ...params,
      status: deviceStatus
    }));

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value);

  const handleStateChange = (state: ViewState) => changeViewState(state);

  useEffect(() => {
    if (debouncedSearchValue !== deviceQueryParams.search && debouncedSearchValue !== undefined) {
      setDeviceQueryParams(query => ({ ...query, search: debouncedSearchValue }));
    }
  }, [debouncedSearchValue, deviceQueryParams.search]);

  return (
    <PageWrapper
      withSidebar={true}
      sidebarContent={
        <DevicesSidebarContent
          onSelectionChange={handleSelectionChange}
          onStatusSelect={handleStatusSelect}
        />
      }
    >
      <>
        <div className='flex items-center justify-between gap-4 mb-10'>
          <div className='grow max-w-[520px]'>
            <TextInput
              className='w-auto'
              placeholder='Search devices'
              value={debouncedSearchValue}
              onChange={handleSearchChange}
              disabled={isLoading}
            />
          </div>
          <div className='flex items-center gap-2 justify-between'>
            <Button className='bg-primary-700 dark:bg-primary-700 text-white' disabled={isLoading}>
              <ButtonIcon as={HiPlus} />
              Add device
            </Button>
            <Button
              color='gray'
              className='text-gray-800 dark:text-gray-400 dark:bg-gray-800'
              disabled={isLoading}
            >
              <ButtonIcon as={HiPlay} />
              Start all
            </Button>
            <Button
              color='gray'
              className='text-gray-800 dark:text-gray-400 dark:bg-gray-800'
              disabled={isLoading}
            >
              <ButtonIcon as={HiStop} />
              Stop all
            </Button>
          </div>
          <div className='flex items-center'>
            <DarkThemeToggle />
            <DevicesViewToggle viewState={viewState} changeViewState={handleStateChange} />
          </div>
        </div>

        {isLoading && (
          <div className='mt-64'>
            <LoadingIndicator />
          </div>
        )}
        {!isLoading && !!devices && (
          <>
            {viewState === ViewState.LIST ? (
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
              <div className='grid gap-4 grid-cols-[repeat(auto-fit,_minmax(270px,300px))] items-start content-start self-stretch'>
                {devices.items.map(device => (
                  <DeviceCard key={device.id} device={device} />
                ))}
              </div>
            )}
          </>
        )}
      </>
    </PageWrapper>
  );
};
