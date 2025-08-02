import { useState } from 'react';

interface UseConfirmModalProps {
  showConfirmOnClose?: boolean;
  onRequestClose: () => void;
}

export function useConfirmModal({ showConfirmOnClose, onRequestClose }: UseConfirmModalProps): {
  showConfirm: boolean;
  handleConfirmClose: () => void;
  handleCancelClose: () => void;
  triggerConfirm: () => void;
} {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmClose = (): void => {
    setShowConfirm(false);
    onRequestClose();
  };

  const handleCancelClose = (): void => {
    setShowConfirm(false);
  };

  const triggerConfirm = (): void => {
    if (showConfirmOnClose) {
      setShowConfirm(true);
    } else {
      onRequestClose();
    }
  };

  return {
    showConfirm,
    handleConfirmClose,
    handleCancelClose,
    triggerConfirm,
  };
}; 