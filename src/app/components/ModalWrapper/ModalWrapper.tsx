import { FC, PropsWithChildren } from 'react';
import { Modal } from 'flowbite-react';

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

interface ModalWrapperProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({ isOpen, onClose, children }) => {
  return (
    <Modal theme={modalTheme} size='md' dismissible show={isOpen} onClose={onClose}>
      {isOpen && children}
    </Modal>
  );
};
