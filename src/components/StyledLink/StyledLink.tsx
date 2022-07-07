import React, { FC } from 'react'
import { Link } from 'react-router-dom'

export const StyledLink: FC<{ href: string; label: string }> = ({ href, label }) => {
  return (
    <Link className="text-blue-400" to={href}>
      {label}
    </Link>
  )
}
