import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../config";

export default function EntryPage() {
	const { id } = useParams();
	const [postInfo, setPostInfo] = useState([]);
	useEffect(() => {
		fetch(`${BASE_URL}/posts/${id}`).then((response) => {
			response.json().then((entries) => {
				setPostInfo(entries);
                console.log(entries);
			});
		});
	}, []);

	return (
		<>
			<h1>{postInfo.title}</h1>
			<p>Summary: {postInfo.summary}</p>
			<img src={postInfo.cover} alt={postInfo.title} />
            <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
			<p>Likes: {postInfo.likes}</p>
			<p>Created At: {postInfo.createdAt}</p>
			<p>Updated At: {postInfo.updatedAt}</p>
            
		</>
	);
}
