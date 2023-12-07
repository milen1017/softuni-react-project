import BASE_URL from './config';

export const handleLikeClick = async (
	_id,
	currentLikes,
	setCurrentLikes,
	setHasLiked
) => {
	try {
		const response = await fetch(`${BASE_URL}/posts/${_id}/like`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		if (response.ok) {
			setCurrentLikes(currentLikes + 1);
		} else {
			const errorData = await response.json();
			if (
				response.status === 400 &&
				errorData.error === 'User has already liked the post'
			) {
				setHasLiked(true); // Set state to indicate the post has been liked
			} else {
				console.error('Failed to update like count');
			}
		}
	} catch (error) {
		console.error('Error updating like count:', error);
	}
};

export const getDayAndMonth = (inputDate) => {
	const date = new Date(inputDate);
	const day = date.getDate();
	const month = date
		.toLocaleString('default', { month: 'short' })
		.toUpperCase();

	return { day, month };
};
