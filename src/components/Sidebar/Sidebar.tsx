import { Sidebar as FlowbiteSidebar } from 'flowbite-react'
import React, { FunctionComponent, SVGProps } from 'react'
import { HiChartPie, HiDocumentReport, HiLogout } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { Alert } from '..'
import SidebarLogo from '../../assets/images/sonalake_logo.jpeg'

const { Logo, Items, Item, ItemGroup } = FlowbiteSidebar

export const Sidebar = () => {
  return (
    <div className="bg-slate-600">
      <FlowbiteSidebar aria-label="Sidebar menu">
        <Logo href="/" img={SidebarLogo} imgAlt="SNMP Simulator logo">
          SNMP Simulator
        </Logo>
        <Items>
          <ItemGroup>
            <Item href="/agents" icon={HiChartPie as FunctionComponent<SVGProps<SVGSVGElement>>}>
              Agents
            </Item>
            <Item href="/devices" icon={HiDocumentReport as FunctionComponent<SVGProps<SVGSVGElement>>}>
              Devices
            </Item>
          </ItemGroup>

          <ItemGroup>
            <Item
              style={{ cursor: 'pointer' }}
              icon={HiLogout as FunctionComponent<SVGProps<SVGSVGElement>>}
              onClick={() =>
                confirm('Are you sure you want to log out?') &&
                toast(<Alert color="success" message="Logged out! - to be implemented" />)
              }
            >
              Log out
            </Item>
          </ItemGroup>
        </Items>
      </FlowbiteSidebar>
    </div>
  )
}
