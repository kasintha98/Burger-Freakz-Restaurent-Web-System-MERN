import { userConstants } from "../actions/constants";

const initState = {
  addressNew: [],
  error: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_USER_ADDRESS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case userConstants.GET_USER_ADDRESS_SUCCESS:
      state = {
        ...state,
        addressNew: action.payload.addressNew,
        loading: false,
      };
      break;

    case userConstants.GET_USER_ADDRESS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
