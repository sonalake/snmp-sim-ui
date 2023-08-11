import { FC, PropsWithChildren } from 'react';

const H3: FC<PropsWithChildren> = ({ children }) => (
  <h3 className='text-xs font-semibold leading-normal text-gray-500 dark:text-gray-400 mb-4'>
    {children}
  </h3>
);

const Modal: FC<PropsWithChildren> = ({ children }) => (
  <h3 className='text-lg font-semibold leading-normal text-gray-800 dark:text-white'>{children}</h3>
);
const ModalSub: FC<PropsWithChildren> = ({ children }) => (
  <span className='block text-sm leading-normal text-gray-500 dark:text-gray-400'>{children}</span>
);

export const Heading = {
  H3: H3,
  Modal: Modal,
  ModalSub: ModalSub
};
