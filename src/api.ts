import {
  API_ACTION_TYPES,
  API_URL,
  HEADERS,
  IProduct,
  MAX_RETRY_NUM,
  reqBody,
} from './constants';

type ApiCall<Params, Response> = (props: Params) => Promise<Response | Error>;

export const getProducts = async (body: reqBody) => {
  try {
    const res = await apiWithRetries({
      requestFn: getProductsReq,
      reqBody: body,
      retries: MAX_RETRY_NUM,
    });

    return res as IProduct[];
  } catch (error) {
    return [];
  }
};

export const filter = async (body: reqBody) => {
  try {
    const res = await apiWithRetries({
      requestFn: filterReq,
      reqBody: body,
      retries: MAX_RETRY_NUM,
    });

    return res as IProduct[];
  } catch (error) {
    return [];
  }
};

export const getProductsIds = async (body: reqBody) => {
  try {
    const res = await apiWithRetries({
      requestFn: getProductsIdsReq,
      reqBody: body,
      retries: MAX_RETRY_NUM,
    });

    return res as string[];
  } catch (error) {
    return [];
  }
};

type WithRetries<Params, Response> = {
  requestFn: ApiCall<Params, Response>;
  reqBody: Params;
  retries: number;
};
type WithRetriesFn = <Params, Response>(
  props: WithRetries<Params, Response>,
) => ReturnType<ApiCall<Params, Response>>;

const apiWithRetries: WithRetriesFn = async ({
  requestFn,
  reqBody,
  retries,
}) => {
  let i = 0;
  while (i < retries - 1) {
    i++;
    try {
      const data = await requestFn(reqBody);
      return data;
    } catch (error) {
      console.error('Too many retries');
      throw new Error();
    }
  }
  const data = await requestFn(reqBody);
  return data;
};

const req = {
  method: 'POST',
  headers: HEADERS,
  body: '',
};

const getProductsReq = async (body: reqBody) => {
  if (!body.params.ids) {
    delete body.params.ids;
    const ids = await getProductsIds(body);
    body = {
      action: API_ACTION_TYPES.get_items,
      params: {
        ids: ids as string[],
      },
    }; // set IDS and action for getProducts
  }
  try {
    req.body = JSON.stringify(body);
    const response = await fetch(API_URL, req);
    const data: { result: IProduct[] } = await response.json();
    return data.result;
  } catch (error) {
    if (error instanceof Error) {
      logError(error);
      return error;
    }
    return error as Error;
  }
};

const getProductsIdsReq = async (body: reqBody) => {
  req.body = JSON.stringify(body);
  try {
    const response = await fetch(API_URL, req);
    const result: { result: string[] } = await response.json();
    const filteredResult = Array.from(new Set(result.result)); // filtering duplicates in IDs array
    return filteredResult;
  } catch (error) {
    if (error instanceof Error) {
      logError(error);
      return error;
    }
    return error as Error;
  }
};

const filterReq = async (body: reqBody) => {
  req.body = JSON.stringify(body);
  try {
    const response = await fetch(API_URL, req);
    const ids: { result: string[] } = await response.json();
    body.params = {
      ids: ids.result as string[],
    };
    body.action = API_ACTION_TYPES.get_items;
    const data = await getProducts(body);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      logError(error);
      return error;
    }
    return error as Error;
  }
};

const logError = (error: Error) => {
  console.log('Catch error!');
  console.log('Error name ---> ', error.name);
  console.log('Error message ---> ', error.message);
  console.log(
    'The request has been sent again. This only works once - if the server returns an error again, reload the page',
  );
};
