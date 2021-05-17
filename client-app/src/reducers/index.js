//reduce code complexity in store. so include reducing code here
//combine reducers

import categoryReducer from "./category.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  category: categoryReducer,
});

export default rootReducer;
