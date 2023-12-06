import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import BASE_URL from "../../config";
import Catalog from "../CatalogPage";
import "./ProfilePage.css";

const ProfilePage = () => {
	const { userInfo, setUserInfo } = useContext(UserContext);
	const [isEditing, setIsEditing] = useState(false);
	const [newAvatar, setNewAvatar] = useState("");
	const [showCatalog, setShowCatalog] = useState(false);
	const [predefinedSearchTerm, setPredefinedSearchTerm] = useState(userInfo.id);
	const navigate = useNavigate();

	if (userInfo && userInfo.error === "Unauthorized") {
		alert("You must log in to access this area of the application.");
		navigate("/login");
		return null;
	}

	const handleAvatarChange = async () => {
		try {
			const response = await fetch(`${BASE_URL}/auth/change-avatar`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ avatar: newAvatar }),
				credentials: "include",
			});

			if (response.ok) {
				setUserInfo({ ...userInfo, avatar: newAvatar });
				setNewAvatar("");
				setIsEditing(false);
			} else {
				console.error("Failed to change avatar");
			}
		} catch (error) {
			console.error("Error changing avatar:", error);
		}
	};

	const toggleEdit = () => {
		setIsEditing(!isEditing);
	};

	const handleShowPostsClick = () => {
		setShowCatalog(!showCatalog);
	};

	return (
		<div className="profile">
			<div className="profile-header">
				<h2>User Profile</h2>
				<div className="avatar-container" onClick={toggleEdit}>
					<img src={userInfo.avatar} alt="User Avatar" />
					<p className="avatar-text">Change Avatar</p>
				</div>

				<p>Username: {userInfo.username}</p>
				{isEditing && (
					<div>
						<input
							type="text"
							placeholder="New Avatar URL"
							value={newAvatar}
							onChange={(e) => setNewAvatar(e.target.value)}
						/>
						<button onClick={handleAvatarChange}>Change Avatar</button>
					</div>
				)}
			</div>
			<a href="#" onClick={handleShowPostsClick}>
				Show my posts
			</a>
			{showCatalog && (
				<Catalog
					predefinedSearchTerm={predefinedSearchTerm}
					showSearchBar={false}
				/>
			)}
		</div>
	);
};

export default ProfilePage;
