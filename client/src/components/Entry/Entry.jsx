import "./Entry.css";

const Entry = ({ title, summary, tags, cover, author, createdAt }) => {
	const formattedDate = new Date(createdAt).toLocaleString();
	return (
		<div className="projcard projcard-blue">
			<div className="projcard-innerbox">
				<img className="projcard-img" src={cover} />
				<div className="projcard-textbox">
					<div className="projcard-title">{title}</div>
					<div className="projcard-subtitle">
						Posted by {author.username} at {formattedDate}
					</div>
					<div className="projcard-bar" />
					<div className="projcard-description">{summary}</div>
					<div className="projcard-tagbox">
						{tags.map((tag, index) => (
							<span key={index} className="projcard-tag">
								{tag}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Entry;
