/* eslint-disable function-paren-newline */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-confusing-arrow */
import React, { FormEvent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ObjectWithNameAndId } from '../../types/objectWithNameAndId';
import {
  IngredientObject,
  getIngredientsApi,
  getIngredientsByIdsApi,
} from '../../services/ingredients.service';
import SearchBarTagsSelector from '../SearchBarTagsSelector/SearchBarTagsSelector';
import ScrollBar from '../Scrollbar/ScrollBar';
import SearchBar from '../SearchBar/SearchBar';
import { RootState } from '../../store/reducers';
import {
  ProductCriteria,
  SortBy,
  parseSortBy,
} from '../../services/product.service';
import { handleError } from '../../utils/handleError';
import { TagColor } from '../../theme/tagColor';
import FilledButton from '../FilledButton/FilledButton';
import useEffectSingular from '../../hooks/useEffectSignular';
import './Filters.scss';
import {
  ProviderObject,
  getProvidersApi,
  getProvidersByIdsApi,
} from '../../services/providers.api';
import {
  BrandObject,
  getBrandsApi,
  getBrandsByIdsApi,
} from '../../services/brand.service';
import {
  CategoryObject,
  getCategoriesApi,
  getCategoriesByIdsApi,
} from '../../services/category.service';
import FiltersSorting from '../FiltersSelect.tsx/FiltersSorting';

const MAX_NUMBER_OF_SUGGESTIONS = 50;

type FiltersProps = {
  queryProductCriteria: ProductCriteria;
  handleSearch: (
    phrase: string,
    selectedIngredients: ObjectWithNameAndId[] | null,
    selectedProviders: ObjectWithNameAndId[] | null,
    selectedBrands: ObjectWithNameAndId[] | null,
    selectedCategories: ObjectWithNameAndId[] | null,
    sortBy: SortBy | null,
  ) => void;
};

