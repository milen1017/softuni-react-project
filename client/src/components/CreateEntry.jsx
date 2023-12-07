import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BASE_URL from '../config';

function CreateEntry() {
	const [title, setTitle] = useState('');
	const [summary, setSummary] = useState('');
	const [content, setContent] = useState('');
	const [cover, setCover] = useState('');
	const [tags, setTags] = useState([]);

	// const [redirect, setRedirect] = useState(false);
	const navigate = useNavigate();

	// Error states for each input
	const [titleError, setTitleError] = useState(false);
	const [summaryError, setSummaryError] = useState(false);
	const [contentError, setContentError] = useState(false);
	const [coverError, setCoverError] = useState(false);
	const [tagsError, setTagsError] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (
			!title ||
			!summary ||
			!content ||
			content === '<p><br></p>' ||
			!cover ||
			tags.length === 0 ||
			tags[0] === ''
		) {
			// Set error states for empty fields
			setTitleError(!title);
			setSummaryError(!summary);
			setContentError(!content || content === '<p><br></p>');
			setCoverError(!cover);
			setTagsError(tags.length === 0 || tags[0] === '');
			console.error('All fields are required.');
			return;
		}

		const entryData = {
			title,
			summary,
			content,
			cover,
			tags,
		};

		try {
			const response = await fetch(`${BASE_URL}/posts`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(entryData),
				credentials: 'include',
			});

			if (response.ok) {
				const data = await response.json();
				console.log('Entry successfully created.');
				// setRedirect(true);
				navigate(`/post/${data?._id}`);
			} else {
				console.error('Failed to create entry.');
				// Handle error scenarios (e.g., display error message)
			}
		} catch (error) {
			console.error('Error creating entry:', error);
			// Handle network errors or other exceptions
		}
	};

	const handleTagsChange = (e) => {
		const tagsString = e.target.value;
		const tagsArray = tagsString.split(',').map((tag) => tag.trim());
		setTags(tagsArray);
	};
	// useEffect(() => {
	// 	if (redirect) {
	// 		navigate('/');
	// 		//todo navigate to post id
	// 	}
	// }, [redirect, navigate]);

	return (
		<form onSubmit={handleSubmit} className='entry-form'>
			<input
				type='text'
				placeholder='Title'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				style={{ border: titleError ? '1px solid red' : '' }}
			/>
			{titleError && (
				<p style={{ color: 'red', marginTop: '5px' }}>Title is required</p>
			)}

			<input
				type='text'
				placeholder='Summary'
				value={summary}
				onChange={(e) => setSummary(e.target.value)}
				style={{ border: summaryError ? '1px solid red' : '' }}
			/>
			{summaryError && (
				<p style={{ color: 'red', marginTop: '5px' }}>Summary is required</p>
			)}
			<ReactQuill
				theme='snow'
				value={content}
				onChange={(value) => setContent(value)}
				style={{
					border: contentError ? '1px solid red' : '',
					marginBottom: '5px',
					backgroundColor: 'white',
				}}
			/>
			{contentError && (
				<p style={{ color: 'red', marginTop: '5px' }}>Content is required</p>
			)}
			<input
				type='text'
				placeholder='Cover Image URL'
				value={cover}
				onChange={(e) => setCover(e.target.value)}
				style={{ border: coverError ? '1px solid red' : '' }}
			/>
			{coverError && (
				<p style={{ color: 'red', marginTop: '5px' }}>Cover is required</p>
			)}
			<input
				type='text'
				placeholder='Tags (comma-separated)'
				value={tags.join(',')} // Convert array back to comma-separated string for input value
				onChange={handleTagsChange} // Use handleTagsChange to update the tags state
				style={{ border: tagsError ? '1px solid red' : '' }}
			/>
			{tagsError && (
				<p style={{ color: 'red', marginTop: '5px' }}>Tags are required</p>
			)}

			<button type='submit'>Create Entry</button>
		</form>
	);
}

export default CreateEntry;
