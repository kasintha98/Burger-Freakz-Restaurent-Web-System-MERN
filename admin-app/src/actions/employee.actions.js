import axios from "../helpers/axios";
import { employeeConstants } from "./constants";

//action to get employee users from the database
export const getEmployees = () => {
  return async (dispatch) => {
    dispatch({ type: employeeConstants.GET_EMPLOYEE_REQUEST });

    const res = await axios.get("/employee/getemployees");
    console.log(res);

    if (res.status === 200) {
      const { employees } = res.data;

      dispatch({
        type: employeeConstants.GET_EMPLOYEE_SUCCESS,
        payload: { employees: employees },
      });
    } else {
      dispatch({
        type: employeeConstants.GET_EMPLOYEE_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};
