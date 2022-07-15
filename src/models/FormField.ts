export type FormField = {
  [key: string]: string | boolean
  name: string
  label: string
  initialValue: string
  type: 'TEXT' | 'AGENT_SELECT'
  required: boolean
  validation: string
}
