import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Tag from '../Tag/Tag';
import { TagColor } from '../../theme/tagColor';
import { ObjectWithNameAndId } from '../../types/objectWithNameAndId';

type SearchBarSelectorProps = {
    getSuggestions: (input: string) => Promise<ObjectWithNameAndId[] | null>;
    onElementChosen: (element: ObjectWithNameAndId) => void;
    onElementRemoved: (elementId: string) => void;
    selectedElements?: ObjectWithNameAndId[],
    tagsColor?: string;
    placeholder?: string;
    label?: string;
}

const SearchBarSelector = ({
  getSuggestions,
  onElementChosen,
  onElementRemoved,
  selectedElements = [],
  tagsColor = TagColor.INGREDIENT,
  placeholder,
  label,
}: SearchBarSelectorProps): JSX.Element => {
  const [suggestions, setSuggestions] = useState<ObjectWithNameAndId[] | null>(null);

  const onChange = async (value: string) => {
    const newSuggestions = await getSuggestions(value);
    setSuggestions(newSuggestions);
  };

  const onSuggestionClick = (suggestion: ObjectWithNameAndId) => {
    const isElementPresent = selectedElements.some((element) => element.id === suggestion.id);
    if (!isElementPresent) {
      onElementChosen(suggestion);
    }
  };

  return (
    <div className="search-bar-selector">
      <SearchBar
        label={label}
        placeholder={placeholder}
        suggestions={suggestions ?? undefined}
        onChange={onChange}
        onSuggestionClick={onSuggestionClick}
      />
      <div className="ingredient-tag-container">
        <div className="ingredients-tags">
          {selectedElements.map((element: ObjectWithNameAndId) => (
            <Tag
              key={element.id}
              text={element.name}
              color={tagsColor}
              onDelete={() => onElementRemoved(element.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBarSelector;
