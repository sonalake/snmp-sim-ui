import { Agent, Device, FormField } from '../../models'

export const deviceFormFields: Record<
  keyof Pick<Device, 'name' | 'description' | 'snmp_host' | 'snmp_port'> & Pick<Agent, 'id'>,
  FormField
> = {
  name: {
    label: 'Name',
    name: 'name',
    initialValue: '',
    type: 'TEXT',
    required: true,
    validation: 'Please provide a name',
  },
  description: {
    label: 'Description',
    name: 'description',
    initialValue: '',
    type: 'TEXT',
    required: false,
    validation: 'Please provide a description',
  },
  snmp_host: {
    label: 'SNMP host',
    name: 'snmp_host',
    initialValue: '',
    type: 'TEXT',
    required: true,
    validation: 'Please provide an SNMP host',
  },
  snmp_port: {
    label: 'SNMP port',
    name: 'snmp_port',
    initialValue: '',
    type: 'TEXT',
    required: true,
    validation: 'Please provide an SNMP port',
  },
  'agent.id': {
    label: 'Agent',
    name: 'agent.id',
    initialValue: '',
    type: 'AGENT_SELECT',
    required: true,
    validation: 'Please provide an agent',
  },
}
export const SNMP_V1_FormField: Record<
  keyof Pick<Device, 'name' | 'description' | 'snmp_host' | 'snmp_port'> & Pick<Agent, 'id'>,
  FormField
> = {
  'snmp_protocol_attributes.snmp_v1.community': {
    label: 'Community',
    name: 'snmp_protocol_attributes.snmp_v1.community',
    initialValue: '',
    type: 'TEXT',
    required: false,
    validation: 'Please provide a community',
  },
}
export const SNMP_V2C_FormField: Record<
  keyof Pick<Device, 'name' | 'description' | 'snmp_host' | 'snmp_port'> & Pick<Agent, 'id'>,
  FormField
> = {
  'snmp_protocol_attributes.snmp_v2c.community': {
    label: 'Community',
    name: 'snmp_protocol_attributes.snmp_v2c.community',
    initialValue: '',
    type: 'TEXT',
    required: false,
    validation: 'Please provide a community',
  },
}
export const SNMP_V3_FormField: Record<
  keyof Pick<Device, 'name' | 'description' | 'snmp_host' | 'snmp_port'> & Pick<Agent, 'id'>,
  FormField
> = {
  'snmp_protocol_attributes.snmp_v3.authentication_password': {
    label: 'Authentication password',
    name: 'snmp_protocol_attributes.snmp_v3.authentication_password',
    initialValue: '',
    type: 'TEXT',
    required: true,
    validation: 'Please provide an authentication password',
  },
  'snmp_protocol_attributes.snmp_v3.encryption_key': {
    label: 'Encryption key',
    name: 'snmp_protocol_attributes.snmp_v3.encryption_key',
    initialValue: '',
    type: 'TEXT',
    required: true,
    validation: 'Please provide an encryption key',
  },
}

export const agentFormFields: Record<keyof Pick<Agent, 'name' | 'description' | 'snmp_data_url'>, FormField> = {
  name: {
    label: 'Name',
    name: 'name',
    initialValue: '',
    type: 'TEXT',
    required: true,
    validation: 'Please provide a name',
  },
  description: {
    label: 'Description',
    name: 'description',
    initialValue: '',
    type: 'TEXT',
    required: false,
    validation: 'Please provide a description',
  },
  snmp_data_url: {
    label: 'SNMP data URL',
    name: 'snmp_data_url',
    initialValue: '',
    type: 'TEXT',
    required: true,
    validation: 'Please provide an SNMP data URL',
  },
}
