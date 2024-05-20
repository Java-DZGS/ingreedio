// Home.tsx

import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { AxiosResponse } from 'axios';
import SearchBar, { Suggestion } from '../../components/SearchBar/SearchBar';
import FilledButton from '../../components/FilledButton/FilledButton';
import { ROUTES } from '../../routes/routes';
import { getUrl } from '../../utils/navigation';
import {
  IngredientObject,
  getIngredientsApi,
} from '../../services/ingredients.service';
import Tag from '../../components/Tag/Tag';

const Home = (): ReactElement => {
  const navigate = useNavigate();
  // todo: keep ingredients in a provider to not duplicate code between Home and Products list
  const [product, setProduct] = useState<string>('');
  const [ingredientsSuggestions, setIngredientsSuggestions] = useState<IngredientObject[] | null>(
    null,
  );

  const [selectedIngredients, setSelectedIngredients] = useState<IngredientObject[]>([]);

  const handleSearch = () => {
    const params = {
      product,
    };
    navigate(getUrl(params, ROUTES.PRODUCTS));
  };

  const onSearchBarChange = (query: string) => {
    if (query.length === 0) {
      setIngredientsSuggestions(null);
      return;
    }
    getIngredientsApi(query, 50).then(
      (value: AxiosResponse<IngredientObject[]>) => {
        setIngredientsSuggestions(value.data);
      },
    );
  };

  const onIngredientClick = (suggestion: Suggestion) => {
    if (selectedIngredients.find((value: IngredientObject) => value.id === suggestion.id)) {
      return;
    }
    setSelectedIngredients((prevIngredients: IngredientObject[]) => [...prevIngredients, { id: suggestion.id, name: suggestion.text }]);
  };

  const handleRemoveIngredient = (id: string) => {
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
        <div className="search-container">
          <SearchBar
            id="product-search"
            label="Product"
            placeholder="e.g. shampoo"
            onChange={(value) => setProduct(value)}
          />
          <SearchBar
            id="ingredient-search"
            label="Ingredients"
            placeholder="e.g. shea butter"
            suggestions={
                ingredientsSuggestions?.map((ingredient: IngredientObject): Suggestion => ({
                  id: ingredient.id,
                  text: ingredient.name,
                })) ?? undefined
              }
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
          <div className="ingredients-tags">
            {selectedIngredients.map((ingredient) => (
              <Tag
                key={ingredient.id}
                text={ingredient.name}
                onDelete={() => handleRemoveIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
