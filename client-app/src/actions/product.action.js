import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/products/${slug}`);

    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
        payload: res.data,
      });
    } else {
    }
  };
};

export const getSpecificProductBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/products/product/${slug}`);

    dispatch({ type: productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_REQUEST });

    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_FAILURE,
        payload: res.data.error,
      });
    }
  };
};
