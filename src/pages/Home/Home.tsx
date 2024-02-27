import { useEffect, useState } from 'react';
import { Form } from '../../components/Form';
import { ListOfData } from '../../components/ListOfData';
import { useGetProducts } from '../../hooks/useGetProducts';
import './Home.css';
import { Pagination } from '../../components/Pagination/Pagination';
import { LIMIT, PAGINATION_ARROW_TYPES } from '../../constants';

export const Home = () => {
  const { products, getData, totalCount } = useGetProducts();
  const [currOffset, setCurrOffset] = useState(LIMIT);
  const pagesSize = Math.ceil(totalCount / LIMIT);
  const currentPage = Math.abs(Math.ceil(currOffset / LIMIT));

  const getProductsWithOffsetCallback = (offset: number) => {
    getData({ offset, limit: LIMIT });
  };

  const changePageEvent = (type: PAGINATION_ARROW_TYPES) => {
    const offset = Math.abs(
      type === PAGINATION_ARROW_TYPES.left
        ? currOffset - LIMIT
        : currOffset + LIMIT,
    );
    setCurrOffset(offset);
    if (currOffset !== 0) {
      getProductsWithOffsetCallback(offset);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="home">
      <Form />
      <ListOfData products={products} />
      <Pagination
        numberPages={pagesSize}
        currentPage={currentPage}
        onLeftClick={() => changePageEvent(PAGINATION_ARROW_TYPES.left)}
        onRightClick={() => changePageEvent(PAGINATION_ARROW_TYPES.right)}
      />
    </div>
  );
};
