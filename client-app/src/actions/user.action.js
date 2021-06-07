import { userConstants } from "./constants";
import axios from "../helpers/axios";

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
