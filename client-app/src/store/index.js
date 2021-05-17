//creating globally accessible properties using redux. So that every component/page can access all the properties easily
//this property store is made with redux
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
