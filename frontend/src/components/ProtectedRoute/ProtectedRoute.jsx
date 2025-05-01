import React from 'react'
import { Redirect } from 'react-router-dom'

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('jwt'); // Check if JWT is in localStorage

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Redirect to="/login" />;
  }

  // If authenticated, render the protected component
  return <Component {...rest} />;
};

export default ProtectedRoute;
