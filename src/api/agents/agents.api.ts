import { useQuery } from 'react-query'
import { AgentsQueryParams, ResourceResponse } from '../../models'
import { baseApi } from '../api'
import { QueryKey } from '../query-keys'

export async function fetchAgents(queryParams: AgentsQueryParams): Promise<ResourceResponse> {
  const params = {
    page: queryParams.page,
    page_size: queryParams.pageSize,
  }
  return baseApi.get('/api/agents', { params }).then((res) => res.data)
}

export const useFetchAgents = (queryParams: AgentsQueryParams) =>
  useQuery([QueryKey.AGENTS, queryParams.page, queryParams.pageSize], () => fetchAgents(queryParams))
