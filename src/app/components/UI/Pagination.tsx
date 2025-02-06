"use-client"

import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  onNextPage,
  onPrevPage
}) => {
  const pageNumbersToShow = 5;
  const halfWindow = Math.floor(pageNumbersToShow / 2);

  let startPage = Math.max(1, currentPage - halfWindow);
  let endPage = Math.min(totalPages, currentPage + halfWindow);

  if (currentPage - halfWindow <= 1) {
    endPage = Math.min(totalPages, pageNumbersToShow);
  }

  if (currentPage + halfWindow >= totalPages) {
    startPage = Math.max(1, totalPages - pageNumbersToShow + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onPrevPage}
        disabled={!hasPrevPage}
        className="p-2 bg-gray-100 text-gray-800 rounded-md disabled:opacity-50"
      >
        <FaChevronLeft />
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`p-2 rounded-md ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} disabled:opacity-50`}
        >
          {pageNumber}
        </button>
      ))}

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNextPage}
        disabled={!hasNextPage}
        className="p-2 bg-gray-100 text-gray-800 rounded-md disabled:opacity-50"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
