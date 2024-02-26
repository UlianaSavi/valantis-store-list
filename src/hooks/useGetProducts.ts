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

  useEffect(() => {
    body = {
      action: actionType,
      params: params,
    };
  }, [actionType, params]);

  useEffect(() => {
    console.log('Getting data first time');
    try {
      (async () => {
        const response = await fetch(API_URL, settings);
        const idsArr: { result: string[] } = await response.json();
        const filteredIdsArr = Array.from(new Set(idsArr.result)); // filtering duplicates in IDs
        setProductsIds(filteredIdsArr);
        setActionType(API_ACTION_TYPES.get_items);
      })();
    } catch (error) {
      console.log('Error:', error);
    }
  }, []);

  useEffect(() => {
    console.log('get_items');
    if (actionType === API_ACTION_TYPES.get_items) {
      setParams({
        offset: OFFSET,
        limit: LIMIT,
        ids: productsIds,
      });
      if (productsIds) {
        try {
          (async () => {
            const response = await fetch(API_URL, settings);
            const data: { result: IProduct[] } = await response.json();
            setProducts(data.result);
          })();
        } catch (error) {
          console.log('Error:', error);
        }
      }
    }
  }, [actionType]);

  useEffect(() => {
    try {
      (async () => {
        const search = searchParams.get('search') || '';
        const type = search.split(':')[0] || '';
        const value = search.split(':')[1] || '';
        if (type.length && value.length) {
          console.log('type', type);
          console.log('value', value);
          setActionType(API_ACTION_TYPES.filter);
          setParams({
            [type]: value,
          });
        }
        if (actionType === API_ACTION_TYPES.filter) {
          const response = await fetch(API_URL, settings);
          const data: { result: string[] } = await response.json();
          setProductsIds(data.result);
          setActionType(API_ACTION_TYPES.get_items); // get products by filtered ids
        }
      })();
    } catch (error) {
      console.log('Error:', error);
    }
  }, [searchParams]);

  return { products, setActionType };
};
