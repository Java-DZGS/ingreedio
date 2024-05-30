import React, { ChangeEvent, useState } from 'react';
import './SearchBar.scss';

type SearchBarProps = {
  label?: string;
  placeholder?: string;
  id?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
};

const SearchBar = ({
  label = '',
  placeholder = '',
  id = '',
  initialValue = '',
  onChange = () => {},
}: SearchBarProps): JSX.Element => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };
  return (
    <label htmlFor={id} className="input-label">
      <div className="input-label-text">{label}</div>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="search-bar"
        onChange={handleChange}
        value={value}
      />
    </label>
  );
};

export default SearchBar;
