import { useCallback } from "react";


const Pagination = ({ currentPage, totalPages, onPageChange }: IPagination) => {
  const handlePrev = useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  },[currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  },[currentPage, totalPages, onPageChange]);

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if(!pageNumbers.length) return <></>

  return (
    <div>
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Previous
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;

interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number)=> void;
}
