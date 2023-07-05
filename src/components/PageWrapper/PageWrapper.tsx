import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import { ALERT_AUTO_CLOSE_TIME } from '../../constants/alerts';
import { DeviceStatus } from '../../models';
import { DeviceTypeCheck, Sidebar } from '../Sidebar';

interface PageWrapperProps {
  children: JSX.Element | JSX.Element[];
  handleSelectedTypes?: ({ type, checked }: DeviceTypeCheck) => void;
  handleSelectStatus?: (deviceStatus: DeviceStatus) => void;
  activeStatus?: DeviceStatus;
}

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  handleSelectedTypes,
  handleSelectStatus,
  activeStatus
}) => (
  <>
    <ToastContainer autoClose={ALERT_AUTO_CLOSE_TIME} closeButton={false} pauseOnHover hideProgressBar />

    <div className='w-full h-screen flex dark:bg-gray-900'>
      <Sidebar
        handleSelectedTypes={handleSelectedTypes}
        handleSelectStatus={handleSelectStatus}
        activeStatus={activeStatus}
      />
      <div className='w-10/12 p-8 overflow-auto bg-gray-50 dark:bg-gray-900'>{children}</div>
    </div>
  </>
);
