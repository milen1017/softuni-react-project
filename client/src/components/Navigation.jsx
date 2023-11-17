import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<nav className="logo">
			<Link to="/">Home</Link>
			<div className="auth-links">
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
			</div>
		</nav>
	);
};

export default Navigation;
