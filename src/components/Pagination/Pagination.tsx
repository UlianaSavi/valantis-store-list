import { usePagination } from '../../hooks/usePagination';
import './Pagination.css';

export const Pagination = () => {
  const { containerRef } = usePagination();

  return (
    <div ref={containerRef} className="pagination">
      asd
    </div>
  );
};
