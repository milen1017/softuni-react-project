import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

import BASE_URL from "../config"

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordsMatch, setPasswordsMatch] = useState(true);
	const navigate = useNavigate();

	async function register(ev) {
		ev.preventDefault();

		if (password !== confirmPassword) {
			setPasswordsMatch(false);
			return;
		}

		const response = await fetch(`${BASE_URL}/auth/register`, {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.status === 200) {
			alert("Congratulations! 🎉 Your registration was successful. You can now log in using your credentials.");
			navigate("/login");
		} else {
			alert("Registration failed");
		}
	}

	return (
		<form className="register" onSubmit={register}>
			<h1>Register</h1>
			<input
				type="text"
				placeholder="username"
				value={username}
				onChange={(ev) => setUsername(ev.target.value)}
			/>
			<input
				type="password"
				placeholder="password"
				value={password}
				onChange={(ev) => setPassword(ev.target.value)}
			/>
			<input
				type="password"
				placeholder="confirm password"
				value={confirmPassword}
				onChange={(ev) => {
					setConfirmPassword(ev.target.value);
					if (passwordsMatch === false) {
						setPasswordsMatch(true);
					}
				}}
				style={{ border: passwordsMatch ? "1px solid #ccc" : "1px solid red" }}
			/>
			{!passwordsMatch && (
				<p style={{ color: "red" }}>Passwords do not match</p>
			)}
			<button>Register</button>
		</form>
	);
};

export default Register;
