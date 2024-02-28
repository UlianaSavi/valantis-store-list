import { useState, ChangeEvent, useEffect } from 'react';
import './Form.css';
import { useSearchParams } from 'react-router-dom';
import {
  API_PARAMS_TYPES,
  FILTER_PARAM_TYPES,
  MIN_SEARCH_LEN,
} from '../../constants';

type FormProps = {
  getData: (params?: API_PARAMS_TYPES) => Promise<void>;
};

export const Form = ({ getData }: FormProps) => {
  const [query, setQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<FILTER_PARAM_TYPES>(
    FILTER_PARAM_TYPES.none,
  );
  const [, setSearchParams] = useSearchParams();

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const onSearchTypeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value as FILTER_PARAM_TYPES);
  };

  useEffect(() => {
    setSearchParams('');
  }, []);

  useEffect(() => {
    if (
      query.length >= MIN_SEARCH_LEN &&
      searchType !== FILTER_PARAM_TYPES.none
    ) {
      setSearchParams({ search: `${searchType}:${query}` });
      if (searchType.length && query.length) {
        const val =
          searchType === FILTER_PARAM_TYPES.price ? Number(query) : query;
        getData({
          [searchType]: val,
        });
      }
    }
  }, [searchType, query]);

  return (
    <form className="form">
      <input
        className="form__input input"
        type={searchType === FILTER_PARAM_TYPES.price ? 'number' : 'text'}
        placeholder="Write for search..."
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
