import React from 'react'
import { AiOutlineWifi } from 'react-icons/ai'

export const NoConnection = () => {
  return (
    <div className="w-screen h-screen m-auto flex flex-col items-center justify-center">
      <AiOutlineWifi className="mb-2 h-10 w-10" />

      <h1>No connection</h1>

      <h4>Please connect to a Wi-Fi network to continue</h4>
    </div>
  )
}
