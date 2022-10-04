import React, { useState } from "react";
import CreateAccount from "./CreateAccount";
import Home from "./Home";
import Profile from "./Profile";
import Browse from "./Browse";
import Chat from "./Chat";
import { Routes, Route } from "react-router-dom";
const App = () => {
  const [user, setUser] = useState({});

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home onSignupSubmit={setUser} />
            </>
          }
        />
        <Route
          path="/create-account"
          element={
            <>
              <CreateAccount currentUser={user} />
            </>
          }
        />
        <Route
          path="/profile/:email"
          element={
            <>
              <Profile currentUser={user} />
            </>
          }
        />
        <Route
          path="/browse"
          element={
            <>
              <Browse currentUser={user} />
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <Chat />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
