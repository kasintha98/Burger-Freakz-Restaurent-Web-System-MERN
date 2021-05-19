//reduce code complexity in store. so include reducing code here
//combine reducers

import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
});

export default rootReducer;
