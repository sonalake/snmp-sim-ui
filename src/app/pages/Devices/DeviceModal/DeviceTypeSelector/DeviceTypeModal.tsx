import { FC } from 'react';

import { ModalWrapper } from 'app/components';
import { DeviceTypeCount } from 'app/types';

import { DeviceTypeModalContent } from './DeviceTypeModalContent';

export const DEVICE_TYPE_MODAL_TEST_ID = 'device-type-modal';

export interface DeviceTypeModalProps {
  show: boolean;
  onClose: () => void;
  onSelection: (deviceType: DeviceTypeCount) => void;
}

export const DeviceTypeModal: FC<DeviceTypeModalProps> = ({ show, onClose, onSelection }) => (
  <ModalWrapper data-testid={DEVICE_TYPE_MODAL_TEST_ID} show={show} onClose={onClose}>
    <DeviceTypeModalContent onClose={onClose} onSelection={onSelection} />
  </ModalWrapper>
);
