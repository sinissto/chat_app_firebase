import React from "react";
import "../style.scss";
import AddAvatar from "../img/addAvatar.png";

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
  };

  return (
    <div className={"formContainer"}>
      <div className="formWrapper">
        <span className={"logo"}>Super Chat</span>
        <span className={"title"}>Register</span>
        <form onSubmit={handleRegister}>
          <input type={"text"} placeholder={"Display name"} />
          <input type={"email"} placeholder={"Email"} />
          <input type={"password"} placeholder={"Password"} />
          <input type={"file"} id={"file"} />
          <label htmlFor={"file"}>
            <img src={AddAvatar} alt="" />
            <spam>Add Avatar</spam>
          </label>
          <button type={"submit"}>Sign Up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
