import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    let pages = [];

    pages.push(1);

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
      pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="my-6 flex items-center justify-center space-x-2">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded p-2 ${
          currentPage === 1
            ? 'cursor-not-allowed text-gray-400'
            : 'text-[#7695EC] hover:bg-gray-100'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>

      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-2">...</span>
          ) : (
            <button
              onClick={() => typeof page === 'number' && onPageChange(page)}
              className={`h-8 w-8 rounded-md ${
                currentPage === page
                  ? 'bg-[#7695EC] text-white'
                  : 'text-[#7695EC] hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className={`rounded p-2 ${
          currentPage === totalPages
            ? 'cursor-not-allowed text-gray-400'
            : 'text-[#7695EC] hover:bg-gray-100'
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
