import { FC } from 'react';

import { ModalWrapper } from 'app/components';

import { DeviceModalContent } from './DeviceModalContent';

export interface DeviceModalProps {
  show: boolean;
  onClose: () => void;
}

export const DeviceModal: FC<DeviceModalProps> = ({ show, onClose }) => (
  <ModalWrapper show={show} onClose={onClose}>
    <DeviceModalContent onClose={onClose} />
  </ModalWrapper>
);
