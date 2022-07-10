export type FormField = {
  [key: string]: string | boolean
  name: string
  label: string
  initialValue: string
  type: 'TEXT'
  required: boolean
  validation: string
}
