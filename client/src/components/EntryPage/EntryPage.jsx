import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import BASE_URL from '../../config';
import './EntryPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import { handleLikeClick } from '../../utils';
import Loader from '../Loader/Loader';
import { getDayAndMonth } from '../../utils';

export default function EntryPage({}) {
	const navigate = useNavigate();
	const { id } = useParams();
	const [postInfo, setPostInfo] = useState([]);
	const { userInfo } = useContext(UserContext);
	const [canEditOrDelete, setCanEditOrDelete] = useState(false);
	const [currentLikes, setCurrentLikes] = useState(postInfo.likes);
	const [hasLiked, setHasLiked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const formattedDate = new Date(postInfo.createdAt).toLocaleString();
	
	useEffect(() => {
		const fetchPostInfo = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`${BASE_URL}/posts/${id}`);
				if (!response.ok) {
					setIsLoading(false);
					throw new Error('Failed to fetch post');
				}
				const entries = await response.json();
				setPostInfo(entries);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				console.error('Error fetching post:', error);
			}
		};

		fetchPostInfo();
	}, [id, userInfo.id, postInfo.author?._id]);

	useEffect(() => {
		if (postInfo.author && userInfo.id === postInfo.author._id) {
			setCanEditOrDelete(true);
		} else {
			setCanEditOrDelete(false);
		}
	}, [postInfo, userInfo.id]);

	const handleDelete = async () => {
		try {
			const response = await fetch(`${BASE_URL}/posts/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Failed to delete post');
			}
			navigate('/');
		} catch (error) {
			console.error('Error deleting post:', error);
		}
	};

	const onClickLike = () => {
		handleLikeClick(postInfo._id, currentLikes, setCurrentLikes, setHasLiked);
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className='entry-page-container'>
					<h1>{postInfo.title}</h1>
					<p>Summary: {postInfo.summary}</p>
					<img src={postInfo.cover} alt={postInfo.title} />
					<div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
					<p>Likes: {postInfo.likes}</p>
					{hasLiked && (
						<div className='already-liked'>You've already liked this post</div>
					)}{' '}
					<p>Posted by {postInfo.author?.username}</p>
					<p>Created At: {formattedDate}</p>
					<a className='like-button' onClick={onClickLike}>
						<FontAwesomeIcon icon={faHeart} className='like-icon' />
						Like
					</a>
					{canEditOrDelete && (
						<div className='button-container'>
							<Link to={`/edit/${id}`}>
								<button>Edit</button>
							</Link>

							<button onClick={handleDelete}>Delete</button>
						</div>
					)}
				</div>
			)}
		</>
	);
}
