import React from 'react'
import { Spinner } from 'flowbite-react'

export const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Spinner size="xl" aria-label="Default status example" />
    </div>
  )
}
