// Home.tsx

import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilledButton from '../../components/FilledButton/FilledButton';
import { ROUTES } from '../../routes/routes';

const Home = (): ReactElement => {
  const navigate = useNavigate();
  // todo: keep ingredients in a provider to not duplicate code between Home and Products list
  const [product, setProduct] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (product) queryParams.set('product', product);
    if (ingredients.length > 0) {
      const ingredientsString = ingredients.join(',');
      queryParams.set('ingredients', ingredientsString);
    }

    const searchUrl = `${ROUTES.PRODUCTS}?${queryParams.toString()}`;

    navigate(searchUrl);
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
              onChange={(value) => setIngredients(
                value.split(',').map((ingredient) => ingredient.trim()),
              )}
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
