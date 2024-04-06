import React from 'react';
import './SearchBar.scss';

type SearchBarProps = {
  label?: string;
  placeholder?: string;
  id?: string;
  onChange?: (value: string) => void;
};

const SearchBar = ({
  label = '',
  placeholder = '',
  id = '',
  onChange = () => {},
}: SearchBarProps): JSX.Element => (
  <label htmlFor={id} className="input-label">
    <div className="input-label-text">{label}</div>
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      className="search-bar"
      onChange={(event) => onChange(event.target.value)}
    />
  </label>
);

export default SearchBar;
