import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoutes = () => {
	const userData = localStorage.getItem('userData');
	return userData?.id ? <Navigate to='/catalog' /> : <Outlet />;
};
