import { useQuery } from 'react-query'
import { Device, DevicesQueryParams, ResourceResponse } from '../../models'
import { QueryKey } from '../query-keys'
import { baseApi } from '../api'
import { mutateResource } from '../helpers'
import { HTTPRequestMethod } from '../api.model'

async function fetchDevices(queryParams: DevicesQueryParams): Promise<ResourceResponse> {
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
