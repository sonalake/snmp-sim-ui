import { Device } from '../../models/Device'

export const mockDevices: Device[] = [
  {
    id: '8879489',
    name: 'Device 1',
    type: 'OS Windows Server',
    description: 'Device 1 description',
    snmp_host: '192.168.104.14',
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
    type: 'Dell 5448',
    description: 'Device 2 description',
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

export const devicesMockedResponse = {
  count: 2,
  items: mockDevices,
}
