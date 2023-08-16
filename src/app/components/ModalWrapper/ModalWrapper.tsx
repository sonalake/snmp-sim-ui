import { FC, PropsWithChildren } from 'react';
import { Modal, ModalProps } from 'flowbite-react';

const modalTheme = {
  root: {
    base: 'fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
    show: {
      on: 'flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80',
      off: 'hidden'
    }
  },
  content: {
    base: 'relative h-full w-full p-4 md:h-auto',
    inner: 'relative rounded-lg bg-white shadow dark:bg-gray-800 flex flex-col max-h-[90vh]'
  }
};

interface ModalWrapperProps extends Omit<ModalProps, 'theme'>, PropsWithChildren {}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  show,
  size = 'md',
  dismissible = true,
  children,
  ...props
}) => {
  return (
    <Modal theme={modalTheme} show={show} size={size} dismissible={dismissible} {...props}>
      {show && children}
    </Modal>
  );
};
