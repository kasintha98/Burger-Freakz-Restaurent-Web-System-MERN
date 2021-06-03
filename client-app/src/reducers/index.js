//reduce code complexity in store. so include reducing code here
//combine reducers

import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import cartReducer from "./cart.reducer";
import authReducer from "./auth.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
});

export default rootReducer;
