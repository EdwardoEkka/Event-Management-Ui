import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setUserDetails, setIsAuthenticated } from '../store/auth';
import { authenticateUser } from '../service/api';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // To track loading state
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const authenticateUserHere = async () => {
      try {
        const response = await authenticateUser();
        dispatch(setUserDetails(response.data.user));
        dispatch(setIsAuthenticated(true));
      } catch (error) {
        console.log(error);
        dispatch(setIsAuthenticated(false)); // Ensure authentication failure is handled
      } finally {
        setLoading(false); // Set loading state to false after the check completes
      }
    };

    if (!isAuthenticated) {
      authenticateUserHere();
    } else {
      setLoading(false); // If already authenticated, set loading to false
    }
  }, [dispatch, isAuthenticated]);

  // Display loading message while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to the sign-in page
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // If authenticated, render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;
