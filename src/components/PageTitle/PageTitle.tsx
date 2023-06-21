import React, { FC } from 'react'

interface PageTitleProps {
  children: string
}
export const PageTitle: FC<PageTitleProps> = ({ children }) => (
  <h1 className="text-5xl font-semibold mb-7">{children}</h1>
)
