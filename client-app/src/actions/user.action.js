import { cartConstants, userConstants } from "./constants";
import axios from "../helpers/axios";

//action to get addresses of user
export const getAddress = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/user/getaddress");
      dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
      if (res.status === 200) {
        const {
          userAddress: { addressNew },
        } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_SUCCESS,
          payload: { addressNew },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to add a new address
export const addAddress = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/user/address/create", { payload });
      dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });

      if (res.status === 201) {
        console.log(res);
        const {
          addressNew: { addressNew },
        } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_SUCCESS,
          payload: { addressNew },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to get users cart items
const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const res = await axios.post("/user/getCartItems");
      if (res.status === 200) {
        const { cartItems } = res.data;
        console.log({ getCartItems: cartItems });
        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to add new order
export const addOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/addOrder", payload);
      dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });

      if (res.status === 201) {
        console.log(res);
        dispatch({
          type: cartConstants.RESET_CART,
          payload: { cartItems: {} },
        });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to get all user's orders
export const getOrders = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/getOrders");
      dispatch({ type: userConstants.GET_USER_ORDER_REQUEST });

      if (res.status === 200) {
        console.log(res);
        const { orders } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//getting details of a single order with full info and delivery location
export const getOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/getOrder", payload);
      dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });
      if (res.status === 200) {
        console.log(res);
        const { order } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
          payload: { order },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
