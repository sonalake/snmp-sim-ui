import { Spinner } from 'flowbite-react';

export const LoadingIndicator = () => (
  <div className='flex items-center justify-center h-full' data-testid='loading-indicator'>
    <Spinner size='xl' aria-label='Loading...' />
  </div>
);
