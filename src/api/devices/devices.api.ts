import { useQuery } from 'react-query'
import { Device, DevicesQueryParams, ResourceResponse } from '../../models'
import { QueryKey } from '../query-keys'
import { baseApi } from '../api'
import { mutateResource } from '../helpers'
import { HTTPRequestMethod } from '../api.model'
import { mockedDevices } from './mocked-devices'

async function fetchDevice(deviceId?: string): Promise<Device> {
  return baseApi.get(`/api/devices/${deviceId}`).then((res) => res.data)
}

export const useFetchDevice = (deviceId?: string) =>
  useQuery([QueryKey.DEVICE, { deviceId }], () => fetchDevice(deviceId), { enabled: !!deviceId })

async function fetchDevices(queryParams?: DevicesQueryParams): Promise<ResourceResponse<Device>> {
  const params = {
    page: queryParams?.page,
    page_size: queryParams?.pageSize,
    types: queryParams?.types,
    status: queryParams?.status,
    search: queryParams?.search,
  }
  return baseApi.get('/api/devices', { params }).then((res) => mockedDevices)
}

export const useFetchDevices = (queryParams?: DevicesQueryParams) =>
  useQuery(
    [
      QueryKey.DEVICES,
      {
        page: queryParams?.page,
        pageSize: queryParams?.pageSize,
        types: queryParams?.types,
        status: queryParams?.status,
        search: queryParams?.search,
      },
    ],
    () => fetchDevices(queryParams),
  )

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

export function startDevice(deviceId: string): Promise<unknown> {
  return mutateResource<undefined, Device>({ method: HTTPRequestMethod.PUT, url: `/api/devices/${deviceId}/start` })
}

export function stopDevice(deviceId: string): Promise<unknown> {
  return mutateResource<undefined, Device>({ method: HTTPRequestMethod.PUT, url: `/api/devices/${deviceId}/stop` })
}
