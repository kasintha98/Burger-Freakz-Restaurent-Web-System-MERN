//reduce code complexity in store. so include reducing code here
//combine reducers

import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import cartReducer from "./cart.reducer";
import authReducer from "./auth.reducer";
import feedbackReducer from "./feedback.reducer";
import userReducer from "./user.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  user: userReducer,
  feedback: feedbackReducer,
});

export default rootReducer;
