import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BASE_URL from "../config";

function EditEntry() {
	const { id } = useParams(); 
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState("");
	const [content, setContent] = useState("");
	const [cover, setCover] = useState("");
	const [tags, setTags] = useState([]);
	const [likes, setLikes] = useState(0);


	// Error states for each input
	const [titleError, setTitleError] = useState(false);
	const [summaryError, setSummaryError] = useState(false);
	const [contentError, setContentError] = useState(false);
	const [coverError, setCoverError] = useState(false);
	const [tagsError, setTagsError] = useState(false);
	
	const navigate = useNavigate();

	useEffect(() => {
		const fetchEntry = async () => {
			try {
				const response = await fetch(`${BASE_URL}/posts/${id}`, {
					credentials: "include",
				});

				if (response.ok) {
					const entryData = await response.json();
					setTitle(entryData.title);
					setSummary(entryData.summary);
					setContent(entryData.content);
					setCover(entryData.cover);
					setTags(entryData.tags);
					setLikes(entryData.likes);
				} else {
					console.error("Failed to fetch entry.");
				}
			} catch (error) {
				console.error("Error fetching entry:", error);
			}
		};

		fetchEntry();
	}, [id]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (
			!title ||
			!summary ||
			!content ||
			content === "<p><br></p>" ||
			!cover ||
			tags.length === 0 ||
			tags[0] === ""
		) {
			// Set error states for empty fields
			setTitleError(!title);
			setSummaryError(!summary);
			setContentError(!content || content === "<p><br></p>");
			setCoverError(!cover);
			setTagsError(tags.length === 0 || tags[0] === "");
			console.error("All fields are required.");
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
			const response = await fetch(`${BASE_URL}/posts/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(entryData),
				credentials: "include",
			});

			if (response.ok) {
				console.log("Entry successfully created.");
				navigate(`/post/${id}`);
			} else {
				console.error("Failed to create entry.");
				
			}
		} catch (error) {
			console.error("Error creating entry:", error);
			
		}
	};

	const handleTagsChange = (e) => {
		const tagsString = e.target.value;
		const tagsArray = tagsString.split(",").map((tag) => tag.trim());
		setTags(tagsArray);
		setTagsError(tagsArray.length === 0);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				style={{ border: titleError ? "1px solid red" : "" }}
			/>
			{titleError && <p style={{ color: "red" }}>Title is required</p>}
			<input
				type="text"
				placeholder="Summary"
				value={summary}
				onChange={(e) => setSummary(e.target.value)}
				style={{ border: summaryError ? "1px solid red" : "" }}
			/>
			{summaryError && <p style={{ color: "red" }}>Summary is required</p>}

			<ReactQuill
				theme="snow"
				value={content}
				onChange={(value) => setContent(value)}
				style={{ border: contentError ? "1px solid red" : "" }}
			/>
			{contentError && <p style={{ color: "red" }}>Content is required</p>}
			<input
				type="text"
				placeholder="Cover Image URL"
				value={cover}
				onChange={(e) => setCover(e.target.value)}
				style={{ border: coverError ? "1px solid red" : "" }}
			/>
			{coverError && <p style={{ color: "red" }}>Cover is required</p>}
			<input
				type="text"
				placeholder="Tags (comma-separated)"
				value={tags.join(",")} // Convert array back to comma-separated string for input value
				onChange={handleTagsChange} // Use handleTagsChange to update the tags state
				style={{ border: tagsError ? "1px solid red" : "" }}
			/>
			{tagsError && <p style={{ color: "red" }}>Tags are required</p>}
			<p>Likes: {likes}</p>
			<button type="submit">Edit Entry</button>
		</form>
	);
}

export default EditEntry;
