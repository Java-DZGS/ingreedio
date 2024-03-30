import React from 'react';
import './SearchBar.scss';

type SearchBarProps = {
  placeholder?: string;
  id?: string;
};

const SearchBar = ({
  placeholder = '',
  id = '',
}: SearchBarProps): JSX.Element => (
  <input type="text" id={id} placeholder={placeholder} className="search-bar" />
);

export default SearchBar;
