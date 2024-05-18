import React, { ChangeEvent, useRef, useState } from 'react';
import './SearchBar.scss';

type Suggestion = {
  id: string;
  text: string;
};

type SearchBarProps = {
  label?: string;
  placeholder?: string;
  id?: string;
  initialValue?: string;
  suggestions?: Suggestion[];
  onChange?: (value: string) => void;
  onSuggestionClick?: (suggestion: Suggestion) => void;
};

const SearchBar = ({
  label = '',
  placeholder = '',
  id = '',
  initialValue = '',
  suggestions,
  onChange = () => {},
  onSuggestionClick = () => {},
}: SearchBarProps): JSX.Element => {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hitboxRef = useRef<HTMLDivElement | null>(null);

  suggestions = [
    { id: 't', text: 'test' },
    { id: 'tr2', text: 'testr2' },
  ];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    onChange(inputValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    // inputRef.current?.focus();
  };

  const handleUnfocus = () => {
    console.log(`${label} unfocused ${isFocused}`);
    if (!isFocused) {
      return;
    }
    // setIsFocused(false);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    onSuggestionClick(suggestion);
    handleUnfocus();
    console.log(`${label} suggestion clicked`);
  };

  return (
    <div className="search-bar-container">
      <label htmlFor={id} className="input-label">
        <div className="input-label-text">{label}</div>
        <input
          className="search-bar"
          type="text"
          id={id}
          ref={inputRef}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
        />
      </label>
      <div role="button" ref={hitboxRef} className="suggestions-hitbox">
        {suggestions != null && isFocused && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion: Suggestion) => (
              <li key={suggestion.id} className="suggestion-item">
                <button
                  className="suggestion-button"
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.text}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
