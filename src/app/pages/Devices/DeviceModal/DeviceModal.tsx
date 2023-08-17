import { FC } from 'react';

import { ModalWrapper } from 'app/components';

import { DeviceModalContent } from './DeviceModalContent';

export const DEVICE_MODAL_TEST_ID = 'device-modal';

export interface DeviceModalProps {
  show: boolean;
  onClose: () => void;
}

export const DeviceModal: FC<DeviceModalProps> = ({ show, onClose }) => (
  <ModalWrapper data-testid={DEVICE_MODAL_TEST_ID} show={show} onClose={onClose}>
    <DeviceModalContent onClose={onClose} />
  </ModalWrapper>
);
