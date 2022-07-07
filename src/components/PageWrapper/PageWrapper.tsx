import React, { FC, ReactNode } from 'react'
import { Navbar } from '..'

export const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />

      <div className="w-screen h-screen flex flex-col items-center p-8">
        <div className="w-4/5 h-1/2">{children}</div>
      </div>
    </>
  )
}
