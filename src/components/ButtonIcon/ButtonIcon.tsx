import React, { FC } from 'react'
import { IconType } from 'react-icons'

interface ButtonIconProps {
  as: IconType
  onClick?: () => void
}

export const ButtonIcon: FC<ButtonIconProps> = ({ as, onClick }) => {
  const Icon = as

  return <Icon className="mr-2 h-5 w-5 cursor-pointer" onClick={onClick} />
}
