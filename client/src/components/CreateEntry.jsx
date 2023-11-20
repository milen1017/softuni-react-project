import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BASE_URL from "../config";
//todo diplay errors
function CreateEntry() {
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState("");
	const [content, setContent] = useState("");
	const [cover, setCover] = useState("");
	const [tags, setTags] = useState([]);
	const [likes, setLikes] = useState(0); //todo
	const [redirect, setRedirect] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!title || !summary || !content || !cover || tags.length === 0) {
			console.error("All fields are required.");
			// display error message or set state to show the error to the user
			return;
		}

		const entryData = {
			title,
			summary,
			content,
			cover,
			tags,
			likes,
		};

		try {
			const response = await fetch(`${BASE_URL}/posts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(entryData),
				credentials: "include",
			});

			if (response.ok) {
				console.log("Entry successfully created.");
				setRedirect(true);
			} else {
				console.error("Failed to create entry.");
				// Handle error scenarios (e.g., display error message)
			}
		} catch (error) {
			console.error("Error creating entry:", error);
			// Handle network errors or other exceptions
		}
	};

	const handleTagsChange = (e) => {
		const tagsString = e.target.value;
		const tagsArray = tagsString.split(",").map((tag) => tag.trim());
		setTags(tagsArray);
	};
	if (redirect) {
		return <Navigate to={"/"} />;
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Summary"
				value={summary}
				onChange={(e) => setSummary(e.target.value)}
			/>
			<ReactQuill
				theme="snow"
				value={content}
				onChange={(value) => setContent(value)} // Update content state directly here
			/>
			<input
				type="text"
				placeholder="Cover Image URL"
				value={cover}
				onChange={(e) => setCover(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Tags (comma-separated)"
				value={tags.join(",")} // Convert array back to comma-separated string for input value
				onChange={handleTagsChange} // Use handleTagsChange to update the tags state
			/>
			<p>Likes: {likes}</p>
			<button type="submit">Create Entry</button>
		</form>
	);
}

export default CreateEntry;
