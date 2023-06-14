import { useQuery } from 'react-query'
import { Device, DevicesQueryParams, ResourceResponse } from '../../models'
import { QueryKey } from '../query-keys'
import { baseApi } from '../api'
import { mutateResource } from '../helpers'
import { HTTPRequestMethod } from '../api.model'

async function fetchDevice(deviceId?: string): Promise<Device> {
  return baseApi.get(`/api/devices/${deviceId}`).then((res) => res.data)
}

export const useFetchDevice = (deviceId?: string) =>
  useQuery([QueryKey.DEVICE, deviceId], () => fetchDevice(deviceId), { enabled: !!deviceId })

async function fetchDevices(queryParams: DevicesQueryParams): Promise<ResourceResponse<Device>> {
  const params = {
    page: queryParams.page,
    page_size: queryParams.pageSize,
  }
  return baseApi.get('/api/devices', { params }).then((res) => res.data)
}

export const useFetchDevices = (queryParams: DevicesQueryParams) =>
  useQuery([QueryKey.DEVICES, queryParams.page, queryParams.pageSize], () => fetchDevices(queryParams))

export function createDevice(device: Omit<Device, 'id'>): Promise<Device> {
  return mutateResource<Omit<Device, 'id'>, Device>({
    method: HTTPRequestMethod.POST,
    url: `/api/devices`,
    body: device,
  })
}

export function updateDevice(device: Device): Promise<Device> {
  return mutateResource<Device, Device>({
    method: HTTPRequestMethod.PUT,
    url: `/api/devices/${device.id}`,
    body: device,
  })
}

export function deleteDevice(deviceId: string): Promise<Device> {
  return mutateResource<undefined, Device>({ method: HTTPRequestMethod.DELETE, url: `/api/devices/${deviceId}` })
}
