import { useQuery } from '@tanstack/react-query';

import { Device, DevicesQueryParams, ResourceResponse } from 'app/models';

import { HTTPRequestMethod } from './api.model';
import { baseApi } from './baseApi';
import { mutateResource } from './helpers';
import { QueryKey } from './query-keys';

async function fetchDevice(deviceId?: string): Promise<Device> {
  return baseApi.get(`/api/devices/${deviceId}`).then(res => res.data);
}

export const useFetchDevice = (deviceId?: string) =>
  useQuery([QueryKey.DEVICE, { deviceId }], () => fetchDevice(deviceId), { enabled: !!deviceId });

export const useFetchDevices = (queryParams?: DevicesQueryParams) => {
  const params = {
    page: queryParams?.page,
    pageSize: queryParams?.pageSize,
    types: queryParams?.types,
    status: queryParams?.status,
    search: queryParams?.search
  };

  return useQuery({
    queryKey: [QueryKey.DEVICES, params],
    queryFn: () =>
      baseApi.get<ResourceResponse<Device>>('/api/devices', { params }).then(res => res.data)
  });
};

export function createDevice(device: Omit<Device, 'id'>): Promise<Device> {
  return mutateResource<Omit<Device, 'id'>, Device>({
    method: HTTPRequestMethod.POST,
    url: '/api/devices',
    body: device
  });
}

export function updateDevice(device: Device): Promise<Device> {
  return mutateResource<Device, Device>({
    method: HTTPRequestMethod.PUT,
    url: `/api/devices/${device.id}`,
    body: device
  });
}

export function deleteDevice(deviceId: string): Promise<Device> {
  return mutateResource<undefined, Device>({
    method: HTTPRequestMethod.DELETE,
    url: `/api/devices/${deviceId}`
  });
}

export function startDevice(deviceId: string): Promise<unknown> {
  return mutateResource<undefined, Device>({
    method: HTTPRequestMethod.PUT,
    url: `/api/devices/${deviceId}/start`
  });
}

export function stopDevice(deviceId: string): Promise<unknown> {
  return mutateResource<undefined, Device>({
    method: HTTPRequestMethod.PUT,
    url: `/api/devices/${deviceId}/stop`
  });
}
