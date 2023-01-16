import React from "react";

const Message = () => {
  return (
    <div className={"message owner"}>
      <div className="messageInfo">
        <img
          src="https://images.pexels.com/photos/15030875/pexels-photo-15030875.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
          consequuntur corporis esse et eveniet expedita, facilis in iste
          laudantium libero nam nobis nostrum placeat praesentium quia quisquam
          sequi, vel veritatis.
        </p>
        <img
          src="https://images.pexels.com/photos/15030875/pexels-photo-15030875.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
        />
      </div>
    </div>
  );
};

export default Message;
