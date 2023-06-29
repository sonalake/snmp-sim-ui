import React, { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import { Sidebar } from '..'
import { ALERT_AUTO_CLOSE_TIME } from '../../constants'
import { TypeCheck } from '../Sidebar/Types'
import { DeviceStatus } from '../../models'

interface PageWrapperProps {
  children: JSX.Element | JSX.Element[]
  handleSelectedTypes?: ({ type, checked }: TypeCheck) => void
  handleSelectStatus?: (deviceStatus: DeviceStatus) => void
}

export const PageWrapper: FC<PageWrapperProps> = ({ children, handleSelectedTypes, handleSelectStatus }) => (
  <>
    <ToastContainer autoClose={ALERT_AUTO_CLOSE_TIME} closeButton={false} pauseOnHover hideProgressBar />

    <div className="w-full h-screen flex dark:bg-gray-900">
      <Sidebar handleSelectedTypes={handleSelectedTypes} handleSelectStatus={handleSelectStatus} />

      <div className="w-10/12 p-8 overflow-auto bg-gray-50">{children}</div>
    </div>
  </>
)
