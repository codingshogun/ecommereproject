import React from "react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <h2>&copy; GwapoShop</h2>
      <div className="icons">
        <a href="https://www.instagram.com">
          <FaInstagram color="white" />
        </a>
        <a href="https://www.linkedin.com">
          <FaLinkedin color="white" />
        </a>
        <a href="https://www.facebook.com">
          <FaFacebook color="white" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
