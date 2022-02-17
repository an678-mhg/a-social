import React from "react";
import userState from "../stored/userState";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const curentUser = userState((state) => state.curentUser);
  const location = useLocation();

  if (!curentUser)
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
      />
    );

  return <>{children}</>;
};

export default PrivateRoute;
