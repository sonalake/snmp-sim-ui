import { HiHeart } from 'react-icons/hi';
import { Avatar } from 'flowbite-react';

import { VerticalDivider } from 'app/components';
import GithubLogo from 'assets/github.svg';

const customTheme = {
  root: {
    initials: {
      text: 'font-medium text-gray-900 dark:text-gray-900 text-xs font-medium',
      base: 'inline-flex overflow-hidden relative justify-center items-center bg-gray-100 dark:bg-gray-100'
    }
  }
};

export const SidebarFooter = () => (
  <div className='flex flex-col gap-4'>
    <div className='flex gap-2 items-center'>
      <Avatar theme={customTheme} alt='PH' placeholderInitials='PH' rounded size='sm' />
      <VerticalDivider />
      <div className='text-blue-700 dark:text-blue-200 cursor-pointer font-medium text-sm'>
        Logout
      </div>
    </div>
    <div className='flex justify-between align-top'>
      <p className='text-gray-400 dark:text-gray-400 font-normal text-xs align-bottom leading-5'>
        {'Made with '}
        <HiHeart className='inline align-top' size='1.5em' />
        {' by Sonalake.'}
      </p>
      <img src={GithubLogo} className='inline' />
    </div>
  </div>
);
