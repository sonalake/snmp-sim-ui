import { FC, ReactNode, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';

import { ALERT_AUTO_CLOSE_TIME, MAIN_CONTENT_WITH_SIDEBAR_WIDTH } from 'app/constants';

import { Sidebar } from '../Sidebar/Sidebar';

interface PageWrapperProps {
  children: JSX.Element | JSX.Element[];
  withSidebar?: boolean;
  sidebarContent?: ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  withSidebar = false,
  sidebarContent = <div />
}) => {
  const mainWidth = useMemo(
    () => (withSidebar ? MAIN_CONTENT_WITH_SIDEBAR_WIDTH : 'w-full'),
    [withSidebar]
  );

  return (
    <>
      <ToastContainer
        autoClose={ALERT_AUTO_CLOSE_TIME}
        closeButton={false}
        pauseOnHover
        hideProgressBar
      />

      <div className='w-full h-screen flex bg-gray-50 dark:bg-gray-900'>
        {withSidebar && <Sidebar>{sidebarContent}</Sidebar>}
        <div className={`${mainWidth} p-10 overflow-auto`}>{children}</div>
      </div>
    </>
  );
};
