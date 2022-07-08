import React from 'react'
import { AiOutlineWifi } from 'react-icons/ai'

export const NoConnection = () => (
  <div className="w-screen h-screen m-auto flex flex-col items-center justify-center">
    <AiOutlineWifi className="w-24 h-24 mb-4 text-gray-500" />

    <h1 className="text-2xl mb-5">No connection</h1>

    <h4 className="text-base mb-10">Please connect to a Wi-Fi network to continue.</h4>
  </div>
)
