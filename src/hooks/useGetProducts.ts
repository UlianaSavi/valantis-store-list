import { useState } from 'react';
import {
  API_ACTION_TYPES,
  API_PARAMS_TYPES,
  IProduct,
  LIMIT,
  OFFSET,
} from '../constants';
import {
  filter as filterWithApi,
  getProducts as getProductsFromApi,
} from '../api';

export const useGetProducts = (actionType: API_ACTION_TYPES) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [paramsForReq, setParamsForReq] = useState<API_PARAMS_TYPES>({
    offset: OFFSET,
    limit: LIMIT,
  });

  const reqBody = {
    action: actionType,
    params: paramsForReq,
  };

  const getProducts = async () => {
    const res = (await getProductsFromApi(reqBody)) as IProduct[];
    setProducts(res);
  };

  const filter = async (newSearchParams: API_PARAMS_TYPES) => {
    setParamsForReq(newSearchParams); // TODO: по идее вот это не должно тут лежать тк если вызвать тут оно не успеет обновить paramsForReq перед filterWithApi
    const res = (await filterWithApi(reqBody)) as IProduct[];
    setProducts(res);
  };

  return { products, getProducts, filter };
};
