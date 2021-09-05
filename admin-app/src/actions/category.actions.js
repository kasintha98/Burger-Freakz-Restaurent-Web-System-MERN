import axios from "../helpers/axios";
import { categoryConstants } from "./constants";
import { toast } from "react-toastify";

//actio to get all categories from database
const getAllCategory = () => {
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

//action to add a new category
export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });

    try {
      const res = await axios.post("/category/create", form);
      if (res.status === 201) {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
          payload: { category: res.data.category },
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
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
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

//action to update a category
export const updateCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST });

    const res = await axios.post("/category/update", form);
    if (res.status === 201) {
      dispatch({ type: categoryConstants.UPDATE_CATEGORY_SUCCESS });
      dispatch(getAllCategory());

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
        type: categoryConstants.UPDATE_CATEGORY_FAILURE,
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

export const deleteCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });

    const res = await axios.delete("category/" + id);

    if (res.status === 200) {
      dispatch(getAllCategory());
      dispatch({
        type: categoryConstants.DELETE_CATEGORY_SUCCESS,
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
        type: categoryConstants.DELETE_CATEGORY_FAILURE,
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

export { getAllCategory };
