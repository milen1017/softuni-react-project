import { useEffect, useState } from "react";
import Entry from "./Entry/Entry";
import BASE_URL from "../config";

const Home = () => {
	const [entries, setEntries] = useState([]);
	useEffect(() => {
		fetch(`${BASE_URL}/posts`).then((response) => {
			response.json().then((entries) => {
				setEntries(entries);
			});
		});
	}, []);
	return (
		<div className="logo">
			<h1>Home</h1>
			{entries.length > 0 &&
				entries.map((entry) => <Entry key={entry._id} {...entry} />)}
		</div>
	);
};

export default Home;
