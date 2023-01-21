import React, { useState } from "react";
import "../style.scss";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      // const res = await signInWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password);

      setLoading(false);
      navigate("/");
    } catch (err) {
      setErr(true);
      console.log(err);
      setLoading(false);
    }
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
          {loading && <span>Loggingin in progress...</span>}
          {err && <span>Something went wrong</span>}
          <p>
            You do not have account? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
