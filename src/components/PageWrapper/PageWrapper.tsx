import React, { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import { Sidebar } from '..'
import { ALERT_AUTO_CLOSE_TIME } from '../../constants'
import { TypeCheck } from '../Sidebar/Types'

interface PageWrapperProps {
  children: JSX.Element | JSX.Element[]
  handleSelectedTypes?: ({ type, checked }: TypeCheck) => void
}

export const PageWrapper: FC<PageWrapperProps> = ({ children, handleSelectedTypes }) => (
  <>
    <ToastContainer autoClose={ALERT_AUTO_CLOSE_TIME} closeButton={false} pauseOnHover hideProgressBar />

    <div className="w-full h-screen flex dark:bg-gray-900">
      <Sidebar handleSelectedTypes={handleSelectedTypes} />

      <div className="w-10/12 p-8 overflow-auto">{children}</div>
    </div>
  </>
)
