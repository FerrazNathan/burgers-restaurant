import React, { ReactNode, useEffect, useRef } from 'react';
import { ModalProps } from './Modal.types'

import * as S from './styles';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <S.ModalOverlay data-testid='modal-overlay'>
      <S.ModalContent 
        ref={modalRef} 
        onClick={(e) => e.stopPropagation()}
        data-testid='modal-content'
      >
        <S.CloseButton 
          onClick={onClose} 
          data-testid='close-button'
        >
          &times;
        </S.CloseButton>
        {children}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export { Modal };
