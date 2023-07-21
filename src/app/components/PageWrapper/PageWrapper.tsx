import { FC, ReactNode, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';

import { ALERT_AUTO_CLOSE_TIME } from 'app/constants';

interface PageWrapperProps {
  children: JSX.Element | JSX.Element[];
  sidebarComponent?: ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = ({ children, sidebarComponent }) => {
  const mainWidth = useMemo(() => (sidebarComponent ? 'w-10/12' : 'w-full'), [sidebarComponent]);

  return (
    <>
      <ToastContainer
        autoClose={ALERT_AUTO_CLOSE_TIME}
        closeButton={false}
        pauseOnHover
        hideProgressBar
      />

      <div className='w-full h-screen flex dark:bg-gray-900'>
        {sidebarComponent}
        <div className={`${mainWidth} p-8 overflow-auto bg-gray-50 dark:bg-gray-900`}>
          {children}
        </div>
      </div>
    </>
  );
};
