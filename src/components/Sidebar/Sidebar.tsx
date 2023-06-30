import { Sidebar as FlowbiteSidebar, useTheme } from 'flowbite-react'
import React, { FC } from 'react'
import { HiHeart } from 'react-icons/hi'
import SidebarLogoBlack from '../../assets/images/logo-black.svg'
import SidebarLogoWhite from '../../assets/images/logo-white.svg'
import GithubLogo from '../../assets/images/github.svg'

import { Divider } from '../Divider/Divider'
import { DeviceStatus } from '../../models'
import { DeviceTypeCheck, DeviceTypes } from './DeviceTypes'
import { DeviceStatusSelection } from './DeviceStatusSelection'
import { HelpNav } from './HelpNav'

interface SidebarProps {
  handleSelectedTypes?: ({ type, checked }: DeviceTypeCheck) => void
  handleSelectStatus?: (deviceStatus: DeviceStatus) => void
  activeStatus: DeviceStatus
}

export const Sidebar: FC<SidebarProps> = ({ handleSelectedTypes, handleSelectStatus, activeStatus }) => {
  const { mode } = useTheme()
  const logo = mode === 'dark' ? SidebarLogoWhite : SidebarLogoBlack
  const customTheme = {
    root: {
      inner: 'h-full overflow-y-auto overflow-x-hidden rounded bg-white py-4 px-3 dark:bg-gray-800',
    },
  }
  return (
    <FlowbiteSidebar aria-label="Sidebar menu" theme={customTheme}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <img src={logo} />
          <Divider />
          <DeviceTypes handleSelectedTypes={handleSelectedTypes} />
          <Divider />
          <DeviceStatusSelection handleSelectStatus={handleSelectStatus} active={activeStatus} />
          <Divider />
        </div>
        <div className="flex flex-col gap-4">
          <HelpNav />
          <div className="flex justify-between">
            <p className="text-gray-400 dark:text-gray-400 font-normal text-xs align-bottom leading-5">
              Made with &nbsp;
              <HiHeart className="inline align-top" size="1.5em" />
              &nbsp; by Sonalake.
            </p>
            <img src={GithubLogo} className="inline" />
          </div>
        </div>
      </div>
    </FlowbiteSidebar>
  )
}
