import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Entry from './Entry/Entry';
import BASE_URL from '../config';
import Loader from './Loader/Loader';

const Home = () => {
	const [entries, setEntries] = useState([]);
	const { userInfo } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchFirstFourEntries = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`${BASE_URL}/posts`);
				if (!response.ok) {
					setIsLoading(false);
					throw new Error('Failed to fetch posts');
				}
				const entries = await response.json();
				const firstFourEntries = entries.slice(0, 4);
				setEntries(firstFourEntries);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				console.error('Error fetching posts:', error);
			}
		};

		fetchFirstFourEntries();
	}, []);

	const username = userInfo?.username;
	const linkStyle = { marginTop: '50px' };

	return (
		<div className='logo' style={{ textAlign: 'center' }}>
			<h1>Home</h1>
			{isLoading ? (
				<Loader />
			) : (
				<>
					{entries.length > 0 &&
						entries.map((entry) => <Entry key={entry._id} {...entry} />)}
					{username && (
						<h1 style={linkStyle}>
							<Link to='/catalog'>View All Posts</Link>
						</h1>
					)}
					{!username && (
						<h1 style={linkStyle}>
							<Link to='/login'>Login to view all posts</Link>
						</h1>
					)}
				</>
			)}
		</div>
	);
};

export default Home;
