import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import BASE_URL from '../../config';
import Catalog from '../CatalogPage';
import './ProfilePage.css';
import Loader from '../Loader/Loader';

const ProfilePage = () => {
	const { userInfo, updateUserInfo } = useContext(UserContext);
	const [isEditing, setIsEditing] = useState(false);
	const [newAvatar, setNewAvatar] = useState('');
	const [showCatalog, setShowCatalog] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleAvatarChange = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`${BASE_URL}/auth/change-avatar`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ avatar: newAvatar }),
				credentials: 'include',
			});

			if (response.ok) {
				updateUserInfo({ ...userInfo, avatar: newAvatar });
				setNewAvatar('');
				setIsEditing(false);
				setIsLoading(false);
			} else {
				setIsLoading(false);
				console.error('Failed to change avatar');
			}
		} catch (error) {
			setIsLoading(false);
			console.error('Error changing avatar:', error);
		}
	};

	const toggleEdit = () => {
		setIsEditing(!isEditing);
	};

	const handleShowPostsClick = () => {
		setShowCatalog(!showCatalog);
	};

	return (
		<div className='profile'>
			{isLoading ? (
				<Loader />
			) : (
				<div className='profile-header'>
					<h2>User Profile</h2>
					<div className='avatar-container' onClick={toggleEdit}>
						<img src={userInfo?.avatar} alt='User Avatar' />
						<p className='avatar-text'>Change Avatar</p>
					</div>

					<p>Username: {userInfo?.username}</p>
					{isEditing && (
						<div>
							<input
								type='text'
								placeholder='New Avatar URL'
								value={newAvatar}
								onChange={(e) => setNewAvatar(e.target.value)}
							/>
							<button onClick={handleAvatarChange}>Change Avatar</button>
						</div>
					)}
				</div>
			)}
			<a href='#' onClick={handleShowPostsClick}>
				Show my posts
			</a>
			{showCatalog && (
				<Catalog predefinedSearchTerm={userInfo.id} showSearchBar={false} />
			)}
		</div>
	);
};

export default ProfilePage;
