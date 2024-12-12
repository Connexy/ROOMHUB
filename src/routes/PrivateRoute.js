import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('isLogin') === '1';

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login-page" replace />;
};

export default PrivateRoute;
