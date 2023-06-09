import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { Agent, AgentsQueryParams, ResourceResponse } from '../../models'
import { baseApi } from '../api'
import { QueryKey } from '../query-keys'
import { HTTPRequestMethod } from '../api.model'

export async function fetchAgents(queryParams: AgentsQueryParams): Promise<ResourceResponse> {
  const params = {
    page: queryParams.page,
    page_size: queryParams.pageSize,
  }
  return baseApi.get('/api/agents', { params }).then((res) => res.data)
}

export const useFetchAgents = (queryParams: AgentsQueryParams) =>
  useQuery([QueryKey.AGENTS, queryParams.page, queryParams.pageSize], () => fetchAgents(queryParams))

interface MutateResourceConfig<T> {
  method: HTTPRequestMethod
  url: string
  body: T
}

async function mutateResource<T, R>(config: MutateResourceConfig<T>): Promise<R> {
  const { method, url, body } = config
  return baseApi[method]<T, AxiosResponse<R>>(url, body).then((res) => res.data)
}

export function createAgent(agent: Omit<Agent, 'id'>) {
  return mutateResource<Omit<Agent, 'id'>, Agent>({ method: HTTPRequestMethod.POST, url: '/api/agents', body: agent })
}

export function updateAgent(agent: Agent) {
  // should be PATCH method...
  return mutateResource<Agent, Agent>({ method: HTTPRequestMethod.PUT, url: `/api/agents/${agent.id}`, body: agent })
}
