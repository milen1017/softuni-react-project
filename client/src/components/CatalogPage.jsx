import { useEffect, useState } from "react";

import CatalogCard from "./CatalogCard/CatalogCard";
import BASE_URL from "../config";

const Catalog = () => {
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
			
			{entries.length > 0 &&
				entries.map((entry) => <CatalogCard key={entry._id} {...entry} />)}
		</div>
	);
};

export default Catalog;
