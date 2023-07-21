interface SNMP_V1 {
  snmp_v1?: {
    community?: string;
  };
}

interface SNMP_V2C {
  snmp_v2c?: {
    community?: string;
  };
}

interface SNMP_V3 {
  snmp_v3?: {
    authentication_password: string;
    encryption_key: string;
    authentication?: 'MD5' | 'SHA';
    encryption?: 'DES' | 'AES';
    user?: string;
  };
}

type SNMPProtocolAttributes = SNMP_V1 & SNMP_V2C & SNMP_V3;

export type SMNPVersion = keyof SNMPProtocolAttributes;

export interface Device {
  [key: string]: string | number | SNMPProtocolAttributes;
  id: string;
  name: string;
  type: string;
  description: string;
  snmp_host: string;
  snmp_port: number;
  snmp_protocol_attributes: SNMPProtocolAttributes;
  status: 'running' | 'stopped';
}

export enum DeviceStatus {
  RUNNING = 'running',
  STOPPED = 'stopped',
  ALL = 'all'
}

export interface DevicesQueryParams {
  page: number;
  pageSize: number;
  types: string[];
  status: DeviceStatus;
  search: string;
}