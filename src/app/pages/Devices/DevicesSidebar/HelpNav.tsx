import { Avatar } from 'flowbite-react';

import { VerticalDivider } from 'app/components';

const styles = {
  root: {
    initials: {
      text: 'font-medium text-gray-900 dark:text-gray-900 text-xs font-medium',
      base: 'inline-flex overflow-hidden relative justify-center items-center bg-gray-100 dark:bg-gray-100'
    }
  }
};

export const HelpNav = () => (
  <div className='flex gap-2 items-center'>
    <Avatar theme={styles} alt='PH' placeholderInitials='PH' rounded size='sm' />
    <VerticalDivider />
    <div className='text-blue-700 dark:text-blue-200 cursor-pointer font-medium text-sm'>
      Logout
    </div>
  </div>
);
