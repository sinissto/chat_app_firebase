import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      // console.log(doc.data()?.messages);
      doc.exists() && setMessages(doc.data().messages);
      // setMessages([{ id: 1, date: Date.now(), text: "Ovo je test poruka" }]);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className={"messages"}>
      {messages?.map((msg) => (
        <Message message={msg} key={msg.id} />
      ))}
    </div>
  );
};

export default Messages;
