import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(false);
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300 bg-blue-50 p-4 rounded-md ">
      <p className="text-2xl text-blue-400 font-bold">HealthHive.</p>
      {/* <img className="w-8" src={assets.logout_icon} alt="" /> */}
      <ul className="flex gap-4 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5" />
        </NavLink>

        <NavLink to="/services">
          <li className="py-1">Services</li>
          <hr className="border-none outline-none h-0.5" />
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5" />
        </NavLink>
      </ul>
      <div>
        {token ? (
          <div></div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-400 text-white px-6 py-2 rounded-full font-medium"
          >
            Register
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
