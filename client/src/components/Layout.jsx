import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "../components/Footer";

const Layout = () => {
	return (
		<>
			<header>
				<Navigation />
			</header>
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default Layout;
