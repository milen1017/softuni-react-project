import { useState } from "react";
import {Navigate} from "react-router-dom";


const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [redirect,setRedirect] = useState(false);
	async function onLogin(e) {
		e.preventDefault();
		const response = await fetch("http://localhost:3000/login", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		if (response.ok) {
			setRedirect(true);
			
		} else {
			alert("Wrong credentials");
		}
	}
	if (redirect) {
		return <Navigate to={'/'} />
	  }

	return (
		<form className="login" onSubmit={onLogin}>
			<input
				type="username"
				placeholder="username"
				value={username}
				onChange={(ev) => {
					setUsername(ev.target.value);
				}}
			/>
			<input
				type="password"
				placeholder="password"
				value={password}
				onChange={(ev) => {
					setPassword(ev.target.value);
				}}
			/>
			<button type="submit">Login</button>
		</form>
	);
};

export default Login;
