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

  // TODO как будешь сетить API_ACTION_TYPES.filter ? В целом полумай над фильтрацией - в ту ли сторону ты движешься.
  const body = {
    action: actionType,
    params: params, // TODO: типизировать params
  };

  const settings = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body),
  };

  useEffect(() => {
    fetch(API_URL, settings)
      .then((response) => response.json())
      .then((data: string[]) => {
        console.log('DATA: ', data);
        setProductsIds(data);
        setActionType(API_ACTION_TYPES.get_items);
      })
      .catch((err: Error) => {
        console.log(err.cause, err.message);
      });
  }, []);

  useEffect(() => {
    if (actionType === API_ACTION_TYPES.get_items) {
      setParams({
        offset: OFFSET,
        limit: LIMIT,
        ids: productsIds,
      });
      fetch(API_URL, settings)
        .then((response) => response.json())
        .then((data: IProduct[]) => {
          console.log('DATA: ', data);
          setProducts(data);
        })
        .catch((err: Error) => {
          console.log(err.message);
        });
    }
  }, [actionType]);

  return { products, setActionType };
};
