import { Sidebar as FlowbiteSidebar } from 'flowbite-react'
import React, { FC } from 'react'
import SidebarLogo from '../../assets/images/logo.png'
import { Divider } from '../Divider/Divider'
import { TypeCheck, Types } from './Types'

const { Logo } = FlowbiteSidebar

interface SidebarProps {
  handleSelectedTypes?: ({ type, checked }: TypeCheck) => void
}

export const Sidebar: FC<SidebarProps> = ({ handleSelectedTypes }) => {
  return (
    <FlowbiteSidebar aria-label="Sidebar menu">
      <Logo href="/agents" img={SidebarLogo} imgAlt="SNMP Simulator logo">
        SNMP Simulator
      </Logo>
      <Divider />
      <Types handleSelectedTypes={handleSelectedTypes} />
      <Divider />
    </FlowbiteSidebar>
  )
}
