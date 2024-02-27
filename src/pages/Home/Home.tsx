import { useEffect } from 'react';
import { Form } from '../../components/Form';
import { ListOfData } from '../../components/ListOfData';
import { useGetProducts } from '../../hooks/useGetProducts';
import { API_ACTION_TYPES } from '../../constants';
import './Home.css';
import { Pagination } from '../../components/Pagination/Pagination';

export const Home = () => {
  const actionType = API_ACTION_TYPES.get_ids;
  const { products, getProducts } = useGetProducts(actionType);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="home">
      <Form />
      <ListOfData products={products} />
      <Pagination />
    </div>
  );
};
