import { authConstants } from "../actions/constants";

//initial state of user object
const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    nic: "",
    gender: "",
    email: "",
    fullName: "",
    contactNumber: "",
    address: "",
    username: "",
    role: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  errormsg: null,
  message: "",
};

//check what is the request and returning suitable state for the request
export default (state = initState, action) => {
  console.log(action);

  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
        error: null,
        errormsg: null,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        error: null,
        errormsg: action.payload.errormsg,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        authenticate: false,
        authenticating: false,
        error: action.payload.error,
        errormsg: action.payload.errormsg,
        message: action.payload.errormsg,
      };
      break;
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
        loading: false,
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case authConstants.SIGNUP_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        errormsg: action.payload.errormsg,
      };
      break;
  }

  return state;
};
