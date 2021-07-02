import { employeeConstants } from "../actions/constants";

const initState = {
  employees: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case employeeConstants.GET_EMPLOYEE_SUCCESS:
      state = {
        ...state,
        employees: action.payload.employees,
        loading: false,
      };
      break;

    case employeeConstants.GET_EMPLOYEE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case employeeConstants.GET_EMPLOYEE_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
