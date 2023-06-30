import { Device, FormField } from '../../models'

export const deviceInitialValues: Partial<Device> = {
  name: '',
  description: '',
  snmp_host: '',
  snmp_port: 0,
  snmp_protocol_attributes: {
    snmp_v1: { community: 'Public' },
  },
}

export const deviceFormFields: Record<
  keyof Pick<Device, 'name' | 'description' | 'snmp_host' | 'snmp_port'> | 'agent.id',
  FormField
> = {
  name: {
    label: 'Name',
    name: 'name',
    type: 'TEXT',
    required: true,
    validation: 'Please provide a name',
  },
  description: {
    label: 'Description',
    name: 'description',
    type: 'TEXT',
    required: false,
    validation: 'Please provide a description',
  },
  snmp_host: {
    label: 'SNMP host',
    name: 'snmp_host',
    type: 'TEXT',
    required: true,
    validation: 'Please provide an SNMP host',
  },
  snmp_port: {
    label: 'SNMP port',
    name: 'snmp_port',
    type: 'NUMBER',
    required: true,
    validation: 'Please provide an SNMP port',
  },
  'agent.id': {
    label: 'Agent',
    name: 'agent.id',
    type: 'AGENT_SELECT',
    required: true,
    validation: 'Please provide an agent',
  },
}

export const deviceSNMPFormFields: Record<
  | 'snmp_protocol_attributes.snmp_v1.community'
  | 'snmp_protocol_attributes.snmp_v2c.community'
  | 'snmp_protocol_attributes.snmp_v3.authentication_password'
  | 'snmp_protocol_attributes.snmp_v3.authentication'
  | 'snmp_protocol_attributes.snmp_v3.encryption_key'
  | 'snmp_protocol_attributes.snmp_v3.encryption'
  | 'snmp_protocol_attributes.snmp_v3.user',
  FormField
> = {
  'snmp_protocol_attributes.snmp_v1.community': {
    label: 'Community',
    name: 'snmp_protocol_attributes.snmp_v1.community',
    type: 'TEXT',
    required: false,
    validation: 'Please provide a community',
  },

  'snmp_protocol_attributes.snmp_v2c.community': {
    label: 'Community',
    name: 'snmp_protocol_attributes.snmp_v2c.community',
    type: 'TEXT',
    required: false,
    validation: 'Please provide a community',
  },

  'snmp_protocol_attributes.snmp_v3.authentication': {
    label: 'Authentication',
    name: 'snmp_protocol_attributes.snmp_v3.authentication',
    type: 'TEXT',
    required: false,
    validation: 'Please provide an authentication',
  },
  'snmp_protocol_attributes.snmp_v3.authentication_password': {
    label: 'Authentication password',
    name: 'snmp_protocol_attributes.snmp_v3.authentication_password',
    type: 'TEXT',
    required: true,
    validation: 'Please provide an authentication password',
  },
  'snmp_protocol_attributes.snmp_v3.encryption_key': {
    label: 'Encryption key',
    name: 'snmp_protocol_attributes.snmp_v3.encryption_key',
    type: 'TEXT',
    required: true,
    validation: 'Please provide an encryption key',
  },
  'snmp_protocol_attributes.snmp_v3.encryption': {
    label: 'Encryption',
    name: 'snmp_protocol_attributes.snmp_v3.encryption',
    type: 'TEXT',
    required: false,
    validation: 'Please provide an encryption',
  },
  'snmp_protocol_attributes.snmp_v3.user': {
    label: 'User',
    name: 'snmp_protocol_attributes.snmp_v3.user',
    type: 'TEXT',
    required: false,
    validation: 'Please provide a user',
  },
}
