import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { HiPlus, HiStop } from 'react-icons/hi';
import { HiPlay } from 'react-icons/hi2';
import { SortingState } from '@tanstack/react-table';
import { Button, DarkThemeToggle, TextInput } from 'flowbite-react';

import {
  ButtonIcon,
  DataTableWithPatination,
  LoadingIndicator,
  PageProps,
  PageWrapper
} from 'app/components';
import { DeviceStatus, PAGINATION_DEFAULT_PAGE_SIZE_OPTION, ViewState } from 'app/constants';
import { useDebounce } from 'app/hooks';
import { FetchDevicesQueryParams, useFetchDevices } from 'app/queries/useDeviceQueries';
import { Device } from 'app/types';

import { DeviceCard } from './DeviceCard';
import { devicesColumns } from './devicesColumns';
import { DevicesSidebarContent } from './DevicesSidebar';
import { DevicesViewToggle } from './DevicesViewToggle';

export const Devices = () => {
  const [viewState, changeViewState] = useState<ViewState>(ViewState.LIST);
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortingState, setSortingState] = useState<SortingState>([]);
  const [deviceQueryParams, setDeviceQueryParams] = useState<FetchDevicesQueryParams>({
    page: 1,
    pageSize: PAGINATION_DEFAULT_PAGE_SIZE_OPTION,
    sorting: [],
    search: '',
    status: DeviceStatus.ALL,
    types: []
  });

  const { data: devices, isLoading } = useFetchDevices(deviceQueryParams);

  const handlePaginationChange = (pageProps: PageProps) =>
    setDeviceQueryParams(query => ({
      ...query,
      ...pageProps
    }));

  const handleSortingChange = (newState: SetStateAction<SortingState>) => setSortingState(newState);

  useEffect(() => {
    setDeviceQueryParams(query => ({
      ...query,
      sorting: sortingState
    }));
  }, [sortingState]);

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

  const debouncedRequest = useDebounce(() => {
    setDeviceQueryParams(query => ({ ...query, search: searchValue }));
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    debouncedRequest();
  };

  const handleStateChange = (state: ViewState) => changeViewState(state);

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
              data-testid='devices-search'
              className='w-auto'
              placeholder='Search devices'
              value={searchValue}
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
                columns={devicesColumns}
                disabled={isLoading}
                isSelectable={false}
                items={devices.items}
                pageProps={deviceQueryParams}
                sortingState={sortingState}
                totalCount={devices.count}
                onPaginationChange={handlePaginationChange}
                onSortingChange={handleSortingChange}
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
