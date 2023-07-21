import { FC, useMemo } from 'react';
import { HiHeart } from 'react-icons/hi';
import { Sidebar, useTheme } from 'flowbite-react';

import { Divider } from 'app/components';
import { DeviceStatus } from 'app/models';
import GithubLogo from 'assets/github.svg';
import SidebarLogoBlack from 'assets/logo-black.svg';
import SidebarLogoWhite from 'assets/logo-white.svg';

import { DeviceStatusFilter } from './DeviceStatusFilter';
import { DeviceTypeFilter } from './DeviceTypeFilter';
import { HelpNav } from './HelpNav';

interface DevicesSidebarProps {
  onSelectionChange: (values: string[]) => void;
  onStatusSelect: (value: DeviceStatus) => void;
}

const customTheme = {
  root: {
    inner:
      'h-full overflow-y-auto overflow-x-hidden bg-white py-4 px-3 dark:bg-gray-800 border-r-[1px] border-gray-400 dark:border-gray-600'
  }
};

export const DevicesSidebar: FC<DevicesSidebarProps> = ({ onSelectionChange, onStatusSelect }) => {
  const { mode } = useTheme();
  const logo = useMemo(() => (mode === 'dark' ? SidebarLogoWhite : SidebarLogoBlack), [mode]);

  return (
    <Sidebar aria-label='Sidebar menu' theme={customTheme}>
      <div className='flex flex-col justify-between h-full'>
        <div>
          <img src={logo} />
          <Divider />
          <DeviceTypeFilter onSelectionChange={onSelectionChange} />
          <Divider />
          <DeviceStatusFilter onStatusSelect={onStatusSelect} />
          <Divider />
        </div>
        <div className='flex flex-col gap-4'>
          <HelpNav />
          <div className='flex justify-between align-top'>
            <p className='text-gray-400 dark:text-gray-400 font-normal text-xs align-bottom leading-5'>
              Made with &nbsp;
              <HiHeart className='inline align-top' size='1.5em' />
              &nbsp; by Sonalake.
            </p>
            <img src={GithubLogo} className='inline' />
          </div>
        </div>
      </div>
    </Sidebar>
  );
};
