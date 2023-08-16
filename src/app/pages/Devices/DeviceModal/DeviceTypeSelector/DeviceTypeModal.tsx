import { FC } from 'react';

import { ModalWrapper } from 'app/components';
import { DeviceTypeCount } from 'app/types';

import { DeviceTypeModalContent } from './DeviceTypeModalContent';

export interface DeviceTypeModalProps {
  show: boolean;
  onClose: () => void;
  onSelection: (deviceType: DeviceTypeCount) => void;
}

export const DeviceTypeModal: FC<DeviceTypeModalProps> = ({ show, onClose, onSelection }) => (
  <ModalWrapper show={show} onClose={onClose}>
    <DeviceTypeModalContent onClose={onClose} onSelection={onSelection} />
  </ModalWrapper>
);