function Filters({
  queryProductCriteria,
  handleSearch,
}: FiltersProps): JSX.Element {
  const [phrase, setPhrase] = useState<string>(
    queryProductCriteria.phrase ?? '',
  );

  const allergensSelector = useSelector(
    (state: RootState) => state.like.dislikedIngredients,
  );
  const hasAllergens: boolean = allergensSelector?.length > 0;

  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientObject[] | null
  >(null);
  const [selectedProviders, setSelectedProviders] = useState<
    ProviderObject[] | null
  >(null);
  const [selectedBrands, setSelectedBrands] = useState<BrandObject[] | null>(
    null,
  );
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryObject[] | null
  >(null);

  const [sortingOption, setSortingOption] = useState<SortBy | null>(null);

  const handleSortingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'none') setSortingOption(null);
    setSortingOption(parseSortBy(event.target.value) ?? null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(
      phrase,
      selectedIngredients,
      selectedProviders,
      selectedBrands,
      selectedCategories,
      sortingOption,
    );
  };

  const fetchIngredientsSuggestions = async (
    query: string,
  ): Promise<ObjectWithNameAndId[] | null> => {
    if (query.length === 0) {
      return null;
    }
    const ingredientsResponse = await getIngredientsApi(
      query,
      MAX_NUMBER_OF_SUGGESTIONS,
      hasAllergens,
    );
    return ingredientsResponse.data;
  };

  const fetchProvidersSuggestions = async (
    query: string,
  ): Promise<ObjectWithNameAndId[] | null> => {
    if (query.length === 0) {
      return null;
    }
    const providersResponse = await getProvidersApi(
      query,
      MAX_NUMBER_OF_SUGGESTIONS,
    );
    return providersResponse.data;
  };

  const fetchBrandsSuggestions = async (
    query: string,
  ): Promise<ObjectWithNameAndId[] | null> => {
    if (query.length === 0) {
      return null;
    }
    const brandsResponse = await getBrandsApi(query, MAX_NUMBER_OF_SUGGESTIONS);
    return brandsResponse.data;
  };

  const fetchCategoriesSuggestions = async (
    query: string,
  ): Promise<ObjectWithNameAndId[] | null> => {
    if (query.length === 0) {
      return null;
    }
    const categoriesResponse = await getCategoriesApi(
      query,
      MAX_NUMBER_OF_SUGGESTIONS,
    );
    return categoriesResponse.data;
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
        handleError('An error occurred while loading ingredients.');
      }
    }
  }, [queryProductCriteria.ingredientsToIncludeIds]);

  const fetchSelectedProviders = useCallback(async () => {
    if (queryProductCriteria.providersIds) {
      try {
        const response = await getProvidersByIdsApi(
          queryProductCriteria.providersIds,
        );
        if (response && response.data) {
          setSelectedProviders(response.data);
        }
      } catch (error) {
        handleError('An error occurred while loading providers.');
      }
    }
  }, [queryProductCriteria.providersIds]);

  const fetchSelectedBrands = useCallback(async () => {
    if (queryProductCriteria.brandsToIncludeIds) {
      try {
        const response = await getBrandsByIdsApi(
          queryProductCriteria.brandsToIncludeIds,
        );
        if (response && response.data) {
          setSelectedProviders(response.data);
        }
      } catch (error) {
        handleError('An error occurred while loading brands.');
      }
    }
  }, [queryProductCriteria.brandsToIncludeIds]);

  const fetchSelectedCategories = useCallback(async () => {
    if (queryProductCriteria.categoriesIds) {
      try {
        const response = await getCategoriesByIdsApi(
          queryProductCriteria.categoriesIds,
        );
        if (response && response.data) {
          setSelectedProviders(response.data);
        }
      } catch (error) {
        handleError('An error occurred while loading brands.');
      }
    }
  }, [queryProductCriteria.categoriesIds]);

  useEffectSingular(() => {
    fetchSelectedIngredients();
    fetchSelectedProviders();
    fetchSelectedBrands();
    fetchSelectedCategories();
  });

  return (
    <form className="filters-container" onSubmit={handleSubmit}>
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
                  old ? [...old, element] : [element],
                )
              }
              onElementRemoved={(id: string) =>
                setSelectedIngredients(
                  (old: IngredientObject[] | null) =>
                    old?.filter(
                      (ingredient: IngredientObject) => ingredient.id !== id,
                    ) ?? null,
                )
              }
              selectedElements={selectedIngredients ?? undefined}
              label="Ingredients"
              placeholder="e.g. shea butter"
              tagsColor={TagColor.INGREDIENT}
            />
          </div>
          <div className="provider-search-container">
            <SearchBarTagsSelector
              getSuggestions={fetchProvidersSuggestions}
              onElementChosen={(element: ObjectWithNameAndId) =>
                setSelectedProviders((old: ProviderObject[] | null) =>
                  old ? [...old, element] : [element],
                )
              }
              onElementRemoved={(id: string) =>
                setSelectedProviders(
                  (old: IngredientObject[] | null) =>
                    old?.filter(
                      (provider: ProviderObject) => provider.id !== id,
                    ) ?? null,
                )
              }
              selectedElements={selectedProviders ?? undefined}
              label="Providers"
              placeholder="e.g. Rossmann"
              tagsColor={TagColor.INGREDIENT}
            />
          </div>
          <div className="brand-search-container">
            <SearchBarTagsSelector
              getSuggestions={fetchBrandsSuggestions}
              onElementChosen={(element: ObjectWithNameAndId) =>
                setSelectedBrands((old: BrandObject[] | null) =>
                  old ? [...old, element] : [element],
                )
              }
              onElementRemoved={(id: string) =>
                setSelectedBrands(
                  (old: IngredientObject[] | null) =>
                    old?.filter(
                      (provider: ProviderObject) => provider.id !== id,
                    ) ?? null,
                )
              }
              selectedElements={selectedBrands ?? undefined}
              label="Brands"
              placeholder="e.g. Nivea"
              tagsColor={TagColor.INGREDIENT}
            />
          </div>

          <div className="category-search-container">
            <SearchBarTagsSelector
              getSuggestions={fetchCategoriesSuggestions}
              onElementChosen={(element: ObjectWithNameAndId) =>
                setSelectedCategories((old: CategoryObject[] | null) =>
                  old ? [...old, element] : [element],
                )
              }
              onElementRemoved={(id: string) =>
                setSelectedCategories(
                  (old: IngredientObject[] | null) =>
                    old?.filter(
                      (provider: ProviderObject) => provider.id !== id,
                    ) ?? null,
                )
              }
              selectedElements={selectedCategories ?? undefined}
              label="Categories"
              placeholder="e.g. skin"
              tagsColor={TagColor.INGREDIENT}
            />
          </div>
          <FiltersSorting handleChange={handleSortingChange} />
          <div className="search-button-container">
            <FilledButton
              onClick={() =>
                handleSearch(
                  phrase,
                  selectedIngredients,
                  selectedProviders,
                  selectedBrands,
                  selectedCategories,
                  sortingOption,
                )
              }
            >
              Search
            </FilledButton>
          </div>
        </div>
      </ScrollBar>
    </form>
  );
}

export default Filters;
