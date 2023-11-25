import React from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const ProfilePage = () => {
	const { userInfo } = useContext(UserContext);
	console.log(userInfo);
	return (
        <div className="profile">
        <div className="profile-header">
          <h2>User Profile</h2>
          <img src={userInfo.avatar} alt="User Avatar" />
          <p>Username: {userInfo.username}</p>
        </div>
      </div>
	);
};

export default ProfilePage;
