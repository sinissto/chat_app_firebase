import React, { useContext, useState } from "react";
import Attach from "../img/attach.png";
import AddImg from "../img/img.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    const chatRef = doc(db, "chats", data.chatId);

    if (img) {
      try {
        //sent img
        const storageRef = ref(storage, uuid());

        await uploadBytesResumable(storageRef, img);

        const downloadURL = await getDownloadURL(storageRef);
        console.log(downloadURL);

        await updateDoc(chatRef, {
          messages: arrayUnion({
            id: uuid(),
            text,
            photoURL: downloadURL,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      } catch (err) {
        // setErr(true);
        console.log(err);
      }
    } else {
      //send text

      await updateDoc(chatRef, {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className={"input"}>
      <input
        type="text"
        placeholder={"Message"}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className={"send"}>
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id={"file"}
          onChange={(e) => setImg(e.target.files[0])}
          // value={img}
        />
        <input
          type="file"
          style={{ display: "none" }}
          id={"file"}
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={AddImg} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
