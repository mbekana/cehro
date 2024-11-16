"use-client"


import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';  

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);  
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-2 bg-gray-100 text-gray-800 rounded-md disabled:opacity-50"
      >
        <FaChevronLeft />
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`p-2 rounded-md ${page === currentPage ? ' text-grey-800' : 'bg-gray-100 text-gray-700'}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-2 bg-gray-100 text-grey-800 rounded-md disabled:opacity-50"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
