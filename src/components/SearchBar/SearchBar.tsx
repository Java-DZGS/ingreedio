import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
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
  useState<boolean>(true);
  const [isSuggestionsDisplayed, setIsSuggestionsDisplayed] = useState<boolean>(false);
  const hitboxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    onChange(inputValue);
  };

  const handleInputFieldFocus = () => {
    setIsSuggestionsDisplayed(true);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    onSuggestionClick(suggestion);
    setIsSuggestionsDisplayed(false);
  };

  const handleMouseClick = (event: MouseEvent) => {
    const clickInInputField: boolean = (!hitboxRef.current
        || hitboxRef.current.contains(event.target as Node))
        ?? false;

    const clickInSuggestions: boolean = (!inputRef.current
        || inputRef.current.contains(event.target as Node))
        ?? false;

    if (!clickInInputField && !clickInSuggestions) {
      setIsSuggestionsDisplayed(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleMouseClick);
    return () => {
      document.removeEventListener('click', handleMouseClick);
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
          onFocus={handleInputFieldFocus}
          autoComplete="off"
          name="input_autocomplete_off"
          value={value}
        />
      </label>
      <div role="button" ref={hitboxRef} className="suggestions-hitbox">
        {suggestions && suggestions.length > 0 && isSuggestionsDisplayed && (
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
