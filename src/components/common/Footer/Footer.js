import React from 'react';
import './Footer.css'; // Import your CSS file

function Footer() {
  return (
    <div className="footer">
    <div className="footer-menu">
      <a href="#">Privacy Policy</a>
      <span className="menu-divider">|</span>
      <a href="#">Rules and Regulations</a>
      <span className="menu-divider">|</span>
      <a href="#">KYC</a>
      <span className="menu-divider">|</span>
      <a href="#">Terms and Conditions</a>
      <span className="menu-divider">|</span>
      <a href="#">Responsible Gambling</a>
    </div>
    <div className="download-apk">
      <button className="download-button">Download APK</button>
    </div>
  </div>
  );
}

export default Footer;
