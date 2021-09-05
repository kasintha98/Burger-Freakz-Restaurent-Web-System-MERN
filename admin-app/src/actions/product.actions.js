import axios from "../helpers/axios";
import { productConstants } from "./constants";
import { toast } from "react-toastify";

//action to get all products from database
const getAllProducts = () => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });

    const res = await axios.get("product/getproducts");
    console.log(res);

    if (res.status === 200) {
      const { products } = res.data;

      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products: products },
      });
    } else {
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

//action to add product
export const addProduct = (form) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.ADD_NEW_PRODUCT_REQUEST });

    try {
      const res = await axios.post("product/create", form);
      if (res.status === 201) {
        dispatch({
          type: productConstants.ADD_NEW_PRODUCT_SUCCESS,
          payload: { product: res.data.product },
        });
        dispatch(getAllProducts());

        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        dispatch({
          type: productConstants.ADD_NEW_PRODUCT_FAILURE,
          payload: res.data.error,
        });

        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error.reponse);
    }
  };
};

//action to a update product
export const updateProduct = (form) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.UPDATE_PRODUCT_REQUEST });

    const res = await axios.post("/product/update", form);
    if (res.status === 201) {
      dispatch({ type: productConstants.UPDATE_PRODUCT_SUCCESS });
      dispatch(getAllProducts());

      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: productConstants.UPDATE_PRODUCT_FAILURE,
        payload: { error },
      });

      toast.error(res.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
};

//action to delete a product
export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.DELETE_PRODUCT_REQUEST });

    const res = await axios.delete("product/delete/" + id);

    if (res.status === 200) {
      dispatch(getAllProducts());
      dispatch({
        type: productConstants.DELETE_PRODUCT_SUCCESS,
      });

      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: productConstants.DELETE_PRODUCT_FAILURE,
        payload: { error },
      });

      toast.error(res.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
};

export { getAllProducts };
