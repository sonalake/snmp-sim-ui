import { FC, PropsWithChildren } from 'react';

const H3: FC<PropsWithChildren> = ({ children }) => (
  <h3 className='text-xs font-semibold leading-normal text-gray-500 dark:text-gray-400 mb-4'>
    {children}
  </h3>
);

export const Heading = {
  H3: H3
};
