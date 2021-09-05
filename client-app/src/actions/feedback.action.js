import axios from "../helpers/axios";
import { categoryConstants, feedbackConstants } from "./constants";
import { toast } from "react-toastify";

//action to get feedbacks by product
export const getFeedbacks = (productId) => {
  return async (dispatch) => {
    dispatch({ type: feedbackConstants.GET_FEEDBACK_REQUEST });

    const res = await axios.get(`feedback/getFeedback/${productId}`);
    console.log(res);

    if (res.status === 200) {
      const { feedback } = res.data;

      dispatch({
        type: feedbackConstants.GET_FEEDBACK_SUCCESS,
        payload: { feedback: feedback },
      });
    } else {
      dispatch({
        type: feedbackConstants.GET_FEEDBACK_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

//action to add a new feedback to a product
export const addFeedback = (feedback) => {
  return async (dispatch) => {
    dispatch({ type: feedbackConstants.ADD_FEEDBACK_REQUEST });

    try {
      const res = await axios.post("/feedback/add", feedback);
      if (res.status === 201) {
        dispatch({
          type: feedbackConstants.ADD_FEEDBACK_SUCCESS,
          payload: { feedback: res.data.feedback },
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
