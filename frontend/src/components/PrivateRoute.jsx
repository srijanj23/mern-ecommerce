import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return isAuthenticated ? children : <Navigate to='/login' />;
};

export default PrivateRoute;