import React from "react";

const Navbar = () => {
  return (
    <div className={"navbar"}>
      <span className={"logo"}>Super chat</span>
      <div className="user">
        <img
          src="https://images.pexels.com/photos/15030875/pexels-photo-15030875.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
        />
        <span>John</span>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
