import React, { useState } from "react";
import "../style.scss";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [err, setErr] = useState(false);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
      // setLoading(false);
    }
  };
  return (
    <div>
      <div className={"formContainer"}>
        <div className="formWrapper">
          <span className={"logo"}>Super Chat</span>
          <span className={"title"}>Login</span>
          <form onSubmit={handleSubmit}>
            <input type={"email"} placeholder={"Email"} />
            <input type={"password"} placeholder={"Password"} />
            <button type={"submit"}>Login</button>
          </form>
          {err && <p>Something went wrong</p>}
          <p>
            You do not have account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
