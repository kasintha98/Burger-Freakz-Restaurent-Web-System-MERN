import React from "react";
import { Route, Redirect } from "react-router-dom";

//we are using this private route for pages that needed login access. for any page that require login we use this private route instead of firect Rout from react-router-dom
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    //getting props from compenents when routing to that components in App.js
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem("token");

        if (token) {
          //if only signin token is available go to the compenent needed (that means user is signed in)
          return <Component {...props} />;
        } else {
          //if signin token is unavailable rederecr the user to signin page (that means user is not signed in)
          return <Redirect to={"/signin"} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
