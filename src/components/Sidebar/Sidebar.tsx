import { Sidebar as FlowbiteSidebar } from 'flowbite-react'
import React from 'react'
import { HiChartPie, HiDocumentReport } from 'react-icons/hi'
import { useLocation } from 'react-router'
import SidebarLogo from '../../assets/images/logo2.png'

const { Logo, Items, Item, ItemGroup } = FlowbiteSidebar

const sidebarItems = [
  {
    label: 'Agents',
    url: '/agents',
    icon: HiChartPie,
  },
  {
    label: 'Devices',
    url: '/devices',
    icon: HiDocumentReport,
  },
]

export const Sidebar = () => {
  const location = useLocation()

  return (
    <FlowbiteSidebar aria-label="Sidebar menu">
      <Logo href="/agents" img={SidebarLogo} imgAlt="SNMP Simulator logo">
        SNMP Simulator
      </Logo>

      <Items>
        <ItemGroup>
          {sidebarItems.map(({ label, url, icon }) => (
            <Item key={label} href={url} icon={icon} active={location.pathname.includes(url)}>
              {label}
            </Item>
          ))}
        </ItemGroup>
      </Items>
    </FlowbiteSidebar>
  )
}
