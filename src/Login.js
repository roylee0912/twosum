import React, { useState } from "react";
import "./Login.css";
import logo from "./images/png/logo-black.png";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
    };
    //update all the username
    fetch("http://localhost:9292/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((r) => r.json());

    navigate("/create-account");
  }

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) props.onClose();
  };
  if (!props.show) {
    return null;
  }
  return (
    <div
      className={`modal ${props.show ? "show" : ""}`}
      onClick={props.onClose}
    >
      {/* MAKE SURE TO HAVE THIS FORM BE USED TO CREATE A NEW USER IN BACKEND*/}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="delete-btn-container">
          <button className="delete-btn" onClick={props.onClose}>
            X
          </button>
        </div>

        <div className="modal-header">
          <img src={logo} className="login-logo"></img>
          <h4>GET STARTED</h4>
          <h5>
            By clicking Log In, you agree to our <span>Terms</span>. Learn how
            we process your data in our <span>Privacy Policy</span> and{" "}
            <span>Cookie Policy</span>.
          </h5>
        </div>
        <form className="modal-form" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name="username" placeholder="Username"></input>
          <input type="text" name="password" placeholder="Password"></input>
          <input
            type="text"
            name="check-password"
            placeholder="Check Password"
          ></input>
          <input type="text" name="email" placeholder="Email"></input>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
