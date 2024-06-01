import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProductTile from '../../components/ProductTile/ProductTile';
import './ProductList.scss';
import FilledButton from '../../components/FilledButton/FilledButton';
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
import { IngredientObject, getIngredientsApi, getIngredientsByIdsApi } from '../../services/ingredients.service';
import useEffectSingular from '../../hooks/useEffectSignular';
import SearchBarTagsSelector from '../../components/SearchBarTagsSelector/SearchBarTagsSelector';
import { ObjectWithNameAndId } from '../../types/objectWithNameAndId';
import { TagColor } from '../../theme/tagColor';
import SearchBar from '../../components/SearchBar/SearchBar';

const MAX_INGREDIENTS_SUGGESTIONS = 50;

const ProductList = (): ReactElement => {
  const allergensSelector = useSelector((state: RootState) => state.like.dislikedIngredients);
  const hasAllergens: boolean = allergensSelector?.length > 0;

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

  const fetchIngredientsSuggestions = async (query: string):
  Promise<ObjectWithNameAndId[] | null> => {
    if (query.length === 0) {
      return null;
    }
    const ingredientsResponse = await getIngredientsApi(
      query, MAX_INGREDIENTS_SUGGESTIONS, hasAllergens,
    );
    return ingredientsResponse.data;
  };

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

  // TODO: fetchSelectedBrands, fetchSelectedProviders, fetchSelectedCategories (get by ids)

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
      sortingCriteria: queryProductCriteria.sortingCriteria,
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
                onElementChosen={(element: ObjectWithNameAndId) => setSelectedIngredients(
                  (old: IngredientObject[] | null) => (old ? [...old, element] : [element]),
                )}
                onElementRemoved={(id: string) => setSelectedIngredients(
                  (old: IngredientObject[] | null) => old?.filter(
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
