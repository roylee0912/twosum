import React, { useState, useEffect } from "react";
import "./Profile.css";
import logo from "./images/png/logo-no-background.png";
import { useNavigate } from "react-router-dom";
const Profile = ({ currentUser }) => {
  const [userData, setUserData] = useState({})
  const url = window.location.href;
  const email = url.slice(30);
  console.log(email);

  const navigate = useNavigate();
  // let email;
  // if (currentUser.email) {
  //   email = currentUser.email
  // } else {
  //   email = "karla.christensen@example.com"
  // }
  
  useEffect (() => {
    fetch(`http://localhost:9292/user/profile/${email}`)
    .then(res => res.json())
    .then(data => setUserData(data))
  }, [])
  
  console.log(userData)
  return (
    <div className="browse">
      <div className="browse-matches">
        <div className="profile" onClick={() => navigate("/browse")}>
          <div> &#60;</div>
          <img src={logo} className="profile-img"></img>
          {/* FILL THIS UP DYNAMICALLY */}
        </div>
        <div className="conversations-dropdown">
          {/* FILL THIS DROPDOWN ARROW DYNAMICALLY */}
          <span className="dropdown-arrow">^</span> Conversations{" "}
          <span className="recent">(Recent)</span>
        </div>
        <div className="conversations">
          <div className="conversation">
            <img src={logo}></img>
            <div className="conversation-description">
              {/* FILL THIS UP DYNAMICALLY */}
              <h1>Susan Johnson</h1>
              {/* FILL THIS UP DYNAMICALLY */}
              <h2>hey, what are you up to?</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="browse-right">
        {/* MAKE THIS DROP DOWN TO A POPUP MODAL THAT SHOWS FILTERS */}
        <button>Filters</button>
        <img src={logo}></img>
        <div className="profile-card">
          <img className="profile-profile-img" src={userData.profile_img} alt="No logo" />
          <div className="profile-first-name">{userData.first_name}</div>
          <div className="profile-gender">({userData.gender === "female" ? "she/her" : "he/him"})</div>
          <div className="profile-age">{userData.age}</div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="profile-bio">{userData.bio}</div>
          <div className="profile-desired_sex">Looking for: {userData.desired_sex}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
