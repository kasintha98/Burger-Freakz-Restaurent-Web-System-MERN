import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, updateCart } from "./actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage";
import ProductPage from "./containers/ProductPage";
import HomePage from "./containers/HomePage";
import CartPage from "./containers/CartPage";
import CheckoutPage from "./containers/CheckoutPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCart());
  }, [auth.authenticate]);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/category/:slug" exact component={ProductListPage} />
          <Route path="/product/:slug" component={ProductPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
