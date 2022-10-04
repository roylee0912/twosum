import React from "react";
import "./ProfileCard.css";
const ProfileCard = (user) => {
  if (!user.user) return null;
  return (
    <div className="profile-card-content">
      <img className="main-img" src={user.user.profile_img}></img>
      <div className="profile-card-description">
        <h1>{user.user.first_name + ", " + user.user.age}</h1>
        <h2>{user.user.bio}</h2>
      </div>
    </div>
  );
};

export default ProfileCard;
