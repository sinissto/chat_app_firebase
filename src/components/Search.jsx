import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  // console.log(user);

  // Create a query against the collection.
  const handleSearch = async (e) => {
    const usersRef = collection(db, "users");

    const q = query(usersRef, where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.length === undefined) {
        setErr(true);
        setUser(null);
      }

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setErr(false);
        setUser(doc.data());
      });
    } catch (err) {
      console.log("User nije pronadjen");
      setErr(true);
    }
  };

  const handleKeyDown = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // console.log("Chat user izabran i treba ga prebaciti u userChats");

    // check whether th group(chats in firebase) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chat
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error(err);
      //create chat group
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className={"search"}>
      <div className={"searchForm"}>
        <input
          type={"text"}
          placeholder={"Search..."}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          value={username}
        />
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
