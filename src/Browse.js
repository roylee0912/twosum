import React, { useEffect, useState } from "react";
import "./Browse.css";
import logo from "./images/png/logo-no-background.png";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
const Browse = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    fetch("http://localhost:9292/last-user")
      .then((r) => r.json())
      .then((user) => setCurrentUser({ ...user }));
  }, []);

  useEffect(() => {
    fetch("http://localhost:9292/users")
      .then((r) => r.json())
      .then((data) => {
        setUser(data[Math.floor(Math.random() * (data.length - 1))]);
      });
  }, [refresh]);

  function handleDislike() {
    //add user as both disliked and visited
    fetch(`http://localhost:9292/users-rejections/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rejected_person_id: user.id,
      }),
    }).then((r) => r.json());

    setRefresh((refresh) => refresh + 1);
  }

  function handleLike() {
    //add user as liked and visited
    fetch(`http://localhost:9292/users-likes/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        liked_person_id: user.id,
      }),
    }).then((r) => r.json());

    setRefresh((refresh) => refresh + 1);
  }
  return (
    <div className="browse">
      <div className="browse-matches">
        <div className="profile" onClick={() => navigate("/profile")}>
          <img src={logo} className="profile-img"></img>
          {/* FILL THIS UP DYNAMICALLY */}
          <h1>John Smith</h1>
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
          <ProfileCard user={user} />
          {/* FILL THIS UP DYNAMICALLY WITH ACTUAL PEOPLE AND THEIR INFO */}
        </div>
        <div className="browse-buttons">
          <button className="dislike" onClick={() => handleDislike()}>
            X
          </button>
          <button className="like" onClick={() => handleLike()}>
            ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Browse;
