import React from "react";
import {Navigate} from "react-router-dom";

const PublicRoute = ({authenticated, component: Component}) => {
  return (
    !authenticated ? Component : <Navigate to="/main"/>
  );
}

export default PublicRoute;