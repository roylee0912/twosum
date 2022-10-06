import React, { useEffect, useState } from "react";
import "./Browse.css";
import logo from "./images/png/logo-no-background.png";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import MatchModal from "./MatchModal";
const Browse = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [isShowingConversations, setIsShowingConversations] = useState(true);
  const [justMatchedId, setJustMatchedId] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [ageRange, setAgeRange] = useState(100)
  useEffect(() => {
    fetch("http://localhost:9292/last-user")
      .then((r) => r.json())
      .then((user) => setCurrentUser({ ...user }));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9292/users/${currentUser.age}/${ageRange}/${currentUser.desired_sex}/${currentUser.gender}`)
      .then((r) => r.json())
      .then((data) => {
        setUser(data[Math.floor(Math.random() * (data.length))]);
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
    })
      .then((r) => r.json())
      //NOW THIS RESULT WILL TRIGGER SOMETHING. WHEN ACCEPTED, THE RESULT IS GOING TO BE THE STRING THAT IS RETURNED. NOW, WE CAN DO SOMETHING WITH THIS STRING!
      .then((result) => {
        let results = result.split(" ");
        setJustMatchedId(parseInt(results[results.length - 1]));
        if (results[results.length - 1]) {
          setShowMatch(true);
          return;
        }
      });

    setRefresh((refresh) => refresh + 1);
  }
  function handleConversationClick() {
    setIsShowingConversations(!isShowingConversations);
  }

  function handleAge (e) {
    setAgeRange(e.target.value)
  }

  return (
    <div className="browse">
      {justMatchedId == 0 ? (
        ""
      ) : (
        <MatchModal
          currentUserId={currentUser.id}
          matchedUserId={justMatchedId}
          show={showMatch}
          onClose={() => {
            setShowMatch(false);
          }}
        />
      )}
      <div className="browse-matches">
        <div className="profile" onClick={() => navigate("/profile")}>
          <img src={currentUser.profile_img} className="profile-img"></img>
          {/* FILL THIS UP DYNAMICALLY */}
          <h1>{currentUser.first_name + " " + currentUser.last_name}</h1>
        </div>
        <div
          className="conversations-dropdown"
          onClick={handleConversationClick}
        >
          <span className="dropdown-arrow">↑</span> Conversations{" "}
          <span className="recent">(Recent)</span>
        </div>
        <div
          className={`conversations  ${isShowingConversations ? "" : "hidden"}`}
        >
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
        <span>+/-</span><input className="ageRange" placeholder="Age" onChange={handleAge}></input><span> years</span>
        <div></div>
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
