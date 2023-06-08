import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.min.css'
import './index.css'
import { Router } from './Router'
import { QueryProvider } from './context/query-context'

const rootComponent = document.getElementById('root') as HTMLElement

const root = createRoot(rootComponent)

root.render(
  <StrictMode>
    <QueryProvider>
      <Router />
    </QueryProvider>
  </StrictMode>,
)
