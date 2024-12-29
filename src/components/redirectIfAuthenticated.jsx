import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setUserDetails, setIsAuthenticated } from '../store/auth';
import { authenticateUser } from '../service/api';

const RedirectIfAuthenticated = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const authenticateUserHere = async () => {
      try {
        const response = await authenticateUser();
        dispatch(setUserDetails(response.data.user));
        dispatch(setIsAuthenticated(true));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Stop loading once authentication is done
      }
    };

    authenticateUserHere();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Show loading while authenticating
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;
