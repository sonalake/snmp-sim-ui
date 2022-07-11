import React, { FC, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import { Navbar } from '..'
import { ALERT_AUTO_CLOSE_TIME } from '../../constants'

export const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Navbar />

    <ToastContainer autoClose={ALERT_AUTO_CLOSE_TIME} closeButton={false} pauseOnHover hideProgressBar />

    <div className="w-screen h-screen flex flex-col items-center py-8">
      <div className="w-4/5 h-1/2">{children}</div>
    </div>
  </>
)
