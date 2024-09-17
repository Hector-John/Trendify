import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footerContent">
        <div className="footerLeft">
          <img src={assets.logo} alt="" />
          <p>
            Discover the latest trends in footwear and step into style with our
            wide selection of shoes delivered right to your doorstep. Whether
            you're looking for sneakers, boots, or sandals, we've got you
            covered.
          </p>
          <div className="footerSocials">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footerCenter">
          <h2>TRENDIFY INC.</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footerRight">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+254 738 358757</li>
            <li>hakheem67@trendify.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="copyright">
        Copyright 2024 Trendify Kicks | All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
