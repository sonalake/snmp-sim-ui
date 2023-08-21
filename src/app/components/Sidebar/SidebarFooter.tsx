import { HiHeart } from 'react-icons/hi';

import GithubLogo from 'assets/github.svg';

export const SidebarFooter = () => (
  <div className='flex flex-col gap-4'>
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
