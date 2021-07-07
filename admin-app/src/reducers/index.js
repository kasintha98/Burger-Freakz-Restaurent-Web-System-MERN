//reduce code complexity in store. so include reducing code here
//combine reducers

import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import orderReducer from "./order.reducer";
import employeeReducer from "./employee.reducer";
import inventoryReducer from "./inventory.reducer";
import purchaseReducer from "./purchase.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
  order: orderReducer,
  employees: employeeReducer,
  inventory: inventoryReducer,
  purchase: purchaseReducer,
});

export default rootReducer;
