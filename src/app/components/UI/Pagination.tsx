"use-client"

import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';  

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, hasNextPage, hasPrevPage, onPageChange }) => {

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage} 
        className="p-2 bg-gray-100 text-gray-800 rounded-md disabled:opacity-50"
      >
        <FaChevronLeft />
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage} 
        className="p-2 bg-gray-100 text-grey-800 rounded-md disabled:opacity-50"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
