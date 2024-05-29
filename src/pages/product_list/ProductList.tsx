import React, { ReactElement, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import ProductTile from '../../components/ProductTile/ProductTile';
import './ProductList.scss';
import FilledButton from '../../components/FilledButton/FilledButton';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductListScrollBar from '../../components/ProductListScrollBar/ProductListScrollBar';
import { ROUTES } from '../../routes/routes';
import {
  getProductsListApi,
  ProductCriteria,
  productCriteriaToUrl,
  ProductObject,
  urlToProductCriteria,
} from '../../services/product.service';
import { RootState } from '../../store/reducers';
import {
  IngredientObject,
  getIngredientsByIdsApi,
} from '../../services/ingredients.service';

const ProductList = (): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const queryProductCriteria: ProductCriteria = urlToProductCriteria(
    location.search,
  );

  const [products, setProducts] = useState<ProductObject[]>([]);
  const [phrase, setPhrase] = useState<string>(
    queryProductCriteria.phrase ?? '',
  );
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientObject[] | null
  >(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchSelectedIngredients = useCallback(async () => {
    if (queryProductCriteria.ingredientsToIncludeIds) {
      try {
        const response = await getIngredientsByIdsApi(
          queryProductCriteria.ingredientsToIncludeIds,
        );
        if (response && response.data) {
          setSelectedIngredients(response.data);
        }
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    }
  }, [queryProductCriteria.ingredientsToIncludeIds]);

  const fetchProducts = async (criteria: ProductCriteria, page: number) => {
    if (isFetching || page >= totalPages) return;

    setIsFetching(true);
    try {
      const response = await getProductsListApi(criteria, page);
      if (response && response.data) {
        setProducts((prevProducts) => {
          const newProducts = response.data.products.filter(
            (newProduct) =>
              !prevProducts.some((product) => product.id === newProduct.id),
          );
          return [...prevProducts, ...newProducts];
        });
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSearch = () => {
    const criteria: ProductCriteria = {
      phrase,
      ingredientsToIncludeIds: selectedIngredients?.map(
        (ingr: IngredientObject) => ingr.id,
      ),
    };
    setProducts([]);
    setPageNumber(0);
    setTotalPages(1);
    fetchProducts(criteria, 0);
    navigate(productCriteriaToUrl(ROUTES.PRODUCTS, criteria));
  };

  useEffect(() => {
    fetchProducts(queryProductCriteria, pageNumber);
    fetchSelectedIngredients();
  }, [pageNumber]);

  const loadMoreProducts = () => {
    if (!isFetching) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  return (
    <div className="product-list-page">
      <ProductListScrollBar
        className="scrollbar-container"
        onLoadMore={loadMoreProducts}
      >
        <ul className="product-grid">
          {products.map((product) => (
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
        {isFetching && (
          <div className="loading-indicator">
            <ClipLoader size={35} color={'#123abc'} loading={true} />
          </div>
        )}
      </ProductListScrollBar>
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
