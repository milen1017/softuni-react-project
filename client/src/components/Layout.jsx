import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "../Footer";

const Layout = () => {
	return (
		<>
			<header>
				<Navigation />
			</header>
			<main>
				<Outlet /> {/* This is where child routes will be rendered */}
			</main>
			<Footer />
		</>
	);
};

export default Layout;
