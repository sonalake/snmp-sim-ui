import { useQuery } from 'react-query'
import { DevicesQueryParams, ResourceResponse } from '../../models'
import { QueryKey } from '../query-keys'
import { baseApi } from '../api'

async function fetchDevices(queryParams: DevicesQueryParams): Promise<ResourceResponse> {
  const params = {
    page: queryParams.page,
    page_size: queryParams.pageSize,
  }
  return baseApi.get('/api/devices', { params }).then((res) => res.data)
}

export const useFetchDevices = (queryParams: DevicesQueryParams) =>
  useQuery([QueryKey.DEVICES, queryParams.page, queryParams.pageSize], () => fetchDevices(queryParams))
