import React, { ReactElement, ReactPortal } from 'react';

import { Modal } from 'react-responsive-modal';
interface CustomModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children:
    | ReactElement
    | string
    | number
    | ReactPortal
    | boolean
    | null
    | undefined;
  styles?: {
    root?: React.CSSProperties;
    overlay?: React.CSSProperties;
    modalContainer?: React.CSSProperties;
    modal?: React.CSSProperties;
    closeButton?: React.CSSProperties;
    closeIcon?: React.CSSProperties;
  };
  customClass?: {
    modalContainer?: string;
    modal?: string;
  };
  closeOnOverlayClick?: boolean;
  showCloseIcon?: boolean;
  className?: string;
}
export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen = false,
  closeModal = () => null,
  children,
  styles,
  closeOnOverlayClick = true,
  showCloseIcon = false,
  customClass: {
    modal: modalClass = '',
    modalContainer: modalContainerClass = '',
  } = {},
}) => {
  return (
    <Modal
      showCloseIcon={showCloseIcon}
      blockScroll={false}
      closeOnEsc={false}
      closeOnOverlayClick={closeOnOverlayClick}
      open={isOpen}
      onClose={closeModal}
      animationDuration={400}
      center
      classNames={{
        root: 'font-family-maison',
        modal: `custom-modal rounded-[24px] !px-4 md:!px-[28px] !py-[36px] drop-shadow-[0_-22px_74.5px_rgba(0,0,0,0.12)] w-full ${modalClass}`,
        overlay: 'backdrop-blur-[1.6px]',
        modalContainer: `flex w-full items-center justify-center ${modalContainerClass}`,
      }}
      styles={{ overlay: { background: 'rgba(0, 0, 0, 0.6)' }, ...styles }}
      focusTrapped={false}
    >
      {children}
    </Modal>
  );
};
