import { Sidebar as FlowbiteSidebar } from 'flowbite-react'
import React from 'react'
import { HiChartPie, HiDocumentReport } from 'react-icons/hi'
import { useLocation, useNavigate } from 'react-router'
import SidebarLogo from '../../assets/images/logo.png'

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
  const navigate = useNavigate()

  const handleNavigate = (url: string) => navigate(url)

  return (
    <FlowbiteSidebar aria-label="Sidebar menu">
      <Logo href="/agents" img={SidebarLogo} imgAlt="SNMP Simulator logo">
        SNMP Simulator
      </Logo>

      <Items>
        <ItemGroup>
          {sidebarItems.map(({ label, url, icon }) => (
            <Item key={label} onClick={() => handleNavigate(url)} icon={icon} active={location.pathname.includes(url)}>
              {label}
            </Item>
          ))}
        </ItemGroup>
      </Items>
    </FlowbiteSidebar>
  )
}
