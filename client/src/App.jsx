import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { UserContextProvider } from "./UserContext";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>
			</Routes>
		</UserContextProvider>
	);
}

export default App;
