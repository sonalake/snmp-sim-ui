import { Device } from '../../../models/Device'

export const mockDevices: Device[] = [
  {
    id: '8879489',
    name: 'Device 1',
    description: 'Device 1 description',
    agent: {
      id: '1',
      name: 'Agent 1',
      description: 'Agent 1 description',
      snmp_data_url: '',
    },
    snmp_host: '192.168.104.15',
    snmp_port: 169,
    snmp_protocol_attributes: {
      snmp_v1: {
        community: '',
      },
      snmp_v2c: {
        community: '',
      },
      snmp_v3: {
        user: '',
        authentication: 'MD5',
        authentication_password: '',
        encryption: 'DES',
        encryption_key: '',
      },
    },
  },
  {
    id: '776539',
    name: 'Device 2',
    description: 'Device 2 description',
    agent: {
      id: '2',
      name: 'Agent 2',
      description: 'Agent 2 description',
      snmp_data_url: '',
    },
    snmp_host: '192.168.104.15',
    snmp_port: 170,
    snmp_protocol_attributes: {
      snmp_v3: {
        user: '',
        authentication: 'MD5',
        authentication_password: '',
        encryption: 'DES',
        encryption_key: '',
      },
    },
  },
]
