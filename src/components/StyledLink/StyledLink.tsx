import React, { FC } from 'react'
import { Link } from 'react-router-dom'

export const StyledLink: FC<{ href: string; label: string }> = ({ href, label }) => (
  <Link className="text-blue-400" to={href}>
    {label}
  </Link>
)
