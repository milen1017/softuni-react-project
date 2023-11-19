import "./Entry.css";

const Entry = ({ title, summary, tags, cover }) => {
	return (
		<div className="projcard projcard-blue">
			<div className="projcard-innerbox">
				<img className="projcard-img" src={cover} />
				<div className="projcard-textbox">
					<div className="projcard-title">{title}</div>
					<div className="projcard-subtitle">
						This explains the card in more detail
					</div>
					<div className="projcard-bar" />
					<div className="projcard-description">{summary}</div>
					<div className="projcard-tagbox">
						{/* Map through tags array and render span for each tag */}
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
