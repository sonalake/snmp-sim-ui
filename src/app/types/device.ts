import { DeviceStatusType } from 'app/constants';

interface SNMP_V1 {
  community?: string;
}

interface SNMP_V2C {
  community?: string;
}

interface SNMP_V3 {
  authentication_password: string;
  encryption_key: string;
  authentication?: 'MD5' | 'SHA';
  encryption?: 'DES' | 'AES';
  user?: string;
}

type SNMPProtocolAttributes = {
  snmp_v1?: SNMP_V1;
  snmp_v2c?: SNMP_V2C;
  snmp_v3?: SNMP_V3;
};

export type SNMPVersion = keyof SNMPProtocolAttributes;

export interface Device {
  id: string;
  name: string;
  description: string;
  snmp_host: string;
  snmp_port: number;
  snmp_protocol_attributes: SNMPProtocolAttributes;
  type: string;
  status: DeviceStatusType;
}
