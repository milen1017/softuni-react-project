import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { UserContextProvider } from "./UserContext";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateEntry from "./components/CreateEntry";
import EntryPage from "./components/EntryPage/EntryPage";
import EditEntry from "./components/EditEntry";
import Catalog from "./components/CatalogPage";
import ProfilePage from "./components/ProfilePage";

function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/create" element={<CreateEntry />} />
					<Route path="/post/:id" element={<EntryPage />} />
					<Route path="/edit/:id" element={<EditEntry />} />
					<Route path="/catalog" element={<Catalog />} />
					<Route path="/profile" element={<ProfilePage />} />
				</Route>
				
			</Routes>
		</UserContextProvider>
	);
}

export default App;
