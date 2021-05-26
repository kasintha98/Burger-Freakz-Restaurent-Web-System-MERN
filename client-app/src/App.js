import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage";
import ProductPage from "./containers/ProductPage";
import HomePage from "./containers/HomePage";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/category/:slug" exact component={ProductListPage} />
          <Route path="/product/:slug" component={ProductPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
