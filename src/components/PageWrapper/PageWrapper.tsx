import React, { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import { Sidebar } from '..'
import { ALERT_AUTO_CLOSE_TIME } from '../../constants'

interface PageWrapperProps {
  children: JSX.Element | JSX.Element[]
}

export const PageWrapper: FC<PageWrapperProps> = ({ children }) => (
  <>
    <ToastContainer autoClose={ALERT_AUTO_CLOSE_TIME} closeButton={false} pauseOnHover hideProgressBar />

    <div className="w-full h-screen flex">
      <Sidebar />

      <div className="w-10/12 p-8 overflow-scroll">{children}</div>
    </div>
  </>
)
