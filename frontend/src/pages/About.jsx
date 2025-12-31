import React from "react";
import ChatBotIcon from "../components/ChatBotIcon";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const handleClickOnAbout = () => {
    navigate("/");
  };

  return (
    <div>
      <div
        className="bg-blue-500 rounded-md flex flex-row justify-evenly p-4"
        style={{
          height: "70vh",
        }}
      >
        {/* Left side div */}
        <div className="bg-blue-200 rounded-l-md p-4">
          <h1 className="text-4xl">About Us</h1>
          <p className="text-sm mt-4">
            We are HealthHive , a passionate team of innovators dedicated to
            transforming healthcare accessibility and quality through
            technology. Our mission is to bridge gaps in the healthcare
            ecosystem by connecting patients with the right doctors and NGOs,
            ensuring that everyone—regardless of their location or
            resources—receives the care they deserve. At the heart of our
            project lies a simple yet powerful idea: leveraging cutting-edge
            technologies like AI, machine learning, and blockchain to create
            smarter, more inclusive healthcare solutions. Whether it’s helping
            patients find the most suitable doctors based on their symptoms or
            enabling NGOs to reach those in need, we strive to make healthcare
            equitable, efficient, and impactful. Our team brings together
            diverse skills and expertise:
            <br />
            Deep Moitra
            <br />
            Sneh Ranjan
            <br />
            Amritanshu Goutam
            <br />
            Rishav Bharadwaj
            <br />
            By participating in this hackathon, we aim to bring our ideas to
            life and contribute to a healthier, more inclusive future. Join us
            on this journey as we reimagine healthcare—one connection at a time!
          </p>
          <div>
            <a href="">
              <button
                className="rounded-md bg-blue-500 p-2 mt-5 text-white"
                onClick={() => handleClickOnAbout()}
              >
                HealthHive
              </button>
            </a>
          </div>
        </div>
        {/* Right Side */}
        <div className="bg-blue-200 rounded-r-md p-4">
          <img
            className="object-contain rounded-lg mx-auto w-full max-w-[700px] h-auto"
            style={{
              height: "400px",
              width: "300px",
            }}
            src={assets.header_img}
            alt=""
          />
        </div>
      </div>

      <ChatBotIcon />
    </div>
  );
};

export default About;
