import { useEffect, useState } from 'react';
import {
  API_ACTION_TYPES,
  API_PARAMS_TYPES,
  API_URL,
  HEADERS,
  IProduct,
  LIMIT,
  OFFSET,
} from '../constants';
import { useSearchParams } from 'react-router-dom';

export const useGetProducts = () => {
  const [productsIds, setProductsIds] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [actionType, setActionType] = useState<API_ACTION_TYPES>(
    API_ACTION_TYPES.get_ids,
  );
  const [params, setParams] = useState<API_PARAMS_TYPES>({
    offset: OFFSET,
    limit: LIMIT,
  });

  const [searchParams] = useSearchParams();

  let body = {
    action: actionType,
    params: params,
  };

  const settings = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body),
  };

  const getProductsIds = async () => {
    try {
      const response = await fetch(API_URL, settings);
      const result: { result: string[] } = await response.json();
      const filteredResult = Array.from(new Set(result.result)); // filtering duplicates in IDs
      setProductsIds(filteredResult);
      setActionType(API_ACTION_TYPES.get_items);
    } catch (error) {
      if (error instanceof Error) {
        console.log('Catch error!');
        console.log('Error name ---> ', error.name);
        console.log('Error message ---> ', error.message);
        console.log(
          'The request has been sent again. This only works once - if the server returns an error again, reload the page',
        );
        // TODO: повторение запроса
      }
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetch(API_URL, settings);
      const data: { result: IProduct[] } = await response.json();
      setProducts(data.result);
    } catch (error) {
      if (error instanceof Error) {
        console.log('Catch error!');
        console.log('Error name ---> ', error.name);
        console.log('Error message ---> ', error.message);
        console.log(
          'The request has been sent again. This only works once - if the server returns an error again, reload the page',
        );
        // TODO: повторение запроса
      }
    }
  };

  const filter = async () => {
    try {
      const response = await fetch(API_URL, settings);
      const data: { result: string[] } = await response.json();
      setProductsIds(data.result);
      setActionType(API_ACTION_TYPES.get_items); // get products by filtered ids
    } catch (error) {
      if (error instanceof Error) {
        console.log('Catch error!');
        console.log('Error name ---> ', error.name);
        console.log('Error message ---> ', error.message);
        console.log(
          'The request has been sent again. This only works once - if the server returns an error again, reload the page',
        );
      }
    }
  };

  useEffect(() => {
    body = {
      action: actionType,
      params: params,
    };
  }, [actionType, params]);

  useEffect(() => {
    getProductsIds();
  }, []);

  useEffect(() => {
    if (actionType === API_ACTION_TYPES.get_items) {
      setParams({
        offset: OFFSET,
        limit: LIMIT,
        ids: productsIds,
      });
      if (productsIds) {
        getProducts();
      }
    }
  }, [actionType]);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const type = search.split(':')[0] || '';
    const value = search.split(':')[1] || '';
    if (type.length && value.length) {
      setActionType(API_ACTION_TYPES.filter);
      setParams({
        [type]: value,
      });
    }
    if (actionType === API_ACTION_TYPES.filter) {
      filter();
    }
  }, [searchParams]);

  return { products, setActionType };
};
