import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  return userData?.id ? <Outlet /> : <Navigate to="/login" />;
};