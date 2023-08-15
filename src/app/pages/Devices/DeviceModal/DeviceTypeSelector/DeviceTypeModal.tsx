import { FC } from 'react';

import { ModalWrapper } from 'app/components';

import { DeviceTypeModalContent } from './DeviceTypeModalContent';

interface DeviceTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeviceTypeModal: FC<DeviceTypeModalProps> = ({ isOpen, onClose }) => (
  <ModalWrapper isOpen={isOpen} onClose={onClose}>
    <DeviceTypeModalContent onClose={onClose} />
  </ModalWrapper>
);
