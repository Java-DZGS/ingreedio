import React, { ChangeEvent, useState, useEffect } from 'react';
import './AutoCompleteSearchBar.scss';
import '../SearchBar/SearchBar.scss';

type SearchBarProps = {
  label?: string;
  placeholder?: string;
  id?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
  autocompletionValues?: string[]; // Add autocompletion values prop
};

const AutoCompleteSearchBar = ({
  label = '',
  placeholder = '',
  id = '',
  initialValue = '',
  onChange = () => {},
  autocompletionValues = [], // Default empty array for autocompletion values
}: SearchBarProps): JSX.Element => {
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setValue(query);
    onChange(query);
    if (query.trim() === '') {
      setSuggestions([]); // Clear suggestions when input is empty
    } else {
      const filteredSuggestions = autocompletionValues.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    onChange(suggestion);
    setSuggestions([]); // Clear suggestions after selection
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
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </label>
  );
};

export default AutoCompleteSearchBar;
