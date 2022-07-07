import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDetectUserConnection } from './hooks'
import { Dashboard, Devices, DeviceDetails, PageNotFound, NoConnection } from './pages'

export const Router = () => {
  const { isUserOnline } = useDetectUserConnection()

  return (
    <BrowserRouter>
      {isUserOnline ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/devices" element={<Devices />} />
          <Route path="/devices/:id" element={<DeviceDetails />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      ) : (
        <NoConnection />
      )}
    </BrowserRouter>
  )
}
