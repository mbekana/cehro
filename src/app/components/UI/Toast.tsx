import React, { useEffect } from 'react';

type ToastProps = {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer); 
  }, [onClose]);

  const toastClass = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  }[type];

  return (
    <div
      className={`fixed bottom-4 right-4 w-80 p-4 rounded-md shadow-lg ${toastClass} text-white`}
    >
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button onClick={onClose} className="text-lg">×</button>
      </div>
    </div>
  );
};

export default Toast;
