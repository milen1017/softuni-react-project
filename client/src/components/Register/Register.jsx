import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

import BASE_URL from '../../config';

const Register = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordsMatch, setPasswordsMatch] = useState(true);
	const [passwordLengthError, setPasswordLengthError] = useState(false);
	const navigate = useNavigate();

	async function register(ev) {
		ev.preventDefault();

		if (password !== confirmPassword) {
			setPasswordsMatch(false);
			return;
		}

		if (password.length < 4) {
			setPasswordLengthError(true);
			return;
		} else {
			setPasswordLengthError(false);
		}

		const response = await fetch(`${BASE_URL}/auth/register`, {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.status === 200) {
			alert(
				'Congratulations! 🎉 Your registration was successful. You can now log in using your credentials.'
			);
			navigate('/login');
		} else {
			alert('Registration failed');
		}
	}

	return (
		<form className='register' onSubmit={register}>
			<h1>Register</h1>
			<input
				type='text'
				placeholder='username'
				value={username}
				onChange={(ev) => setUsername(ev.target.value)}
			/>
			<input
				type='password'
				placeholder='password'
				value={password}
				onChange={(ev) => setPassword(ev.target.value)}
			/>
			<input
				type='password'
				placeholder='confirm password'
				value={confirmPassword}
				onChange={(ev) => {
					setConfirmPassword(ev.target.value);
					if (passwordsMatch === false) {
						setPasswordsMatch(true);
					}
					if (passwordLengthError === true) {
						setPasswordLengthError(false);
					}
				}}
				style={{
					border: passwordsMatch
						? passwordLengthError
							? '1px solid red'
							: '1px solid #ccc'
						: '1px solid red',
				}}
			/>
			{!passwordsMatch && (
				<p style={{ color: 'red' }}>Passwords do not match</p>
			)}
			{passwordLengthError && (
				<p style={{ color: 'red' }}>
					Password should be at least 4 characters long
				</p>
			)}
			<button className='register-btn'>Register</button>
			<div>
				<Link to='/login'>Existing Member? Log In Here.</Link>
			</div>
		</form>
	);
};

export default Register;
