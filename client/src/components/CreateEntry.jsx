import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BASE_URL from "../config";

function CreateEntry() {
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState("");
	const [content, setContent] = useState("");
	const [cover, setCover] = useState("");
	const [tags, setTags] = useState("");
	const [likes, setLikes] = useState(0);

	const handleSubmit = async (event) => {
		event.preventDefault();

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
                credentials: 'include',
               
			});

			if (response.ok) {
				console.log("Entry successfully created.");
				// Additional logic for successful submission (e.g., redirect or update UI)
			} else {
				console.error("Failed to create entry.");
				// Handle error scenarios (e.g., display error message)
			}
		} catch (error) {
			console.error("Error creating entry:", error);
			// Handle network errors or other exceptions
		}
	};

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
				value={tags}
				onChange={(e) => setTags(e.target.value)} // Update tags state directly here
			/>
			<p>Likes: {likes}</p>
			<button type="submit">Create Entry</button>
		</form>
	);
}

export default CreateEntry;
