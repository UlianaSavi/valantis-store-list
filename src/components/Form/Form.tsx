import { useState, ChangeEvent } from 'react';
import './Form.css';
import { useSearchParams } from 'react-router-dom';
import {
  API_ACTION_TYPES,
  FILTER_PARAM_TYPES,
  MIN_SEARCH_LEN,
} from '../../constants';
import { useGetProducts } from '../../hooks/useGetProducts';

export const Form = () => {
  const [query, setQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<FILTER_PARAM_TYPES>(
    FILTER_PARAM_TYPES.none,
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const actionType = API_ACTION_TYPES.filter;
  const { filter } = useGetProducts(actionType);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (
      query.length >= MIN_SEARCH_LEN &&
      searchType !== FILTER_PARAM_TYPES.none
    ) {
      setSearchParams({ search: `${searchType}:${query}` });
      const search = searchParams.get('search') || '';
      const type = search.split(':')[0] || '';
      const value = search.split(':')[1] || '';
      if (type.length && value.length) {
        filter({
          [type]: value,
        });
      }
    }
  };

  const onSearchTypeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value as FILTER_PARAM_TYPES);
    if (
      query.length >= MIN_SEARCH_LEN &&
      searchType !== FILTER_PARAM_TYPES.none
    ) {
      setSearchParams({ search: `${searchType}:${query}` });
    }
  };

  return (
    <form className="form">
      <input
        className="form__input input"
        type={searchType === FILTER_PARAM_TYPES.price ? 'number' : 'text'}
        placeholder="Enter repo name for search"
        onChange={onSearchChange}
      />
      <label htmlFor="select">Choose field searching type:</label>
      <select onChange={onSearchTypeSelect} name="select" id="select">
        <option value="">--Please choose an option--</option>
        <option value={FILTER_PARAM_TYPES.brand}>
          {FILTER_PARAM_TYPES.brand}
        </option>
        <option value={FILTER_PARAM_TYPES.price}>
          {FILTER_PARAM_TYPES.price}
        </option>
        <option value={FILTER_PARAM_TYPES.product}>
          {FILTER_PARAM_TYPES.product}
        </option>
      </select>
    </form>
  );
};
