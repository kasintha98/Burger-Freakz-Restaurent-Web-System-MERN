/* eslint-disable import/no-anonymous-default-export */
import { productConstants } from "../actions/constants";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const buildNewProducts = (products, product) => {
  return [
    ...products,
    {
      _id: product._id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      offer: product.offer,
      category: product.category,
      productImages: product.productImages,
      feedbacks: product.feedbacks,
      ratings: product.ratings,
      updatedAt: product.updatedAt,
      createdBy: product.createdBy,
      createdAt: product.createdAt,
    },
  ];
};

//const initialState = { products: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
        loading: false,
      };
      break;
    case productConstants.ADD_NEW_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.ADD_NEW_PRODUCT_SUCCESS:
      const product = action.payload.product;
      const updatedProducts = buildNewProducts(state.products, product);
      console.log("updatedProducts", updatedProducts);

      state = {
        ...state,
        products: updatedProducts,
        loading: false,
      };
      break;
    case productConstants.UPDATE_PRODUCT_REQUEST:
      state = { ...state, loading: true };
      break;
    case productConstants.UPDATE_PRODUCT_SUCCESS:
      state = { ...state, loading: false };
      break;
    case productConstants.UPDATE_PRODUCT_FAILURE:
      state = { ...state, error: action.payload.error, loading: false };
      break;
    case productConstants.DELETE_PRODUCT_REQUEST:
      state = { ...state, loading: true };
      break;
    case productConstants.DELETE_PRODUCT_SUCCESS:
      state = { ...state, loading: false };
      break;
    case productConstants.DELETE_PRODUCT_FAILURE:
      state = { ...state, error: action.payload.error, loading: false };
      break;
  }
  return state;
};
