// axios use to perform HTTP requests(APIs), that works in both Browser(front-end) and Node. js(backend) platforms.
//creating axios instance for easy usage for every needed page
import axios from "axios";
import { api } from "../urlConfig";
import store from "../store";

const token = window.localStorage.getItem("token");

//instancing common data such as baseURL (it is common for all apis) for easy use
const axiosInstance = axios.create({
  baseURL: api,
  headers: { Authorization: token ? `Bearer ${token}` : "" },
});

axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

export default axiosInstance;
