import { Modal as FlowbiteModal } from 'flowbite-react'
import React, { FC } from 'react'

interface ModalProps {
  children: JSX.Element | JSX.Element[]
  title: string
  isOpen: boolean
  onClose: () => void
  id?: string
}

export const Modal: FC<ModalProps> = ({ children, title, isOpen, onClose, id }) => {
  return (
    <FlowbiteModal show={isOpen} onClose={onClose} id={id}>
      {isOpen &&
        <>
          <FlowbiteModal.Header>{title}</FlowbiteModal.Header>

          <FlowbiteModal.Body>
            <div className="m-h-[70vh] overflow-scroll">{children}</div>
          </FlowbiteModal.Body>
        </>
      }
    </FlowbiteModal>
  )
}
