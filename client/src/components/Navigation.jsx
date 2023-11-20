import { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../UserContext";
import BASE_URL from "../config";

const Navigation = () => {
	// const [username, setUsername] = useState(null);
	const { setUserInfo, userInfo } = useContext(UserContext);

	useEffect(() => {
		fetch(`${BASE_URL}/auth/profile`, { credentials: "include" })
			.then((response) => response.json())
			.then((userInfo) => {
				setUserInfo(userInfo);
			})
			.catch((error) => {
				// todo handle fetch errors here(fix not valid JSON)
				console.error("Error fetching data:", error);
			});
	}, []);

	function logout() {
		fetch(`${BASE_URL}/auth/logout`, {
			credentials: "include",
			method: "POST",
		});
		setUserInfo(null);
	}

	const username = userInfo?.username;

	return (
		<nav className="logo">
			<Link to="/">Home</Link>
			<div className="auth-links">
				{username && (
					<>
						<Link to="/create">Create post</Link>
						<a onClick={logout}>Logout</a>
					</>
				)}
				{!username && (
					<>
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navigation;
