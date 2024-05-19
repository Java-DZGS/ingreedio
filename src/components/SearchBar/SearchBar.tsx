import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './SearchBar.scss';

export type Suggestion = {
  id: string;
  text: string;
};

type SearchBarProps = {
  label?: string;
  placeholder?: string;
  id?: string;
  initialValue?: string;
  suggestions?: Suggestion[];
  fetchSuggestions?: (value: Suggestion) => void;
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
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hitboxRef = useRef<HTMLDivElement | null>(null);

  console.log(suggestions);

  const [suggestionsIn, setSuggestionsIn] = useState<Suggestion[] | undefined>([
    { id: 'gowno', text: 'test1' },
    { id: 'gowno1', text: 'test2 },
  ]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    onChange(inputValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const handleUnfocus = () => {
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSuggestionsIn(undefined);
    onSuggestionClick(suggestion);
    handleUnfocus();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      hitboxRef.current &&
      !hitboxRef.current.contains(event.target as Node)
    ) {
      handleUnfocus();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

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
      <div
        role="button"
        ref={hitboxRef}
        className="suggestions-hitbox"
        tabIndex={-1}
        onClick={handleFocus}
      >
        {suggestionsIn != null && (
          <ul className="suggestions-list">
            {suggestionsIn.map((suggestionIn: Suggestion) => (
              <li key={suggestionIn.id} className="suggestion-item">
                <button
                  className="suggestion-button"
                  type="button"
                  onClick={() => handleSuggestionClick(suggestionIn)}
                >
                  {suggestionIn.text}
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
