import { Sidebar as FlowbiteSidebar, useTheme } from 'flowbite-react'
import React, { FC } from 'react'
import SidebarLogoBlack from '../../assets/images/logo-black.svg'
import SidebarLogoWhite from '../../assets/images/logo-white.svg'

import { Divider } from '../Divider/Divider'
import { DeviceStatus } from '../../models'
import { DeviceTypeCheck, DeviceTypes } from './DeviceTypes'
import { DeviceStatusComponent } from './DeviceStatus'
import { HelpNav } from './HelpNav'

interface SidebarProps {
  handleSelectedTypes?: ({ type, checked }: DeviceTypeCheck) => void
  handleSelectStatus?: (deviceStatus: DeviceStatus) => void
}

export const Sidebar: FC<SidebarProps> = ({ handleSelectedTypes, handleSelectStatus }) => {
  const { mode } = useTheme()
  const logo = mode === 'dark' ? SidebarLogoWhite : SidebarLogoBlack
  const customTheme = {
    root: {
      inner: 'h-full overflow-y-auto overflow-x-hidden rounded bg-white py-4 px-3 dark:bg-gray-800',
    },
  }
  return (
    <FlowbiteSidebar aria-label="Sidebar menu" theme={customTheme}>
      <img src={logo} className="mx-auto" />
      <Divider />
      <DeviceTypes handleSelectedTypes={handleSelectedTypes} />
      <Divider />
      <DeviceStatus handleSelectStatus={handleSelectStatus} />
      <Divider />
      <HelpNav />
    </FlowbiteSidebar>
  )
}
