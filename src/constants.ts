import md5 from 'md5';

export const API_URL = 'http://api.valantis.store:40000';

const CURR_TIMESTAMP_DATE = new Date()
  .toISOString()
  .split('')
  .filter((item) => item !== '-');

const PASSWORD = 'Valantis';

export const HEADERS = {
  'Content-type': 'application/json; charset=UTF-8',
  // 'X-Auth-Token': md5(`${PASSWORD}_${CURR_TIMESTAMP_DATE}`),
  'X-Auth': md5(`${PASSWORD}_${CURR_TIMESTAMP_DATE}`),
};

export const LIMIT = 50; // max item getting per one request to the api
export const OFFSET = 0;

export enum ROUTES {
  empty = '/',
  welcome = '/welcome',
  home = '/home',
}

export enum API_ACTION_TYPES {
  filter = 'filter',
  get_ids = 'get_ids',
  get_items = 'get_items',
  get_fields = 'get_fields',
}

export type API_PARAMS_TYPES = {
  offset: number;
  limit: number;
  ids?: string[];
};

export enum FILTER_PARAM_TYPES {
  price = 'price',
  brand = 'brand',
  name = 'name',
}

export interface IData {
  result: IProduct[];
}

export interface IProduct {
  brand: string | null;
  id: string;
  price: number;
  product: string;
}
