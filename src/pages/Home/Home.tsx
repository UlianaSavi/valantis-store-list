import { useEffect } from 'react';
import { Form } from '../../components/Form';
import { ListOfData } from '../../components/ListOfData';
import { useGetProducts } from '../../hooks/useGetProducts';
import { API_ACTION_TYPES } from '../../constants';
import './Home.css';

export const Home = () => {
  const actionType = API_ACTION_TYPES.get_items;
  const { products, getProducts } = useGetProducts(actionType);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="home">
      <Form />
      <ListOfData products={products} />
    </div>
  );
};
