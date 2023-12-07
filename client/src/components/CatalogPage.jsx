import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CatalogCard from './CatalogCard/CatalogCard';
import BASE_URL from '../config';
import '@fortawesome/fontawesome-free/css/all.css';
import Loader from './Loader/Loader.jsx';

const Catalog = ({ predefinedSearchTerm = '', showSearchBar = true }) => {
	const [entries, setEntries] = useState([]);
	const [searchTerm, setSearchTerm] = useState(predefinedSearchTerm);
	const [previousSearchTerm, setPreviousSearchTerm] = useState('');
	const { userInfo } = useContext(UserContext);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false); // loading state

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true); // start loading
			try {
				const response = await fetch(
					`${BASE_URL}/posts${searchTerm ? `?q=${searchTerm}` : ''}`
				);
				setIsLoading(false); //stop loading
				if (response.ok) {
					const data = await response.json();
					setEntries(data);
				} else {
					setIsLoading(false); //stop loading
					throw new Error('Failed to fetch data');
				}
			} catch (error) {
				setIsLoading(false); //stop loading
				console.error('Error fetching posts:', error);
			}
		};
		fetchPosts();
	}, [searchTerm, userInfo, navigate]);

	const handleSearchInputChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleTagClick = (tag) => {
		if (previousSearchTerm === tag) {
			setSearchTerm('');
			setPreviousSearchTerm('');
		} else {
			setSearchTerm(tag);
			setPreviousSearchTerm(tag);
		}
	};

	return (
		<div className='logo'>
			{showSearchBar && (
				<div className='search-bar'>
					<FontAwesomeIcon icon={faSearch} className='search-icon' />
					<input
						type='text'
						placeholder='Search posts...'
						value={searchTerm}
						onChange={handleSearchInputChange}
					/>
				</div>
			)}
			{entries.length > 0 ? (
				//render loading
				isLoading ? (
					<Loader />
				) : (
					entries.map((entry) => (
						<CatalogCard
							key={entry._id}
							{...entry}
							onTagClick={handleTagClick}
						/>
					))
				)
			) : (
				<p>No matching posts found.</p>
			)}
		</div>
	);
};

export default Catalog;
