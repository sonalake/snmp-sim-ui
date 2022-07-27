export type FormField = {
  [key: string]: string | boolean
  name: string
  label: string
  type: 'TEXT' | 'AGENT_SELECT' | 'NUMBER'
  required: boolean
  validation: string
}
