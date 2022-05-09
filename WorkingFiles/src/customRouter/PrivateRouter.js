/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRouter = ({ children, props }) => {
    const firstLogin = localStorage.getItem('firstLogin');
    return firstLogin ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRouter;
