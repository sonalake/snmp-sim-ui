import React from 'react'
import { Navigate } from 'react-router'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from './components'
import { useDetectUserConnection } from './hooks'
import { AgentDetails, Agents, DeviceDetails, Devices, NoConnection, PageNotFound } from './pages'
import { Providers } from './context/providers'

export const Router = () => {
  const { isBrowserOnline } = useDetectUserConnection()

  return (
    <Providers>
      <BrowserRouter>
        <ErrorBoundary>
          {isBrowserOnline ? (
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
    </Providers>
  )
}
