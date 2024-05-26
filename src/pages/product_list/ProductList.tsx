import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProductTile from '../../components/ProductTile/ProductTile';
import './ProductList.scss';
import FilledButton from '../../components/FilledButton/FilledButton';
import SearchBar from '../../components/SearchBar/SearchBar';
import ScrollBar from '../../components/Scrollbar/ScrollBar';
import { ROUTES } from '../../routes/routes';
import {
  getProductsListApi,
  ProductCriteria,
  productCriteriaToUrl,
  ProductObject,
  urlToProductCriteria,
} from '../../services/product.service';
import { RootState } from '../../store/reducers';
import { IngredientObject, getIngredientsByIdsApi } from '../../services/ingredients.service';
import useEffectSingular from '../../hooks/useEffectSignular';

const ProductList = (): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isAuthenticated,
  } = useSelector((state: RootState) => state.auth);

  // Get product criteria basing on the page url
  const queryProductCriteria: ProductCriteria = urlToProductCriteria(location.search);

  // Current products displayed
  const [products, setProducts] = useState<ProductObject[]>([]);

  // Data recreated basing on the query product criteria
  const [phrase, setPhrase] = useState<string>(queryProductCriteria.phrase ?? '');
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientObject[] | null>(null);

  const fetchSelectedIngredients = async () => {
    if (queryProductCriteria.ingredientsToIncludeIds) {
      try {
        const response = await getIngredientsByIdsApi(queryProductCriteria.ingredientsToIncludeIds);
        if (response && response.data) {
          setSelectedIngredients(response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  };

  const fetchProducts = async (criteria: ProductCriteria) => {
    try {
      const response = await getProductsListApi(criteria);
      if (response && response.data) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = () => {
    const criteria: ProductCriteria = {
      phrase,
      ingredientsToIncludeIds: selectedIngredients?.map((ingr: IngredientObject) => ingr.id),
    };
    fetchProducts(criteria);
    navigate(productCriteriaToUrl(ROUTES.PRODUCTS, criteria));
  };

  useEffectSingular(() => {
    fetchProducts(queryProductCriteria);
    fetchSelectedIngredients();
  });

  return (
    <div className="product-list-page">
      <ScrollBar className="scrollbar-container">
        <ul className="product-grid">
          {products
            && products.map((product) => (
              <li key={product.id} className="product">
                <Link to={`/products/${product.id}`}>
                  <ProductTile
                    name={`${product.brand} ${product.name}`}
                    provider={product.provider}
                    smallImageUrl={product.smallImageUrl}
                    shortDescription={product.shortDescription}
                    rating={product.rating}
                    showLike={isAuthenticated}
                    isLiked={!!product.isLiked}
                  />
                </Link>
              </li>
            ))}
        </ul>
      </ScrollBar>
      <div className="filters-container">
        <div className="search-container">
          <div className="product-search-container">
            <SearchBar
              label="Product"
              placeholder="e.g. shampoo"
              initialValue={phrase}
              onChange={(value) => setPhrase(value)}
            />
          </div>
          <div className="provider-search-container">
            <SearchBar
              label="Provider"
              placeholder="e.g. rossmann"
              onChange={(_value) => console.log('Not implemented yet')}
            />
          </div>
          <div className="brand-search-container">
            <SearchBar
              label="Brand"
              placeholder="e.g. lovely"
              onChange={(_value) => console.log('Not implemented yet')}
            />
          </div>
          <div className="ingredient-search-container">
            <SearchBar
              label="Ingredients"
              placeholder="e.g. shea butter"
              onChange={(_value) => console.log('Not implemented yet')}
            />
          </div>
          <div className="category-search-container">
            <SearchBar
              label="Category"
              placeholder="e.g. skin care"
              onChange={(_value) => console.log('Not implemented yet')}
            />
          </div>
          <div className="search-button-container">
            <FilledButton onClick={handleSearch}>Search</FilledButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
