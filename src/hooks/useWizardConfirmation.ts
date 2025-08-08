import { useEffect, useState } from 'react';

interface UseWizardConfirmationProps {
  isFirst: boolean;
  isDirty: boolean;
  onClose: () => void;
  goPrev: () => void;
}

export function useWizardConfirmation({
  isFirst,
  isDirty,
  onClose,
  goPrev
}: UseWizardConfirmationProps): {
  showConfirm: boolean;
  handleCloseWithConfirm: () => void;
  handleConfirmClose: () => void;
  handleCancelClose: () => void;
} {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCloseWithConfirm = (): void => {
    if (!isFirst || isDirty) {
      setShowConfirm(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = (): void => {
    setShowConfirm(false);
    onClose();
  };

  const handleCancelClose = (): void => {
    setShowConfirm(false);
  };

  useEffect(() => {
    const handleWizardGoBack = (): void => {
      if (!isFirst) {
        goPrev();
      }
    };

    window.addEventListener('wizard-go-back', handleWizardGoBack);

    return (): void => {
      window.removeEventListener('wizard-go-back', handleWizardGoBack);
    };
  }, [isFirst, goPrev]);

  return {
    showConfirm,
    handleCloseWithConfirm,
    handleConfirmClose,
    handleCancelClose,
  };
};
