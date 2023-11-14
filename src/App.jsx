import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Entry from "./components/Entry";

function App() {
	return (
		<main>
			<header>
				<a href="/" className="logo">
					Logo
				</a>

				<Navigation />
			</header>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</main>
	);
}

export default App;
