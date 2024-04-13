import { AnyAction } from 'redux';
import { types } from '../../actions';
import { ProductDetailsResponse, ProductResponse } from '../../../services/productService/product.service';

type State = {
  productsList: ProductResponse[],
  products: ProductDetailsResponse[],
}

const initialState: State = {
  productsList: [],
  products: [],
};

export const product = (state: State = initialState, action: AnyAction)
  : typeof initialState => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        productsList: action.payload.data,
      };
    case types.FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        products: state.products.concat(action.payload.data)
      }
    default:
      return state;
  }
};
