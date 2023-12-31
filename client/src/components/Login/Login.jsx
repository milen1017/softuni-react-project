import React, { useContext, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import BASE_URL from '../../config';
import './Login.css';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(false);
	const { updateUserInfo } = useContext(UserContext);
	const [wrongCredentials, setWrongCredentials] = useState(false);

	async function onLogin(e) {
		e.preventDefault();
		const response = await fetch(`${BASE_URL}/auth/login`, {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		});

		if (response.ok) {
			response.json().then((userInfo) => {
				updateUserInfo(userInfo);
				setRedirect(true);
			});
		} else {
			setWrongCredentials(true);
		}
	}

	if (redirect) {
		return <Navigate to={'/'} />;
	}

	return (
		<form className='login' onSubmit={onLogin}>
			<h1>Login</h1>
			<input
				type='text'
				placeholder='username'
				value={username}
				onChange={(ev) => setUsername(ev.target.value)}
				style={{
					border: wrongCredentials ? '1px solid red' : '1px solid #ccc',
				}}
			/>
			<input
				type='password'
				placeholder='password'
				value={password}
				onChange={(ev) => setPassword(ev.target.value)}
				style={{
					border: wrongCredentials ? '1px solid red' : '1px solid #ccc',
				}}
			/>
			{wrongCredentials && <p style={{ color: 'red' }}>Wrong credentials</p>}
			<button type='submit' className='login-btn'>
				Login
			</button>
			<div>
				<Link to='/register'>
					New Here? Sign Up Now to Create Your Account.
				</Link>
			</div>
		</form>
	);
};

export default Login;
