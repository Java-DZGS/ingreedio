import React from 'react';
import './SearchBar.scss';

type SearchBarProps = {
  label?: string;
  placeholder?: string;
  id?: string;
};

const SearchBar = ({
  label = '',
  placeholder = '',
  id = '',
}: SearchBarProps): JSX.Element => (
  <label htmlFor={id} className="input-label">
    <div className="input-label-text">{label}</div>
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      className="search-bar"
    />
  </label>
);

export default SearchBar;
