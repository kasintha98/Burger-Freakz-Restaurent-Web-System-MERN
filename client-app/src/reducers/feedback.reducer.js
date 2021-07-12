import { feedbackConstants } from "../actions/constants";

const initState = {
  feedback: [],
  loading: false,
  error: null,
};

const buildNewFeedbacks = (feedback, feedbackOne) => {
  return [
    ...feedback,
    {
      userId: feedbackOne.userId,
      productId: feedbackOne.productId,
      feedback: feedbackOne.feedback,
      rating: feedbackOne.rating,
    },
  ];
};

export default (state = initState, action) => {
  switch (action.type) {
    case feedbackConstants.GET_FEEDBACK_SUCCESS:
      state = {
        ...state,
        feedback: action.payload.feedback,
      };
      break;
    case feedbackConstants.ADD_FEEDBACK_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case feedbackConstants.ADD_FEEDBACK_SUCCESS:
      const feedbackOne = action.payload.feedback;
      const updatedFeedbacks = buildNewFeedbacks(state.feedback, feedbackOne);
      console.log("updatedFeedbacks", updatedFeedbacks);

      state = {
        ...state,
        feedback: updatedFeedbacks,
        loading: false,
      };
      break;
    case feedbackConstants.ADD_FEEDBACK_FAILURE:
      state = {
        ...initState,
        loading: false,
      };
      break;
  }
  return state;
};
