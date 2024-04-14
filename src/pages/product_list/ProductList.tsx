// ProductList.tsx

import React, { ReactElement, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductTile from '../../components/ProductTile/ProductTile';
import './ProductList.scss';
import FilledButton from '../../components/FilledButton/FilledButton';
import SearchBar from '../../components/SearchBar/SearchBar';
import ScrollBar from '../../components/Scrollbar/ScrollBar';
import { getUrl } from '../../utils/navigation';
import { ROUTES } from '../../routes/routes';
import { RootState } from '../../store/reducers';
import actions from '../../store/actions';
import { ProductResponse, getProductsListApi } from '../../services/productService/product.service';

const ProductList = (): ReactElement => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const productName = queryParams.get('product') || '';
  const categoryName = queryParams.get('category') || '';

  const ingredientsString = queryParams.get('ingredients') || '';
  const ingredientNames = ingredientsString
    .split(',')
    .map((ingredient) => ingredient.trim());

  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [product, setProduct] = useState(productName);
  const [category, setCategory] = useState(categoryName);
  const [ingredients, setIngredients] = useState<string[]>(ingredientNames);

  const fetchProducts = async () => {
    try {
      const response = await getProductsListApi(accessToken);
      if (response && response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = () => {
    const params = {
      product,
      ingredients: ingredients.join(','),
      category,
    };
    fetchProducts();
    navigate(getUrl(params, ROUTES.PRODUCTS));
  };

  useEffect(() => {
    fetchProducts();
  }, [accessToken]);

  return (
    <div className="product-list-page">
      <ScrollBar className="scrollbar-container">
        <ul className="product-grid">
          {products
          && products.map((product) => (
            <li key={product.id} className="product">
              <Link to={`/products/${product.id}`}>
                <ProductTile
                  id={product.id}
                  name={product.name}
                  provider={product.provider}
                  smallImageUrl={product.smallImageUrl}
                  shortDescription={product.shortDescription}
                  rating={3}
                  isLiked
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
              onChange={(value) => setProduct(value)}
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
