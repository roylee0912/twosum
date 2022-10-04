import React, { useState, useEffect } from "react";
import "./CreateAccount.css";
import logo from "./images/png/logo-color.png";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    fetch("http://localhost:9292/last-user")
      .then((r) => r.json())
      .then((user) => setCurrentUser({ ...user }));
  }, []);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [desiredSex, setDesiredSex] = useState("");
  const [bio, setBio] = useState("");
  const [values, setValues] = useState({
    imagePreviewUrl: "",
    picFile: null,
  });

  let fileInput = React.createRef();

  function handleShowMeClick(e) {
    e.preventDefault();
    setDesiredSex(e.target.value);
  }

  function handleGenderClick(e) {
    e.preventDefault();
    setGender(e.target.value);
  }

  function addPics() {
    fileInput.current.click();
  }

  function handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let infile = e.target.files[0];
    reader.onloadend = () => {
      setValues({ ...values, picFile: infile, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(infile);
  }

  function handleSubmit(e) {
    e.preventDefault();
    currentUser["first_name"] = firstName;
    currentUser["last_name"] = lastName;
    currentUser["age"] = age;
    currentUser["bio"] = bio;
    currentUser["gender"] = gender;
    currentUser["desired_sex"] = desiredSex;
    currentUser["profile_img"] = values.imagePreviewUrl;
    fetch(`http://localhost:9292/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentUser),
    }).then((r) => r.json());
    navigate("/browse");
  }

  return (
    <div className="create-account">
      {/* MAKE SURE TO HAVE THIS FORM BE USED TO CREATE A NEW USER IN BACKEND*/}
      <div className="create-account-navbar">
        <img src={logo} alt="TwoSum" className="create-account-logo"></img>
      </div>
      <div className="create-account-content">
        <h1 className="create-account-header">CREATE ACCOUNT</h1>
        <div className="create-account-forms">
          <form
            className="create-account-left-form"
            onSubmit={(e) => handleSubmit(e)}
          >
            <p className="create-account-text-label">First Name</p>
            <input
              type="text"
              name="first-name"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>

            <p className="create-account-text-label">Last Name</p>
            <input
              type="text"
              name="last-name"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            ></input>

            <p className="create-account-text-label">Age</p>
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
                type="number"
                name="age"
                placeholder="Age"
                className="group-input"
                onChange={(e) => setAge(e.target.value)}
              ></input>
            </div>

            <p className="create-account-text-label">Gender</p>
            <div className="group-inputs">
              <button
                onClick={(e) => {
                  handleGenderClick(e);
                }}
                value="male"
              >
                Man
              </button>
              <button
                onClick={(e) => {
                  handleGenderClick(e);
                }}
                value="female"
              >
                Woman
              </button>
              <button
                onClick={(e) => {
                  handleGenderClick(e);
                }}
                value="other"
              >
                Other
              </button>
            </div>
            <p className="create-account-text-label">Show Me</p>
            <div className="group-inputs">
              <button
                onClick={(e) => {
                  handleShowMeClick(e);
                }}
                value="men"
              >
                Men
              </button>
              <button
                onClick={(e) => {
                  handleShowMeClick(e);
                }}
                value="women"
              >
                Women
              </button>
              <button
                onClick={(e) => {
                  handleShowMeClick(e);
                }}
                value="everyone"
              >
                Everyone
              </button>
            </div>
            <p className="create-account-text-label">Email Address</p>
            <input
              type="text"
              name="email"
              placeholder={currentUser.email}
              value={currentUser.email}
              disabled
            ></input>
            <p className="create-account-text-label">Add Bio</p>
            <input
              type="text"
              name="add-bio"
              placeholder="A little bit about yourself"
              onChange={(e) => setBio(e.target.value)}
            ></input>
            <p className="pictures-description">Add a profile picture</p>

            <p className="create-account-text-label">Profile Photo</p>

            <div className="pictures" onClick={() => addPics()}>
              <img className="picture" src={values.imagePreviewUrl} alt="" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInput}
                style={{ display: "none" }}
              />
            </div>

            <button className="submit-create-account-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
