import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import Entry from "./Entry/Entry";
import BASE_URL from "../config";

const Home = () => {
	const [entries, setEntries] = useState([]);
	const { setUserInfo, userInfo } = useContext(UserContext);
	useEffect(() => {
		fetch(`${BASE_URL}/posts`).then((response) => {
			response.json().then((entries) => {
				const firstFourEntries = entries.slice(0, 4);
				setEntries(firstFourEntries);
			});
		});
	}, []);

	const username = userInfo?.username;

	return (
		<div className="logo">
			<h1>Home</h1>
			{entries.length > 0 &&
				entries.map((entry) => <Entry key={entry._id} {...entry} />)}
			{username && (
				<h1>
					<Link to="/catalog">View All Posts</Link>
				</h1>
			)}
			{!username && (
				<h1>
					<Link to="/login">Login to view all posts</Link>
				</h1>
			)}
		</div>
	);
};

export default Home;
