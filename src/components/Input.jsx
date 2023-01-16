import React from "react";
import Attach from "../img/attach.png";
import AddImg from "../img/img.png";

const Input = () => {
  return (
    <div className={"input"}>
      <input type="text" placeholder={"Message"} />
      <div className={"send"}>
        <img src={Attach} alt="" />
        <input type="file" style={{ display: "none" }} id={"file"} />
        <label htmlFor="file">
          <img src={AddImg} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
