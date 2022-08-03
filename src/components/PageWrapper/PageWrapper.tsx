import React, { FC, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import { Sidebar } from '..'
import { ALERT_AUTO_CLOSE_TIME } from '../../constants'

export const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <ToastContainer autoClose={ALERT_AUTO_CLOSE_TIME} closeButton={false} pauseOnHover hideProgressBar />

    <div className="w-full h-screen flex">
      <Sidebar />

      <div className="w-10/12 p-8 overflow-scroll">{children}</div>
    </div>
  </>
)
