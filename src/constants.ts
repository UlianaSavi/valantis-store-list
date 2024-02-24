import md5 from 'md5';

export const API_URL = 'http://api.valantis.store:40000';

const CURR_MONTH =
  String(Number(new Date().getMonth() + 1)).length === 1
    ? `0${Number(new Date().getMonth() + 1)}`
    : Number(new Date().getMonth() + 1);
const CURR_DAY =
  String(Number(new Date().getDate())).length === 1
    ? `0${Number(new Date().getDate())}`
    : Number(new Date().getDate());
const CURR_YEAR = new Date().getFullYear();
const CURR_TIMESTAMP_DATE = `${CURR_YEAR}${CURR_MONTH}${CURR_DAY}`;

const PASSWORD = 'Valantis';

export const HEADERS = {
  'Content-type': 'application/json; charset=UTF-8',
  'X-Auth': md5(`${PASSWORD}_${CURR_TIMESTAMP_DATE}`),
};

export const LIMIT = 50; // max item getting per one request to the api
export const OFFSET = 0;
export const MIN_SEARCH_LEN = 3;

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
  offset?: number;
  limit?: number;
  ids?: string[];
  price?: FILTER_PARAM_TYPES.price;
  brand?: FILTER_PARAM_TYPES.brand;
  product?: FILTER_PARAM_TYPES.product;
};

export enum FILTER_PARAM_TYPES {
  none = '',
  price = 'price',
  brand = 'brand',
  product = 'product',
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
