const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems, 
  itemsPerPage,
  className = '' 
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className={`flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white px-4 py-5 shadow-md sm:px-6 lg:flex-row lg:items-center lg:justify-between ${className}`}>
      {/* Results info */}
      <div className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>
        Showing <span className="font-bold text-base" style={{ color: 'var(--primary-600)' }}>{startItem}</span> to{' '}
        <span className="font-bold text-base" style={{ color: 'var(--primary-600)' }}>{endItem}</span> of{' '}
        <span className="font-bold text-base" style={{ color: 'var(--primary-600)' }}>{totalItems}</span> results
      </div>

      {/* Page buttons */}
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:w-auto lg:justify-end">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-full rounded-xl px-5 py-2.5 font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 hover:shadow-md sm:w-auto"
          style={{
            backgroundColor: currentPage === 1 ? 'var(--gray-100)' : 'var(--white)',
            color: currentPage === 1 ? 'var(--gray-400)' : 'var(--gray-700)',
            border: '2px solid var(--gray-200)'
          }}
        >
          ← Previous
        </button>

        {/* Page numbers */}
        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-3 py-2" style={{ color: 'var(--gray-400)' }}>
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className="min-w-[44px] px-4 py-2.5 rounded-xl font-bold transition-all duration-300 hover:shadow-md transform hover:scale-110"
                style={{
                  backgroundColor: currentPage === page ? 'var(--primary-600)' : 'var(--white)',
                  color: currentPage === page ? 'var(--white)' : 'var(--gray-700)',
                  border: currentPage === page ? 'none' : '2px solid var(--gray-200)'
                }}
              >
                {page}
              </button>
            )
          ))}
        </div>

        {/* Mobile page indicator */}
        <div className="sm:hidden px-3 py-2" style={{ color: 'var(--gray-700)' }}>
          Page {currentPage} of {totalPages}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-full rounded-xl px-5 py-2.5 font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 hover:shadow-md sm:w-auto"
          style={{
            backgroundColor: currentPage === totalPages ? 'var(--gray-100)' : 'var(--white)',
            color: currentPage === totalPages ? 'var(--gray-400)' : 'var(--gray-700)',
            border: '2px solid var(--gray-200)'
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
