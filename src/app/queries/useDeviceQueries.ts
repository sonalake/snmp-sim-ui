import { useQuery } from '@tanstack/react-query';
import { SortingState } from '@tanstack/react-table';

import { API_ROOT, DeviceStatus, HTTPRequestMethod } from 'app/constants';
import { Device, ListResponse } from 'app/types';

import { BASE_API, QUERY_KEYS } from './constants';
import { mutateResource } from './utils';

export const DEVICES_API_ROOT = `${API_ROOT}/devices`;

export interface FetchDevicesQueryParams {
  page: number;
  pageSize: number;
  search: string;
  sorting: SortingState;
  status: DeviceStatus;
  types: string[];
}

export const useFetchDevices = (queryParams?: FetchDevicesQueryParams) => {
  const params = {
    page: queryParams?.page,
    page_size: queryParams?.pageSize,
    search: queryParams?.search,
    status: queryParams?.status,
    types: queryParams?.types,
    sort: queryParams?.sorting[0]?.id,
    sortDir: queryParams?.sorting[0] && (queryParams.sorting[0].desc ? 'DESC' : 'ASC')
  };

  return useQuery({
    queryKey: [QUERY_KEYS.DEVICES, params],
    queryFn: () =>
      BASE_API.get<ListResponse<Device>>(DEVICES_API_ROOT, { params }).then(res => res.data)
  });
};

export interface FetchDeviceQueryParams {
  id?: string;
}

export const useFetchDevice = ({ id }: FetchDeviceQueryParams) =>
  useQuery({
    queryKey: [QUERY_KEYS.DEVICE, { id }],
    queryFn: () => BASE_API.get<Device>(`${DEVICES_API_ROOT}/${id}`).then(res => res.data),
    enabled: !!id
  });

export const createDevice = (device: Omit<Device, 'id'>): Promise<Device> =>
  mutateResource<Omit<Device, 'id'>, Device>({
    method: HTTPRequestMethod.POST,
    url: DEVICES_API_ROOT,
    body: device
  });

export function updateDevice(device: Device): Promise<Device> {
  return mutateResource<Device, Device>({
    method: HTTPRequestMethod.PUT,
    url: `/${DEVICES_API_ROOT}/${device.id}`,
    body: device
  });
}

export function deleteDevice(id: string): Promise<Device> {
  return mutateResource<undefined, Device>({
    method: HTTPRequestMethod.DELETE,
    url: `/${DEVICES_API_ROOT}/${id}`
  });
}

export function startDevice(id: string): Promise<unknown> {
  return mutateResource<undefined, Device>({
    method: HTTPRequestMethod.PUT,
    url: `/${DEVICES_API_ROOT}/${id}/start`
  });
}

export function stopDevice(id: string): Promise<unknown> {
  return mutateResource<undefined, Device>({
    method: HTTPRequestMethod.PUT,
    url: `/${DEVICES_API_ROOT}/${id}/stop`
  });
}
