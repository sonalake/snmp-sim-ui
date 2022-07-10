import { Agent } from './Agent'
import { Device } from './Device'

export interface AgentResponse {
  agents: Agent[]
  num_items: number
}

export interface DeviceResponse {
  devices: Device[]
  num_items: number
}
