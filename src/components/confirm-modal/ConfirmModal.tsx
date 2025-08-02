import React from "react";
import ErrorIcon from '../../assets/circle-danger.svg';
import "./ConfirmModal.scss";

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  title: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ onConfirm, onCancel, message, title }: ConfirmModalProps) => {
  
  const handleOverlayClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  const handleContentClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  const handleConfirmClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onConfirm();
  };

  const handleCancelClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onCancel();
  };

  return (
    <div className="confirm-modal" onClick={handleOverlayClick}>
      <div className="confirm-modal-content" onClick={handleContentClick}>
        <ErrorIcon />
        <div className="confirm-modal-title">{title}</div>
        <p className="confirm-modal-message">{message}</p>
        <div className="confirm-modal-buttons">
            <button onClick={handleConfirmClick}>Leave</button>
            <button onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
}; 