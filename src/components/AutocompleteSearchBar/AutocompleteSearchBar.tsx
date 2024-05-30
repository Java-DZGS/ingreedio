import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import './AutocompleteSearchBar.scss';
import { ObjectWithNameAndId } from '../../types/objectWithNameAndId';

const DEBOUNCING_TIME_MS = 275;

type AutocompleteSearchBarProps = {
  label?: string;
  placeholder?: string;
  id?: string;
  initialValue?: string;
  suggestions?: ObjectWithNameAndId[];
  onChange?: (value: string) => void;
  onSuggestionClick?: (suggestion: ObjectWithNameAndId) => void;
};

const AutocompleteSearchBar = ({
  label = '',
  placeholder = '',
  id = '',
  initialValue = '',
  suggestions,
  onChange = () => {},
  onSuggestionClick = () => {},
}: AutocompleteSearchBarProps): JSX.Element => {
  const [value, setValue] = useState(initialValue);
  const [isSuggestionsDisplayed, setIsSuggestionsDisplayed] = useState<boolean>(false);
  const hitboxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      onChange(inputValue);
    }, DEBOUNCING_TIME_MS);
  };

  const handleInputFieldFocus = () => {
    setIsSuggestionsDisplayed(true);
  };

  const handleSuggestionClick = (suggestion: ObjectWithNameAndId) => {
    onSuggestionClick(suggestion);
    setValue('');
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

  useEffect(() => () => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
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
          value={value}
        />
      </label>
      <div role="button" ref={hitboxRef} className="suggestions-hitbox">
        {suggestions && suggestions.length > 0 && isSuggestionsDisplayed && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion: ObjectWithNameAndId) => (
            <li key={suggestion.id} className="suggestion-item">
              <button
                className="suggestion-button"
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </button>
            </li>
          ))}
        </ul>
        )}
      </div>
    </div>
  );
};

export default AutocompleteSearchBar;
