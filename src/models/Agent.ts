export interface Agent {
  [key: string]: string
  id: string
  name: string
  description: string
  snmp_data_url: string
}

export interface AgentsQueryParams {
  page: number
  pageSize: number
}
