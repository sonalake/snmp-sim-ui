import { HiHeart } from 'react-icons/hi';
import { Avatar } from 'flowbite-react';

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
      <div className='h-full border-l-[1px] border-gray-200 dark:border-gray-700' />
      <a
        href='#'
        className='font-medium text-sm hover:underline text-primary-700 dark:text-primary-200'
      >
        Logout
      </a>
    </div>
    <div className='flex justify-between items-center'>
      <p className='text-xs leading-normal text-gray-400 dark:text-gray-400'>
        {'Made with '}
        <HiHeart className='inline align-top' size='1.5em' />
        {' by Sonalake.'}
      </p>
      <img src={GithubLogo} className='inline' />
    </div>
  </div>
);
