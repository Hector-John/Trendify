import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Navbar = ({setLogin}) => {
  const [menu, setMenu] = useState("Home");

  const {getTotalCartAmount, token, setToken} = useContext(Context)

  const navigate = useNavigate()

  const logout = () =>{
    localStorage.removeItem("token")
    setToken('');
    navigate("/")
  }

  return (
    <div className="navbar">
      <Link to='/'>
      <img src={assets.logo} className="logo" alt="Logo" />
      </Link>
      <ul className="navbarMenu">
        <Link to='/' onClick={() => {setMenu('Home')}} className={menu === "Home" ? "active" : ""}>Home</Link>
        <a href="#categories"  onClick={() => {setMenu('Categories')}} className={menu === "Categories" ? "active" : ""}>Categories</a>
        <a href="#AppDownload" onClick={() => {setMenu('Mobile App')}} className={menu === "Mobile App" ? "active" : ""}>Mobile App</a>
        <a href="#footer" onClick={() => {setMenu('Contact Us')}} className={menu === "Contact Us" ? "active" : ""}>Contact Us</a>
      </ul>
      <div className="navbarRight">
        <img src={assets.search_icon} alt="" />
        <div className="navbarSearchicon">
          <Link to='/cart'>
          <img src={assets.basket_icon} alt="" /> 
          </Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token? <button onClick={() =>setLogin(true)}> Sign In</button>:
        <div className="navProfile">
          <img src={assets.profile_icon} alt="" />
          <ul className="navProfileDropdown">
            <li>
              <img src={assets.bag_icon} alt="" />
              <p>Orders</p>
            </li>
            <hr />
            <li onClick={logout} ><img src={assets.logout_icon} alt="" />
            <p>Logout</p>
            </li>
          </ul>
        </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
