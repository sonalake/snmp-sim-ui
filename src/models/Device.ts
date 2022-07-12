import { Agent } from '.'

interface SNMP_V1 {
  snmp_v1: {
    community: string
  }
}

interface SNMP_V2C {
  snmp_v2c: {
    community: string
  }
}

interface SNMP_V3 {
  snmp_v3: {
    authentication: 'MD5' | string
    authentication_password: string
    encryption: 'DES' | string
    encryption_key: string
    user: string
  }
}

export interface Device {
  id: string
  name: string
  description: string
  agent: Agent
  agent_id?: string
  snmp_host: string
  snmp_port: number
  snmp_protocol_attributes: SNMP_V1 | SNMP_V2C | SNMP_V3
}
