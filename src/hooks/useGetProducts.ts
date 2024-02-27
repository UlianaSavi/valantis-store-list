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
import { usePagination } from './usePagination';

export const useGetProducts = (actionType: API_ACTION_TYPES) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [paramsForReq, setParamsForReq] = useState<API_PARAMS_TYPES>({
    offset: OFFSET,
    limit: LIMIT,
  });

  const { paginate } = usePagination();

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
    reqBody.params.limit = 0;
    const ids = (await getProductsIds(reqBody)) as string[];
    const paginateRes = paginate(ids.length);
    reqBody.params.limit = LIMIT;
    reqBody.params.offset = paginateRes.currOffset;
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

  return { products, getProducts, setFilterParams };
};
