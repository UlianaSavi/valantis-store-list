import { useState, ChangeEvent, FormEvent } from 'react';
import './Form.css';
import { useSearchParams } from 'react-router-dom';

export const Form = () => {
  const [query, setQuery] = useState<string>('');
  const [, setSearchParams] = useSearchParams();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const search = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchParams({ search: query });
  };

  return (
    <form className="form">
      <input
        className="form__input input"
        type="text"
        placeholder="Enter repo name for search"
        value={query}
        onChange={onChange}
      />
      <button type="submit" className="form__btn btn" onClick={search}>
        Get
      </button>
    </form>
  );
};
