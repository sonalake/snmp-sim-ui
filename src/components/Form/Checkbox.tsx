import React, { ChangeEvent, FC } from 'react'
import { CustomFlowbiteTheme, Checkbox as FlowbiteCheckbox } from 'flowbite-react'

interface CheckboxProps {
  id?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}
export const Checkbox: FC<CheckboxProps> = ({ id, onChange }) => {
  const customTheme: CustomFlowbiteTheme['checkbox'] = {
    root: {
      base: 'h-4 w-4 rounded border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 text-blue-600',
    },
  }

  return <FlowbiteCheckbox id={id} onChange={onChange} theme={customTheme} />
}
