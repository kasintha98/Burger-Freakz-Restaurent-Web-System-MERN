import axios from "../helpers/axios";
import { purchaseConstants } from "./constants";

export const getPurchase = () => {
  return async (dispatch) => {
    dispatch({ type: purchaseConstants.GET_PURCHASE_REQUEST });

    const res = await axios.get("/purchase");
    console.log(res);

    if (res.status === 200) {
      const { purchase } = res.data;

      dispatch({
        type: purchaseConstants.GET_PURCHASE_SUCCESS,
        payload: { purchase: purchase },
      });
    } else {
      dispatch({
        type: purchaseConstants.GET_PURCHASE_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const addPurchase = (form) => {
  return async (dispatch) => {
    dispatch({ type: purchaseConstants.ADD_PURCHASE_REQUEST });

    try {
      const res = await axios.post("/purchase/add", form);
      if (res.status === 201) {
        dispatch({
          type: purchaseConstants.ADD_PURCHASE_SUCCESS,
          payload: { purchase: res.data.purchase },
        });
      } else {
        dispatch({
          type: purchaseConstants.ADD_PURCHASE_FAILURE,
          payload: res.data.error,
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error.reponse);
    }
  };
};

export const deletePurchase = (id) => {
  return async (dispatch) => {
    dispatch({ type: purchaseConstants.DELETE_PURCHASE_REQUEST });

    const res = await axios.delete("/purchase/delete/" + id);

    if (res.status === 200) {
      dispatch(getPurchase());
      dispatch({
        type: purchaseConstants.DELETE_PURCHASE_SUCCESS,
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: purchaseConstants.DELETE_PURCHASE_FAILURE,
        payload: { error },
      });
    }
  };
};
