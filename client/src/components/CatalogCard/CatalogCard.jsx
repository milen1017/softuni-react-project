import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.css";
import "./CatalogCard.css";

const CatalogCard = ({
	title,
	summary,
	tags,
	cover,
	author,
	createdAt,
	_id,
	likes
}) => {
	const formattedDate = new Date(createdAt).toLocaleString();

	
	const handleLikeClick = () => {
	
		console.log("Like button clicked!");
	};

	return (
		<div className="projcard projcard-blue">
			<div className="projcard-innerbox">
				<Link to={`/post/${_id}`} className="custom-link">
					<img className="projcard-img" src={cover} alt={title} />
				</Link>
				<div className="projcard-textbox">
					<Link to={`/post/${_id}`} className="custom-link">
						<div className="projcard-title">{title}</div>
						<div className="projcard-subtitle">
							Posted by {author?.username} at {formattedDate}
						</div>
					</Link>
					<div className="projcard-bar" />
					<div className="projcard-description">{summary}</div>
					<div className="projcard-tagbox">
						{tags.map((tag, index) => (
							<span key={index} className="projcard-tag">
								{tag}
							</span>
						))}
					</div>
					
					<button className="like-button" onClick={handleLikeClick}>
						<FontAwesomeIcon icon={faHeart} className="like-icon" />
						Like
					</button>
				</div>
			</div>
		</div>
	);
};

export default CatalogCard;
