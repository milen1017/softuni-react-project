import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import './CatalogCard.css';
import { useState } from 'react';
import { handleLikeClick } from '../../utils';

const CatalogCard = ({
	title,
	summary,
	tags,
	cover,
	author,
	createdAt,
	_id,
	likes,
	onTagClick,
}) => {
	const formattedDate = new Date(createdAt).toLocaleString();
	const [currentLikes, setCurrentLikes] = useState(likes);
	const [hasLiked, setHasLiked] = useState(false);

	const onClickLike = () => {
		handleLikeClick(_id, currentLikes, setCurrentLikes, setHasLiked);
	};

	return (
		<div className='projcard projcard-blue'>
			<div className='projcard-innerbox'>
				<Link to={`/post/${_id}`} className='custom-link'>
					<img className='projcard-img' src={cover} alt={title} />
				</Link>
				<div className='projcard-textbox'>
					<Link to={`/post/${_id}`} className='custom-link'>
						<div className='projcard-title'>{title}</div>
						<div className='projcard-subtitle'>
							Posted by {author?.username} at {formattedDate}
						</div>
					</Link>
					<div className='likes-count'>Likes: {currentLikes}</div>
					{hasLiked && (
						<div className='already-liked'>You've already liked this post</div>
					)}{' '}
					{/* Display message when already liked */}
					<div className='projcard-bar' />
					<div className='projcard-description'>{summary}</div>
					<a className='like-button' onClick={onClickLike}>
						<FontAwesomeIcon icon={faHeart} className='like-icon' />
						Like
					</a>
					<div>
						{tags.map((tag, index) => (
							<span
								key={index}
								className='projcard-tag'
								onClick={() => {
									onTagClick(tag); // Call the callback function with the clicked tag
								}}
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CatalogCard;
