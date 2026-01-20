import React from 'react';
import BasicModalContainer from './BasicModalContainer';

interface SuccessModalProps {
  title: string;
  message?: string;
  isOpen: boolean;
  onClose: () => void;
}


const SuccessModal: React.FC<SuccessModalProps> = ({
  title,
  message,
  isOpen,
  onClose,
}: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <BasicModalContainer>
      <h2 className="text-xl font-semibold mb-4 text-green-600">{title}</h2>
      <p className="mb-6">{message}</p>
      <button
        onClick={onClose}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm"
      >
        Close
      </button>
    </BasicModalContainer>
  );
}
export default React.memo(SuccessModal);