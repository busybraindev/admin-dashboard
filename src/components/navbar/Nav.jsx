import React from "react";
import "./nav.css";
import { assets } from "../../assets/assets";

const Nav = () => {
  return (
    <div className="nav">
      <img className="logo" src={assets.logo}></img>
      <img src={assets.profile_image} className="profile" alt="" />
    </div>
  );
};

export default Nav;
