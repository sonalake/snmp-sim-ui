import React from 'react'
import { Navigate } from 'react-router'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from './components'
import { useDetectUserConnection } from './hooks'
import { AgentDetails, Agents, DeviceDetails, Devices, NoConnection, PageNotFound } from './pages'

export const Router = () => {
  const { isUserOnline } = useDetectUserConnection()

  return (
    <BrowserRouter>
      <ErrorBoundary>
        {isUserOnline ? (
          <Routes>
            <Route path="/agents" element={<Agents />} />
            <Route path="/agents/:id" element={<AgentDetails />} />

            <Route path="/devices" element={<Devices />} />
            <Route path="/devices/:id" element={<DeviceDetails />} />

            <Route path="/" element={<Navigate to="/agents" />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        ) : (
          <NoConnection />
        )}
      </ErrorBoundary>
    </BrowserRouter>
  )
}
