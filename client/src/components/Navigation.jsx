import { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import BASE_URL from '../config';

const Navigation = () => {
	const { setUserInfo, userInfo } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`${BASE_URL}/auth/profile`, { credentials: 'include' })
			.then((response) => response.json())
			.then((userInfo) => {
				setUserInfo(userInfo);
			})
			.catch((error) => {
				// todo handle fetch errors here(fix not valid JSON)
				console.error('Error fetching data:', error);
			});
	}, []);

	function logout() {
		try {
			fetch(`${BASE_URL}/auth/logout`, {
				credentials: 'include',
				method: 'POST',
			});

			setUserInfo(null);
			navigate('/');
		} catch (error) {
			console.error('Logout error:', error);
		}
	}

	const username = userInfo?.username;

	return (
		<nav className='logo'>
			<Link to='/'>Home</Link>
			<div className='auth-links'>
				{username && (
					<>
						<Link to='/create'>Create post</Link>
						<Link to='/catalog'>Catalog</Link>
						<Link to='/profile'>Profile</Link>
						<a onClick={logout} className='logout-link'>
							Logout
						</a>
					</>
				)}
				{!username && (
					<>
						<Link to='/login'>Login</Link>
						<Link to='/register'>Register</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navigation;
