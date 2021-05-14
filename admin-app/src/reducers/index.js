//reduce code complexity in store. so include reducing code here
//combine reducers

import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import orderReducer from "./order.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
  order: orderReducer,
});

export default rootReducer;
