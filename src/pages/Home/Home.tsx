import { useEffect, useState } from 'react';
import { Form } from '../../components/Form';
import { ListOfData } from '../../components/ListOfData';
import { useGetProducts } from '../../hooks/useGetProducts';
import './Home.css';
import { Pagination } from '../../components/Pagination/Pagination';
import { LIMIT, PAGINATION_ARROW_TYPES } from '../../constants';
import loader from '../../assets/loader.gif';

export const Home = () => {
  const { products, getData, totalCount, loading } = useGetProducts();
  const [currOffset, setCurrOffset] = useState(LIMIT);
  const pagesSize = Math.ceil(totalCount / LIMIT);
  const currentPage = Math.abs(Math.ceil(currOffset / LIMIT));

  const changePageEvent = (type: PAGINATION_ARROW_TYPES) => {
    const offset = Math.abs(
      type === PAGINATION_ARROW_TYPES.left
        ? currOffset - LIMIT
        : currOffset + LIMIT,
    );
    setCurrOffset(offset);
    if (currOffset !== 0) {
      getData({ offset: offset, limit: LIMIT });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="home">
      <Form getData={getData} />
      {loading ? (
        <div className="loader">
          <img src={loader} alt="Loading..." />
        </div>
      ) : (
        <ListOfData products={products} />
      )}
      <Pagination
        numberPages={pagesSize}
        currentPage={currentPage}
        onLeftClick={() => changePageEvent(PAGINATION_ARROW_TYPES.left)}
        onRightClick={() => changePageEvent(PAGINATION_ARROW_TYPES.right)}
      />
    </div>
  );
};
