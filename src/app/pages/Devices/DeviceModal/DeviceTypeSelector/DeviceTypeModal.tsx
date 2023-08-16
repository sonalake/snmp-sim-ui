import { FC } from 'react';

import { ModalWrapper } from 'app/components';
import { DeviceTypeCount } from 'app/types';

import { DeviceTypeModalContent } from './DeviceTypeModalContent';

interface DeviceTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelection: (deviceType: DeviceTypeCount) => void;
}

export const DeviceTypeModal: FC<DeviceTypeModalProps> = ({ isOpen, onClose, onSelection }) => (
  <ModalWrapper show={isOpen} onClose={onClose}>
    <DeviceTypeModalContent onClose={onClose} onSelection={onSelection} />
  </ModalWrapper>
);
