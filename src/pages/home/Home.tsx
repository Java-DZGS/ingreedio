import React, { ReactElement } from 'react';
import './Home.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilledButton from '../../components/FilledButton/FilledButton';

// eslint-disable-next-line arrow-body-style
const Home = (): ReactElement => {
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
            />
          </div>
          <div className="ingredient-search-container">
            <SearchBar
              id="ingredient-search"
              label="Ingredients"
              placeholder="e.g. shea butter"
            />
          </div>
          <div className="search-button-container">
            <div className="inner-search-button-container">
              <div className="search-button">
                <FilledButton label="Search" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
