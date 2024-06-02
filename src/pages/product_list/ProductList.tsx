import React, { ReactElement, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import ProductTile from '../../components/ProductTile/ProductTile';
import './ProductList.scss';
import FilledButton from '../../components/FilledButton/FilledButton';
import SearchBar from '../../components/SearchBar/SearchBar';
import PagingScrollBar from '../../components/PagingScrollBar/PagingScrollBar';
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
import {
  IngredientObject,
  getIngredientsApi,
  getIngredientsByIdsApi,
} from '../../services/ingredients.service';
import useEffectSingular from '../../hooks/useEffectSignular';
import SearchBarTagsSelector from '../../components/SearchBarTagsSelector/SearchBarTagsSelector';
import { ObjectWithNameAndId } from '../../types/objectWithNameAndId';
import { TagColor } from '../../theme/tagColor';

const MAX_INGREDIENTS_SUGGESTIONS = 50;

const ProductList = (): ReactElement => {
  const allergensSelector = useSelector(
    (state: RootState) => state.like.dislikedIngredients,
  );
  const hasAllergens: boolean = allergensSelector?.length > 0;

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const queryProductCriteria: ProductCriteria = urlToProductCriteria(
    location.search,
  );

  const [products, setProducts] = useState<ProductObject[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // Data recreated basing on the query product criteria
  const [phrase, setPhrase] = useState<string>(
    queryProductCriteria.phrase ?? '',
  );
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientObject[] | null
  >(null);

  const fetchIngredientsSuggestions = async (
    query: string,
  ): Promise<ObjectWithNameAndId[] | null> => {
    if (query.length === 0) {
      return null;
    }
    const ingredientsResponse = await getIngredientsApi(
      query,
      MAX_INGREDIENTS_SUGGESTIONS,
      hasAllergens,
    );
    return ingredientsResponse.data;
  };

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
    // TODO: fetchSelectedBrands, fetchSelectedProviders, fetchSelectedCategories (get by ids)

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
      sortingCriteria: queryProductCriteria.sortingCriteria,
    };
    setProducts([]);
    setPageNumber(0);
    setTotalPages(1);
    fetchProducts(criteria, 0);
    navigate(productCriteriaToUrl(ROUTES.PRODUCTS, criteria));
  };

  useEffectSingular(() => {
    fetchProducts(queryProductCriteria, pageNumber);
    fetchSelectedIngredients();
  });

  const loadMoreProducts = () => {
    if (!isFetching) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
    if (pageNumber > 0) fetchProducts(queryProductCriteria, pageNumber);
  };

  return (
    <div className="product-list-page">
      <PagingScrollBar
        className="scrollbar-container"
        onLoadMore={loadMoreProducts}
      >
        <ul className="product-grid">
          {products.length === 0 && !isFetching && (
            <div className="no-products-message">No products found</div>
          )}
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
            <ClipLoader size={35} color="#123abc" loading />
          </div>
        )}
      </PagingScrollBar>
      <div className="filters-container">
        <ScrollBar>
          <div className="search-container">
            <div className="product-search-container">
              <SearchBar
                label="Product"
                placeholder="e.g. shampoo"
                initialValue={phrase}
                onChange={(value) => setPhrase(value)}
              />
            </div>
            <div className="ingredient-search-container">
              <SearchBarTagsSelector
                getSuggestions={fetchIngredientsSuggestions}
                onElementChosen={(element: ObjectWithNameAndId) =>
                  setSelectedIngredients((old: IngredientObject[] | null) =>
                    (old ? [...old, element] : [element]))}
                onElementRemoved={(id: string) =>
                  setSelectedIngredients(
                    (old: IngredientObject[] | null) =>
                      old?.filter(
                        (ingredient: IngredientObject) => ingredient.id !== id,
                      ) ?? null,
                  )}
                selectedElements={selectedIngredients ?? undefined}
                label="Ingredients"
                placeholder="e.g. shea butter"
                tagsColor={TagColor.INGREDIENT}
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
        </ScrollBar>
      </div>
    </div>
  );
};

export default ProductList;
