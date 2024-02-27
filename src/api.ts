import {
  API_ACTION_TYPES,
  API_URL,
  HEADERS,
  IProduct,
  MAX_RETRY_NUM,
  reqBody,
} from './constants';

export const getProducts = (body: reqBody) =>
  apiWithRetries(getProductsReq, body, MAX_RETRY_NUM);

export const filter = (body: reqBody) =>
  apiWithRetries(filterReq, body, MAX_RETRY_NUM);

export const getProductsIds = (body: reqBody) =>
  apiWithRetries(getProductsIdsReq, body, MAX_RETRY_NUM);

const apiWithRetries = async (
  requestFn: (body: reqBody) => Promise<Error | IProduct[] | string[]>,
  reqBody: reqBody,
  retries: number,
): Promise<IProduct[] | string[]> => {
  let i = 0;
  let res: Error | IProduct[] | string[] = [];
  while (i < retries && (res instanceof Error || res.length === 0)) {
    i++;
    const data = await requestFn(reqBody);
    res = data;
  }
  if (res instanceof Error && i >= retries) {
    console.error('Too many retries');
    return [];
  }
  return res as IProduct[] | string[];
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
    body.params.ids = ids as string[];
    body.action = API_ACTION_TYPES.get_items;
    const bodyToStr = JSON.stringify(body);
    req.body = bodyToStr; // set IDS and action for getProducts
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
