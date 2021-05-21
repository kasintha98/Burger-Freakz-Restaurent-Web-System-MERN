import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });

    const res = await axios.get("category/getcategories");
    console.log(res);

    if (res.status === 200) {
      const { categories } = res.data;

      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categories },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
    const res = await axios.post("/category/create", form);
    if (res.status === 201) {
      dispatch({
        type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
        payload: { category: res.data.category },
      });
    } else {
      dispatch({
        type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
        payload: res.data.error,
      });
    }
    console.log(res);
  };
};

export const updateCategory = (form) => {
  return async (dispatch) => {
    //dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
    const res = await axios.post("/category/update", form);
    if (res.status === 201) {
      return true;

      /*  dispatch({
        type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
        payload: { category: res.data.category },
      }); */
    } else {
      console.log(res);
      /*  dispatch({
        type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
        payload: res.data.error,
      }); */
    }
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    //dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });

    const res = await axios.delete("category/" + id);

    if (res.status === 200) {
      return true;
      /*  dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categories },
      }); */
    } else {
      console.log(res);
      /*  dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: {
          error: res.data.error,
        },
      }); */
    }
  };
};
