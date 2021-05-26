import { productConstants } from "../actions/constants";

const initState = {
  products: [],
  loading: false,
  product: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    case productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_SUCCESS:
      state = {
        ...state,
        product: action.payload.product,
      };
      break;
  }
  return state;
};
