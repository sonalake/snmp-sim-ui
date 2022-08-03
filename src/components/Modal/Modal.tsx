import { Modal as FlowbiteModal } from 'flowbite-react'
import React, { FC, ReactNode } from 'react'

export const Modal: FC<{ children: ReactNode; title: string; isVisible: boolean; onClose: () => void }> = ({
  children,
  title,
  isVisible,
  onClose,
}) => {
  return (
    <FlowbiteModal show={isVisible} onClose={onClose}>
      <FlowbiteModal.Header>{title}</FlowbiteModal.Header>

      <FlowbiteModal.Body>
        <div style={{ maxHeight: '70vh', overflow: 'scroll' }}>{children}</div>
      </FlowbiteModal.Body>
    </FlowbiteModal>
  )
}
