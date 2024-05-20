import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProductTile from '../../components/ProductTile/ProductTile';
import './ProductList.scss';
import FilledButton from '../../components/FilledButton/FilledButton';
import SearchBar from '../../components/SearchBar/SearchBar';
import ScrollBar from '../../components/Scrollbar/ScrollBar';
import { getUrl } from '../../utils/navigation';
import { ROUTES } from '../../routes/routes';
import {
  ProductResponse,
  getProductsListApi,
  getFilteredProductsListApi,
  ProductFilters,
  ProductObject,
} from '../../services/product.service';
import { RootState } from '../../store/reducers';

const ProductList = (): ReactElement => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const {
    isAuthenticated,
  } = useSelector((state: RootState) => state.auth);

  const productName = queryParams.get('product') || '';
  const categoryName = queryParams.get('category') || '';
  const providerName = queryParams.get('provider') || '';
  const brandName = queryParams.get('brand') || '';

  const ingredientsString = queryParams.get('ingredients') || '';
  const ingredientNames = ingredientsString
    .split(',')
    .map((ingredient) => ingredient.trim());

  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductObject[]>([]);
  const [name, setName] = useState(productName);
  const [category, setCategory] = useState(categoryName);
  const [ingredients, setIngredients] = useState<string[]>(ingredientNames);
  const [provider, setProvider] = useState(providerName);
  const [brand, setBrand] = useState(brandName);

  const fetchFilteredProducts = async (params: ProductFilters) => {
    try {
      const response = await getFilteredProductsListApi(params);
      if (response && response.data) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getProductsListApi();
      if (response && response.data) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = () => {
    const params = {
      name,
      provider,
      brand,
    };

    const filterParams = {
      name,
      provider,
      brand,
    };
    fetchFilteredProducts(filterParams);
    navigate(getUrl(params, ROUTES.PRODUCTS));
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="product-list-page">
      <ScrollBar className="scrollbar-container">
        <ul className="product-grid">
          {products
            && products.map((product) => (
              <li key={product.id} className="product">
                <Link to={`/products/${product.id}`}>
                  <ProductTile
                    name={product.name}
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
              initialValue={productName}
              onChange={(value) => setName(value)}
            />
          </div>
          <div className="provider-search-container">
            <SearchBar
              label="Provider"
              placeholder="e.g. rossmann"
              onChange={(value) => setProvider(value)}
            />
          </div>
          <div className="brand-search-container">
            <SearchBar
              label="Brand"
              placeholder="e.g. lovely"
              onChange={(value) => setBrand(value)}
            />
          </div>
          <div className="ingredient-search-container">
            <SearchBar
              label="Ingredients"
              placeholder="e.g. shea butter"
              initialValue={ingredientNames.join(', ')}
              onChange={(value) => setIngredients(
                value.split(',').map((ingredient) => ingredient.trim()),
              )}
            />
          </div>
          <div className="category-search-container">
            <SearchBar
              label="Category"
              placeholder="e.g. skin care"
              onChange={(value) => setCategory(value)}
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
