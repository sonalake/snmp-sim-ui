import { Agent, Device, FormField } from '../../models'

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
    required: true,
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

export const deviceFormFields: Record<
  keyof Pick<Device, 'name' | 'description' | 'snmp_host' | 'snmp_port'>,
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
    required: true,
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
}
