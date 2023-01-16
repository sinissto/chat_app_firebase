import React from "react";
import "../style.scss";

const Login = () => {
  const handleLogin = (e) => {
    console.log(e);
  };
  return (
    <div>
      <div className={"formContainer"}>
        <div className="formWrapper">
          <span className={"logo"}>Super Chat</span>
          <span className={"title"}>Login</span>
          <form onSubmit={handleLogin}>
            <input type={"email"} placeholder={"Email"} />
            <input type={"password"} placeholder={"Password"} />
            <button type={"submit"}>Login</button>
          </form>
          <p>You do not have account? Register</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
