// axios use to perform HTTP requests(APIs), that works in both Browser(front-end) and Node. js(backend) platforms.
//creating axios instance for easy usage for every needed page
import axios from "axios";
import { api } from "../urlConfig";
import store from "../store";
import { authConstants } from "../actions/constants";

const token = window.localStorage.getItem("token");

//instancing common data such as baseURL (it is common for all apis) for easy use
const axiosInstance = axios.create({
  baseURL: api,
  headers: { Authorization: token ? `Bearer ${token}` : "" },
});

//intercepting the req or res before they are handled by then or catch
//if an error happen when sending a request handling it
axiosInstance.interceptors.request.use((req) => {
  //assigning the new token after login again after logout
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

//if an error happen when receiving a respond handling it
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error.response);
    const status = error.response ? error.response.status : 500;

    if (status && status === 500) {
      //if error = 500 mean users token is expired. Then we have to logout the user
      localStorage.clear();
      store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
