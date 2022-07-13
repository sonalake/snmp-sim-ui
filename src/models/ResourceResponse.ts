import { Agent } from './Agent'
import { Device } from './Device'

export interface ResourceResponse {
  items: Agent[] | Device[]
  count: number
}
