import { useEffect, useState } from 'react';
import {
  API_ACTION_TYPES,
  API_PARAMS_TYPES,
  IProduct,
  LIMIT,
  OFFSET,
} from '../constants';
import {
  filter as filterWithApi,
  getProductsIds,
  getProducts as getProductsFromApi,
} from '../api';

export const useGetProducts = (actionType: API_ACTION_TYPES) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [allIdsLen, setAllIdsLen] = useState<number>(0);
  const [paramsForReq, setParamsForReq] = useState<API_PARAMS_TYPES>({
    offset: OFFSET,
    limit: LIMIT,
  });

  const reqBody = {
    action: actionType,
    params: paramsForReq,
  };

  useEffect(() => {
    reqBody.params = paramsForReq;
    if (reqBody.action === API_ACTION_TYPES.filter) {
      filter();
    }
  }, [paramsForReq]);

  const getProducts = async () => {
    const reqBodyAllIds = {
      action: API_ACTION_TYPES.get_ids,
      params: {
        offset: OFFSET,
      },
    };
    const allIds = (await getProductsIds(reqBodyAllIds)) as string[]; // get all Ids for pagination
    setAllIdsLen(allIds.length);
    const res = (await getProductsFromApi(reqBody)) as IProduct[];
    setProducts(res);
  };

  const setFilterParams = (newSearchParams: API_PARAMS_TYPES) => {
    setParamsForReq(newSearchParams);
  };

  const filter = async () => {
    const res = (await filterWithApi(reqBody)) as IProduct[];
    setProducts(res); // TODO: почему не обновился ui после фильтрации - найти и починить
  };

  return { products, getProducts, setFilterParams, allIdsLen };
};
