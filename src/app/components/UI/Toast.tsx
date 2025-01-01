import React, { useEffect } from 'react';

type ToastProps = {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'; 
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose, position }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer); 
  }, [onClose]);

  const toastClass = {
    success: 'bg-green-500 border-green-700',
    error: 'bg-red-500 border-red-700',
    info: 'bg-blue-500 border-blue-700',
    warning: 'bg-yellow-500 border-yellow-700',
  }[type];

  const positionClass = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2', 
  }[position];

  return (
    <div
      className={`fixed ${positionClass} w-80 p-4 rounded-md shadow-lg ${toastClass} border-2 border-solid text-white`}
    >
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button onClick={onClose} className="text-lg">×</button>
      </div>
    </div>
  );
};

export default Toast;
