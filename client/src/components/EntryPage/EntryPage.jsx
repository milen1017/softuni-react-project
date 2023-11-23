import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import BASE_URL from "../../config";
import "./EntryPage.css";

export default function EntryPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [postInfo, setPostInfo] = useState([]);
	const { userInfo } = useContext(UserContext);
	const [canEditOrDelete, setCanEditOrDelete] = useState(false);
	useEffect(() => {
		const fetchPostInfo = async () => {
			try {
				const response = await fetch(`${BASE_URL}/posts/${id}`);
				if (!response.ok) {
					throw new Error("Failed to fetch post");
				}
				const entries = await response.json();
				setPostInfo(entries);
				// console.log(userInfo.id);
				// console.log(postInfo.author?._id);
			} catch (error) {
				console.error("Error fetching post:", error);
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
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Failed to delete post");
			}
			navigate("/");
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};

	return (
		<>
			<h1>{postInfo.title}</h1>
			<p>Summary: {postInfo.summary}</p>
			<img src={postInfo.cover} alt={postInfo.title} />
			<div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
			<p>Likes: {postInfo.likes}</p>
			<p>Posted by {postInfo.author?.username}</p>
			<p>Created At: {postInfo.createdAt}</p>

			{canEditOrDelete && (
				<div className="button-container">
					<Link to={`/edit/${id}`}>
						<button>Edit</button>
					</Link>

					<button onClick={handleDelete}>Delete</button>
				</div>
			)}
		</>
	);
}
