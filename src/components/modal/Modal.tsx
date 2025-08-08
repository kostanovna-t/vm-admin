import React from 'react';
import ReactDOM from 'react-dom';
import { useConfirmModal } from '../../hooks/useConfirmModal';
import { ConfirmModal } from '../confirm-modal';
import './Modal.scss';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  onCloseButtonClick?: () => void; 
  showConfirmOnClose?: boolean; 
  confirmMessage?: string; 
  confirmTitle?: string; 
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onRequestClose,
  children,
  onCloseButtonClick,
  showConfirmOnClose = false,
  confirmMessage = "You have unsaved changes. Are you sure you want to leave?",
  confirmTitle = "Cancel creating?",
}) => {
  const {
    showConfirm,
    handleConfirmClose,
    handleCancelClose,
    triggerConfirm,
  } = useConfirmModal({ showConfirmOnClose, onRequestClose });

  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  const handleCloseButtonClick = (): void => {
    if (onCloseButtonClick) {
      onCloseButtonClick();
    } else {
      triggerConfirm();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    triggerConfirm();
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{title}</h2>
            <button className="modal-close" onClick={handleCloseButtonClick}>×</button>
          </div>

          <div className="modal-body">{children}</div>
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          onConfirm={handleConfirmClose}
          onCancel={handleCancelClose}
          message={confirmMessage}
          title={confirmTitle}
        />
      )}
    </>,
    modalRoot
  );
};

export default Modal;
