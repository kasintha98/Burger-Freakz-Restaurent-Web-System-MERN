import axios from "../helpers/axios";
import { inventoryConstants } from "./constants";
import { toast } from "react-toastify";

//get inventory from database
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

//action to add inventory to database
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
          type: inventoryConstants.ADD_INVENTORY_FAILURE,
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

//action to delete inventory from database
export const deleteInventory = (id) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.DELETE_INVENTORY_REQUEST });

    const res = await axios.delete("/inventory/delete/" + id);

    if (res.status === 200) {
      dispatch(getInventory());
      dispatch({
        type: inventoryConstants.DELETE_INVENTORY_SUCCESS,
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
        type: inventoryConstants.DELETE_INVENTORY_FAILURE,
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
