import axios from "../helpers/axios";
import { inventoryConstants } from "./constants";

export const getInventory = () => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.GET_INVENTORY_REQUEST });

    const res = await axios.get("/inventory");
    console.log(res);

    if (res.status === 200) {
      const { inventory } = res.data;

      dispatch({
        type: inventoryConstants.GET_INVENTORY_SUCCESS,
        payload: { inventory: inventory },
      });
    } else {
      dispatch({
        type: inventoryConstants.GET_INVENTORY_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const addInventory = (form) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.ADD_INVENTORY_REQUEST });

    try {
      const res = await axios.post("/inventory/add", form);
      if (res.status === 201) {
        dispatch({
          type: inventoryConstants.ADD_INVENTORY_SUCCESS,
          payload: { inventory: res.data.inventory },
        });
      } else {
        dispatch({
          type: inventoryConstants.ADD_INVENTORY_FAILURE,
          payload: res.data.error,
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error.reponse);
    }
  };
};

export const deleteInventory = (id) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.DELETE_INVENTORY_REQUEST });

    const res = await axios.delete("/inventory/delete/" + id);

    if (res.status === 200) {
      dispatch(getInventory());
      dispatch({
        type: inventoryConstants.DELETE_INVENTORY_SUCCESS,
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: inventoryConstants.DELETE_INVENTORY_FAILURE,
        payload: { error },
      });
    }
  };
};
