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

  const body = {
    action: actionType,
    params: params,
  };

  const settings = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body),
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(API_URL, settings);
        const idsArr: { result: string[] } = await response.json();
        console.log('idsArr', idsArr);
        setProductsIds(idsArr.result);
        setActionType(API_ACTION_TYPES.get_items);
      } catch (error) {
        console.error('Error:', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (actionType === API_ACTION_TYPES.get_items) {
      setParams({
        offset: OFFSET,
        limit: LIMIT,
        ids: productsIds,
      });
      if (params.ids) {
        (async () => {
          try {
            const response = await fetch(API_URL, settings);
            const data: { result: IProduct[] } = await response.json();
            console.log('DATA: ', data);
            setProducts(data.result);
          } catch (error) {
            console.error('Error:', error);
          }
        })();
      }
    }
  }, [actionType]);

  return { products, setActionType };
};
