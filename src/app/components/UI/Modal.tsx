import React, { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-text-primary mb-4">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
