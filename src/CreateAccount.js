import React from "react";
import "./CreateAccount.css";
import logo from "./images/png/logo-color.png";
import { useNavigate } from "react-router-dom";
const CreateAccount = () => {
  const navigate = useNavigate();
  
  
  return (
    <div className="create-account">
      {/* MAKE SURE TO HAVE THIS FORM BE USED TO CREATE A NEW USER IN BACKEND*/}
      <div className="create-account-navbar">
        <img src={logo} className="create-account-logo"></img>
      </div>
      <div className="create-account-content">
        <h1 className="create-account-header">CREATE ACCOUNT</h1>
        <div className="create-account-forms">
          <form className="create-account-left-form">
            <p className="create-account-text-label">First Name</p>
            <input
              type="text"
              name="first-name"
              placeholder="First Name"
            ></input>
            <p className="create-account-text-label">Birthday</p>
            <div className="group-inputs">
              <input
                type="text"
                name="month"
                placeholder="MM"
                className="group-input"
              ></input> 
              <input
                type="text"
                name="day"
                placeholder="DD"
                className="group-input"
              ></input>
              <input
                type="text"
                name="year"
                placeholder="YYYY"
                className="group-input"
              ></input>
            </div>
            <p className="create-account-text-label">Gender</p>
            <div className="group-inputs">
              <button>Man</button>
              <button>Woman</button>
              <button>Other</button>
            </div>
            <p className="create-account-text-label">Show Me</p>
            <div className="group-inputs">
              <button>Men</button>
              <button>Women</button>
              <button>Everyone</button>
            </div>
            <p className="create-account-text-label">Email Address</p>
            <input
              type="email"
              value="theemailyousubmitted@email.com"
              disabled
            ></input>
          </form>
          <form className=" create-account-right-form">
            <p className="create-account-text-label">Profile Photo</p>
            <div className="pictures">
              <div className="picture"></div>
              <div className="picture"></div>
              <div className="picture"></div>
              <div className="picture"></div>
              <div className="picture"></div>
              <div className="picture"></div>
            </div>
            <p className="pictures-description">
              Add at least one photo to continue
            </p>
          </form>
        </div>
        <button
          className="submit-create-account-btn"
          onClick={() => navigate("/browse")}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
