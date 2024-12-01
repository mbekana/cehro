import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface ActionDropdownProps {
  onAction: (action: string) => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({ onAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (action: string) => {
    onAction(action);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-100 border rounded text-sm focus:outline-none flex items-center"
      >
        <span className="mr-2">Select Action</span>
        {isOpen ? (
          <FaChevronUp className="ml-2" />
        ) : (
          <FaChevronDown className="ml-2" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 overflow-visible">
          <button
            onClick={() => handleAction('details')}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center"
          >
            <FaEye className="mr-2" /> Details
          </button>
          <button
            onClick={() => handleAction('update')}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center"
          >
            <FaEdit className="mr-2" /> Update
          </button>
          <button
            onClick={() => handleAction('delete')}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center"
          >
            <FaTrash className="mr-2" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
