import { Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import { isUserLoggedIn, getAllCategory, getInitialData } from "./actions";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import PrivateRoute from "./HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import Category from "./containers/Category";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, []);

  return (
    <div>
      <Switch>
        <PrivateRoute path="/" exact component={Home}></PrivateRoute>
        <PrivateRoute path="/products" component={Products}></PrivateRoute>
        <PrivateRoute path="/orders" component={Orders}></PrivateRoute>
        <PrivateRoute path="/categories" component={Category}></PrivateRoute>
        <Route path="/signin" component={Signin}></Route>
        <Route path="/signup" component={Signup}></Route>
      </Switch>
    </div>
  );
}

export default App;
