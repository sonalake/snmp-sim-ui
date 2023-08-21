import { FC, PropsWithChildren, useMemo } from 'react';
import { Sidebar as FlowbiteSidebar, useTheme } from 'flowbite-react';

import { Divider } from 'app/components';
import { SIDEBAR_WIDTH } from 'app/constants';
import SidebarLogoBlack from 'assets/logo-black.svg';
import SidebarLogoWhite from 'assets/logo-white.svg';

import { SidebarFooter } from './SidebarFooter';

const customTheme = {
  root: {
    collapsed: {
      off: SIDEBAR_WIDTH
    },
    inner:
      'h-full overflow-y-auto overflow-x-hidden bg-white pt-4 pb-3 px-3 dark:bg-gray-800 border-r-[1px] border-gray-400 dark:border-gray-600'
  }
};

export const Sidebar: FC<PropsWithChildren> = ({ children }) => {
  const { mode } = useTheme();
  const logo = useMemo(() => (mode === 'dark' ? SidebarLogoWhite : SidebarLogoBlack), [mode]);

  return (
    <FlowbiteSidebar aria-label='Sidebar menu' theme={customTheme}>
      <div className='flex flex-col justify-between h-full'>
        <div>
          <img src={logo} width='90px' data-testid='app-logo' />
          <Divider />
          {children}
        </div>
        <SidebarFooter />
      </div>
    </FlowbiteSidebar>
  );
};
