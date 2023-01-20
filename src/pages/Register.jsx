import React, { useState } from "react";
import "../style.scss";
import AddAvatar from "../img/addAvatar.png";
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(res.user, {
        displayName,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });

      //create empty user chats on firestore
      await setDoc(doc(db, "userChats", res.user.uid), {});

      setLoading(false);
      navigate("/");
    } catch (err) {
      setErr(true);
      console.log(err);
      setLoading(false);
    }
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
          <input style={{ display: "none" }} type={"file"} id={"file"} />
          <label htmlFor={"file"}>
            <img src={AddAvatar} alt="" />
            <span>Add Avatar</span>
          </label>
          <button type={"submit"}>Sign Up</button>
        </form>
        {loading && <span>Creating profile...</span>}
        {err && <span>Something went wrong</span>}
        <p>
          You do have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
