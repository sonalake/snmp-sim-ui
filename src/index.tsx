import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './Router'
import { ErrorBoundary } from './components'
import './index.css'

const rootComponent = document.getElementById('root') as HTMLElement

const root = createRoot(rootComponent)

root.render(
  <StrictMode>
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  </StrictMode>,
)
