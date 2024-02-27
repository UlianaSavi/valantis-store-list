import { MouseEvent, useEffect, useState } from 'react';
import './Pagination.css';
import { LIMIT, PAGINATION_ARROW_TYPES, START_PAGE_NUM } from '../../constants';

export const Pagination = (props: { allIdsLen: number }) => {
  const [pagesSize, setPagesSize] = useState(0);
  const [currOffset, setCurrOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(START_PAGE_NUM);

  useEffect(() => {
    setPagesTotalCount();
  }, [props.allIdsLen]);

  const changePageEvent = (type: PAGINATION_ARROW_TYPES) => {
    setCurrOffset(
      type === PAGINATION_ARROW_TYPES.left
        ? currOffset - LIMIT
        : currOffset + LIMIT,
    );
    setCurrentPage(
      type === PAGINATION_ARROW_TYPES.left ? currentPage - 1 : currentPage + 1,
    );
  };

  const setPagesTotalCount = () => {
    setPagesSize(Math.ceil(props.allIdsLen / LIMIT));
  };

  const onChangePage = (e: MouseEvent<HTMLButtonElement>) => {
    changePageEvent(e.currentTarget.id as PAGINATION_ARROW_TYPES);
  };

  return (
    <div className="pagination">
      <button
        id={PAGINATION_ARROW_TYPES.left}
        onClick={onChangePage}
        className={
          'arrow arrow-left ' +
          (currentPage !== START_PAGE_NUM ? 'arrow-active ' : 'arrow-disabled ')
        }
        disabled={currentPage === START_PAGE_NUM}
      ></button>
      <div className="pagination__info">
        <span className="pagination__info__currPage">{currentPage}</span>/
        <span className="pagination__info__maxPage">{pagesSize}</span>
      </div>
      <button
        id={PAGINATION_ARROW_TYPES.right}
        onClick={onChangePage}
        className={
          'arrow arrow-right ' +
          (pagesSize !== currentPage ? 'arrow-active ' : 'arrow-disabled ')
        }
        disabled={pagesSize === currentPage}
      ></button>
    </div>
  );
};
