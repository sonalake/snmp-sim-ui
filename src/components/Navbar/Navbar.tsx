import React from 'react'
import { useLocation } from 'react-router'
import { Navbar as FlowbiteNavbar } from 'flowbite-react'
import { NAVBAR_LINKS } from '../../constants'
import Logo from '../../assets/images/sonalake_logo.jpeg'

export const Navbar = () => {
  const location = useLocation()

  return (
    <FlowbiteNavbar fluid rounded>
      <FlowbiteNavbar.Brand href="/">
        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />

        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SNMP Simulator</span>
      </FlowbiteNavbar.Brand>

      <FlowbiteNavbar.Toggle />

      <FlowbiteNavbar.Collapse>
        {NAVBAR_LINKS.map(({ label, href }) => (
          <FlowbiteNavbar.Link key={label} href={href} active={location.pathname === href}>
            {label}
          </FlowbiteNavbar.Link>
        ))}
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  )
}
