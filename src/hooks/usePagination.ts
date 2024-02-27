import { useRef } from 'react';
import { START_PAGE_NUM } from '../constants';

export const usePagination = () => {
  const containerRef = useRef(null);
  const pagesSize = 0;
  const currOffset = 0;
  const currentPage = START_PAGE_NUM;

  const changePageEvent = () => {
    console.log(123);
  };
  const paginate = (totalCount: number) => {
    console.log(totalCount);
    return { pagesSize, currentPage, currOffset };
  };

  return { paginate, changePageEvent, containerRef };
};
