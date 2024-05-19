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

const Home = (): ReactElement => {
  const navigate = useNavigate();
  // todo: keep ingredients in a provider to not duplicate code between Home and Products list
  const [product, setProduct] = useState('');
  const [ingredients, setIngredients] = useState<IngredientObject[] | null>(
    null,
  );

  const handleSearch = () => {
    const params = {
      product,
    };
    navigate(getUrl(params, ROUTES.PRODUCTS));
  };

  const onSearchBarChange = (query: string) => {
    getIngredientsApi(query, 10).then(
      (value: AxiosResponse<IngredientObject[]>) => {
        setIngredients(value.data);
      },
    );
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
          <div className="product-search-container">
            <SearchBar
              id="product-search"
              label="Product"
              placeholder="e.g. shampoo"
              onChange={(value) => setProduct(value)}
            />
          </div>
          <div className="ingredient-search-container">
            <SearchBar
              id="ingredient-search"
              label="Ingredients"
              placeholder="e.g. shea butter"
              suggestions={
                ingredients?.map((ingredient: IngredientObject): Suggestion => {
                  return {
                    id: ingredient.id,
                    text: ingredient.name,
                  };
                }) ?? undefined
              }
              onChange={onSearchBarChange}
            />
          </div>
          <div className="search-button-container">
            <div className="inner-search-button-container">
              <div className="search-button">
                <FilledButton onClick={handleSearch}>Search</FilledButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
