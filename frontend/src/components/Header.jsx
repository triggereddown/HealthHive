import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="w-full flex flex-col md:flex-row bg-blue-400 rounded-md p-4 items-center justify-between">
      {/* Left Side */}
      <div className="md:w-1/2 space-y-4">
        <p className="text-5xl font-bold pl-3">Search Your Symptoms</p>
        <p className="text-3xl font-semibold text-gray-700 pl-3">
          For Correct Diagnosis
        </p>
        <div className="  gap-2">
          <p className="py-4 pl-3">
            Your AI companion for smarter health. From disease analysis to
            mental wellness chatbots — we're here to make healthcare simple,
            fast, and accessible.
          </p>
          <a
            href="#"
            className=" pl-3 inline-flex items-center ml-2 gap-2 bg-white text-blue-900 px-4 py-2 rounded-full font-medium hover:bg-blue-600 hover:text-white transition"
          >
            Use Model <img className="w-6" src={assets.logout_icon} alt="" />
          </a>
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 max-w-full mt-6 md:mt-0">
        <img
          className="w-full h-auto object-contain rounded-lg max-h-[300px] mx-auto"
          src={assets.header_img}
          alt="Diagnosis Visual"
        />
      </div>
    </div>
  );
};

export default Header;
