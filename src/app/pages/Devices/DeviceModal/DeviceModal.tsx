import { FC } from 'react';

import { ModalWrapper } from 'app/components';

import { DeviceModalContent } from './DeviceModalContent';

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeviceModal: FC<DeviceModalProps> = ({ isOpen, onClose }) => (
  <ModalWrapper isOpen={isOpen} onClose={onClose}>
    <DeviceModalContent onClose={onClose} />
  </ModalWrapper>
);
