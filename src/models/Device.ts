interface SNMP_V1 {
  snmp_v1: {
    community?: string
  }
}

interface SNMP_V2C {
  snmp_v2c: {
    community?: string
  }
}

interface SNMP_V3 {
  snmp_v3: {
    authentication_password: string
    encryption_key: string
    authentication?: 'MD5' | string
    encryption?: 'DES' | string
    user?: string
  }
}

export interface Device {
  id: string
  name: string
  description: string
  agent: {
    id: string
    name?: string
    description?: string
    snmp_data_url?: string
  }
  snmp_host: string
  snmp_port: number
  snmp_protocol_attributes: SNMP_V1 | SNMP_V2C | SNMP_V3
}
