import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface PopConfirmProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  title: string;
}

const PopConfirm: React.FC<PopConfirmProps> = ({ isOpen, onConfirm, onCancel, message, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p>{message}</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-900"
          >
            <FaTimes className="inline mr-2" /> Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopConfirm;