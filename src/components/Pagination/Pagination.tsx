import './Pagination.css';
import { START_PAGE_NUM } from '../../constants';

type PaginationProps = {
  numberPages: number;
  currentPage: number;
  onRightClick: () => void;
  onLeftClick: () => void;
};
export const Pagination = ({
  numberPages,
  currentPage,
  onRightClick,
  onLeftClick,
}: PaginationProps) => {
  return (
    <div className="pagination">
      <button
        onClick={onLeftClick}
        className={
          'arrow arrow-left ' +
          (currentPage !== START_PAGE_NUM ? 'arrow-active ' : 'arrow-disabled ')
        }
        disabled={currentPage === START_PAGE_NUM}
      ></button>
      <div className="pagination__info">
        <span className="pagination__info__currPage">{currentPage}</span>/
        <span className="pagination__info__maxPage">{numberPages}</span>
      </div>
      <button
        onClick={onRightClick}
        className={
          'arrow arrow-right ' +
          (numberPages !== currentPage ? 'arrow-active ' : 'arrow-disabled ')
        }
        disabled={numberPages === currentPage}
      ></button>
    </div>
  );
};
