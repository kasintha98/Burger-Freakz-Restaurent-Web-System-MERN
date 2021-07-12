import axios from "../helpers/axios";
import { categoryConstants, feedbackConstants } from "./constants";

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
      } else {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
          payload: res.data.error,
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error.reponse);
    }
  };
};
