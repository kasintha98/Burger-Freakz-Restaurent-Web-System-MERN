import axios from "../helpers/axios";
import { authConstants } from "./constants";
import { userConstants } from "./constants";
import { toast } from "react-toastify";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    //post request from front end to signin with the data from frontend
    const res = await axios.post(`/admin/signin`, {
      ...user,
    });

    //if respond is 200 (user successfully login)
    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });

      toast.success("Login Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (res.status === 202) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { errormsg: res.data.errormsg },
      });

      toast.error(res.data.errormsg, {
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

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_SIGNUP_REQUEST });

    const res = await axios.post(`/admin/signup`, user);

    if (res.status === 201) {
      dispatch({
        type: userConstants.USER_SIGNUP_SUCCESS,
        payload: { error: res.data },
      });

      toast.success("Signup Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      /* const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); */

      /* dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      }); */
    } else {
      dispatch({
        type: userConstants.USER_SIGNUP_FAILURE,
        payload: { errormsg: res.data.errormsg },
      });

      toast.error(res.data.errormsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      /* if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      } */
    }
  };
};

//if user is logged in then stop user going again to /signin
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login!" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });

    const res = await axios.post("/admin/signout");

    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
