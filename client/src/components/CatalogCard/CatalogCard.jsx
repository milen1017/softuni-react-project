import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import './CatalogCard.css';
import { useContext, useState } from 'react';
import { handleLikeClick } from '../../utils';
import { UserContext } from '../../UserContext.jsx';

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
  const { userInfo } = useContext(UserContext);
  const [hasLikedPost, setHasLikedPost] = useState(
    userInfo?.likes?.includes(_id)
  );

  const onClickLike = () => {
    handleLikeClick(_id, currentLikes, setCurrentLikes, setHasLikedPost);
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
          {/* Display message when already liked */}
          <div className='projcard-bar' />
          <div className='projcard-description'>{summary}</div>
          <a
            className='like-button'
            onClick={onClickLike}
            disabled={hasLikedPost}
          >
            <FontAwesomeIcon icon={faHeart} className='like-icon' />
            Like
          </a>
          {hasLikedPost && (
            <div className='already-liked'>You've already liked this post</div>
          )}
          <div className='projcard-tags'>
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
