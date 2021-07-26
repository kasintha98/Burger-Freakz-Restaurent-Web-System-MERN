import { userConstants } from "../actions/constants";

const initState = {
  error: null,
  message: "",
  loading: false,
  errormsg: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.USER_SIGNUP_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_SIGNUP_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userConstants.USER_SIGNUP_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
        errormsg: action.payload.errormsg,
      };
      break;
  }

  return state;
};
