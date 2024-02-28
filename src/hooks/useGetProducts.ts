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
  getProductsIds,
  getProducts as getProductsFromApi,
} from '../api';

export const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async (
    params: API_PARAMS_TYPES = { offset: OFFSET, limit: LIMIT },
  ) => {
    if (loading) {
      return;
    }

    setLoading(true);

    if (params?.offset === 0) {
      const allIds = await getProductsIds({
        action: API_ACTION_TYPES.get_ids,
        params: {
          offset: OFFSET,
        },
      }); // get all Ids for pagination
      setTotalCount(allIds.length || 0);
    }

    if (!params?.limit) {
      const res = await filterWithApi({
        action: API_ACTION_TYPES.filter,
        params,
      });
      setProducts(res);
      setTotalCount(res.length || 0);
      setLoading(false);
      return;
    }

    const res = await getProductsFromApi({
      action: API_ACTION_TYPES.get_ids,
      params,
    });
    setProducts(res);
    setLoading(false);
  };

  return {
    products,
    totalCount,
    getData,
    loading,
  };
};
