// ProductList.tsx

import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ProductTile from '../../components/ProductTile/ProductTile';
import products from '../../ProductsExample.json';
import './ProductList.scss'; // Import SCSS file for styling
import FilledButton from '../../components/FilledButton/FilledButton';
import SearchBar from '../../components/SearchBar/SearchBar';

const ProductList = (): ReactElement => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productName = queryParams.get('product') || '';
  const ingredientsString = queryParams.get('ingredients') || '';
  const ingredientNames = ingredientsString
    .split(',')
    .map((ingredient) => ingredient.trim());

  useEffect(() => {
    // Fetch products using productName and ingredientNames
  }, [productName, ingredientNames]);

  return (
    <div className="product-list-page">
      <Scrollbars
        className="scrollbar-container"
        renderThumbVertical={({ style, ...props }) => (
          <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            style={{
              ...style,
              backgroundColor: 'rgba(29, 108, 226, 0.27)',
              borderRadius: 10,
            }}
          />
        )}
        renderTrackVertical={({ style, ...props }) => (
          <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            style={{
              ...style,
              backgroundColor: 'rgba(29, 108, 226, 0.17)',
              borderRadius: 10,
              height: '100%',
              top: 0,
              right: 0,
            }}
          />
        )}
      >
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product">
              <ProductTile
                name={product.name}
                provider={product.provider}
                smallImageUrl={product.smallImageUrl}
                shortDescription={product.shortDescription}
                rating={3}
                isLiked
              />
            </div>
          ))}
        </div>
      </Scrollbars>
      <div className="filters-container">
        <div className="search-container">
          <div className="product-search-container">
            <SearchBar
              label="Product"
              placeholder="e.g. shampoo"
              initialValue={productName}
            />
          </div>
          <div className="ingredient-search-container">
            <SearchBar
              label="Ingredients"
              placeholder="e.g. shea butter"
              initialValue={ingredientNames.join(', ')}
            />
          </div>
          <div className="category-search-container">
            <SearchBar label="Category" placeholder="e.g. skin care" />
          </div>
          <div className="search-button-container">
            <FilledButton>Search</FilledButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
