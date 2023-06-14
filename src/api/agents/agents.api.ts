import { useQuery } from 'react-query'
import { Agent, AgentsQueryParams, ResourceResponse } from '../../models'
import { baseApi } from '../api'
import { QueryKey } from '../query-keys'
import { HTTPRequestMethod } from '../api.model'
import { mutateResource } from '../helpers'

async function fetchAgent(agentId?: string): Promise<Agent> {
  return baseApi.get(`/api/agents/${agentId}`).then((res) => res.data)
}

export const useFetchAgent = (agentId?: string) =>
  useQuery([QueryKey.AGENT, agentId], () => fetchAgent(agentId), { enabled: !!agentId })

async function fetchAgents(queryParams?: AgentsQueryParams): Promise<ResourceResponse<Agent>> {
  const params = {
    page: queryParams?.page,
    page_size: queryParams?.pageSize,
  }
  return baseApi.get('/api/agents', { params }).then((res) => res.data)
}

export const useFetchAgents = (queryParams?: AgentsQueryParams) =>
  useQuery([QueryKey.AGENTS, queryParams?.page, queryParams?.pageSize], () => fetchAgents(queryParams))

export function createAgent(agent: Omit<Agent, 'id'>): Promise<Agent> {
  return mutateResource<Omit<Agent, 'id'>, Agent>({ method: HTTPRequestMethod.POST, url: '/api/agents', body: agent })
}

export function updateAgent(agent: Agent): Promise<Agent> {
  // should be PATCH method...
  return mutateResource<Agent, Agent>({ method: HTTPRequestMethod.PUT, url: `/api/agents/${agent.id}`, body: agent })
}

export function deleteAgent(agentId: string): Promise<Agent> {
  return mutateResource<undefined, Agent>({ method: HTTPRequestMethod.DELETE, url: `/api/agents/${agentId}` })
}
