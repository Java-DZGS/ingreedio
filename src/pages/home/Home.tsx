// Home.tsx

import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import AutocompleteSearchBar from '../../components/AutocompleteSearchBar/AutocompleteSearchBar';
import FilledButton from '../../components/FilledButton/FilledButton';
import { ROUTES } from '../../routes/routes';
import {
  IngredientObject,
  getIngredientsApi,
} from '../../services/ingredients.service';
import Tag from '../../components/Tag/Tag';
import { ProductCriteria, productCriteriaToUrl } from '../../services/product.service';
import { TagColor } from '../../theme/tagColor';
import { ObjectWithNameAndId } from '../../types/objectWithNameAndId';
import SearchBar from '../../components/SearchBar/SearchBar';
import { RootState } from '../../store/reducers';

const MAX_INGREDIENTS_SUGGESTIONS = 50;

const Home = (): ReactElement => {
  const hasAllergens: boolean = useSelector((state: RootState) => state.like.dislikedIngredients)
    ?.length > 0 ?? false;

  const navigate = useNavigate();
  // todo: keep ingredients in a provider to not duplicate code between Home and Products list
  const [phrase, setPhrase] = useState<string>('');
  const [ingredientsSuggestions, setIngredientsSuggestions] = useState<
    IngredientObject[] | null
  >(null);

  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientObject[]
  >([]);

  const handleSearch = () => {
    const criteria: ProductCriteria = {
      phrase,
      ingredientsToIncludeIds: selectedIngredients?.map((ingr: IngredientObject) => ingr.id),
    };
    navigate(productCriteriaToUrl(ROUTES.PRODUCTS, criteria));
  };

  const onSearchBarChange = (query: string) => {
    if (query.length === 0) {
      setIngredientsSuggestions(null);
      return;
    }
    getIngredientsApi(query, MAX_INGREDIENTS_SUGGESTIONS, hasAllergens).then(
      (value: AxiosResponse<IngredientObject[]>) => {
        setIngredientsSuggestions(value.data);
      },
    );
  };

  const onIngredientClick = (suggestion: ObjectWithNameAndId) => {
    if (
      selectedIngredients.find(
        (value: IngredientObject) => value.id === suggestion.id,
      )
    ) {
      return;
    }
    setSelectedIngredients((prevIngredients: IngredientObject[]) => [
      ...prevIngredients,
      suggestion,
    ]);
  };

  const handleRemoveIngredient = (id: string) => {
    // eslint-disable-next-line max-len
    setSelectedIngredients((prevIngredients: IngredientObject[]) => prevIngredients.filter((ingredient) => ingredient.id !== id));
  };

  return (
    <div className="home-screen">
      <div className="centered-component">
        <div className="title-container">
          <h1 className="title">
            Search products by
            <span className="green-highlight"> ingredients</span>
          </h1>
        </div>
        <form className="search-container" onSubmit={handleSearch}>
          <SearchBar
            id="product-search"
            label="Product"
            placeholder="e.g. shampoo"
            onChange={(value) => setPhrase(value)}
          />
          <AutocompleteSearchBar
            id="ingredient-search"
            label="Ingredients"
            placeholder="e.g. shea butter"
            suggestions={ingredientsSuggestions ?? undefined}
            onChange={onSearchBarChange}
            onSuggestionClick={onIngredientClick}
          />
          <div className="search-button-container">
            <div className="inner-search-button-container">
              <div className="search-button">
                <FilledButton onClick={handleSearch}>Search</FilledButton>
              </div>
            </div>
          </div>
          <div />
          <div className="ingredient-tag-container">
            <div className="ingredients-tags">
              {selectedIngredients.map((ingredient) => (
                <Tag
                  key={ingredient.id}
                  text={ingredient.name}
                  color={TagColor.INGREDIENT}
                  onDelete={() => handleRemoveIngredient(ingredient.id)}
                />
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
