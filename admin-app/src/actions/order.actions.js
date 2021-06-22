import axios from "../helpers/axios";
import { orderConstants } from "./constants";

export const updateOrder = (payload) => {
  return async (dispatch) => {
    //dispatch({ type: orderConstants.});

    try {
      const res = await axios.post("order/update", payload);
      console.log(res);
      if (res.status === 201) {
        /*  dispatch({
            type: productConstants.ADD_NEW_PRODUCT_SUCCESS,
            payload: { product: res.data.product },
          });
          dispatch(getAllProducts()); */
      } else {
        /*   dispatch({
            type: productConstants.ADD_NEW_PRODUCT_FAILURE,
            payload: res.data.error,
          }); */
      }
    } catch (error) {
      console.log(error);
    }
  };
};
