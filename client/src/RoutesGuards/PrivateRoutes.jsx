import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
  const userData = localStorage.getItem('userData')
  return userData?.id ? <Outlet /> : <Navigate to="/login" />;
};