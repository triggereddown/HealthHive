// Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-100 text-black font-medium py-6 rounded-md p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Left Section */}
        <div className="flex-1">
          <p className="text-2xl">&copy; 2025 HealthHive.</p>
        </div>

        {/* Center Section */}
        <div className="flex-1">
          <ul className="flex justify-center space-x-6">
            <li>
              <a href="#about" className="text-sm hover:text-blue-500">
                About Us
              </a>
            </li>
            <li>
              <a href="#services" className="text-sm hover:text-blue-500">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="text-sm hover:text-blue-500">
                Contact
              </a>
            </li>
            <li>
              <a href="#privacy" className="text-sm hover:text-blue-500">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <ul className="flex justify-end space-x-6">
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                className="text-sm hover:text-blue-500"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                className="text-sm hover:text-blue-500"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="text-sm hover:text-blue-500"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                className="text-sm hover:text-blue-500"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
