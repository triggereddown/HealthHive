import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Features = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (featureId) => {
    if (featureId === 1) {
      navigate("/prediction");
    } else if (featureId === 2) {
      navigate("/doctor-matching");
    } else if (featureId === 4) {
      navigate("/ngo-listing");
    }
  };

  return (
    <div
      className="my-4 gap-4  bg-blue-400 rounded-md p-4 items-center justify-center "
      style={{
        height: "75vh",
      }}
    >
      <p className="text-4xl font-medium ">
        Empowering Healthcare, One Feature at a Time
      </p>
      <p className="text-md mt-4 mb-4">
        Discover innovative tools designed to connect patients, doctors, and
        NGOs seamlessly. From AI-driven disease prediction to symptom-based
        doctor matching and NGO support, our platform ensures quality healthcare
        is accessible to everyone, everywhere.
      </p>
      <div className="my-4 gap-4 flex flex-col md:flex-row bg-blue-400 rounded-md p-4 items-center justify-center">
        {/* first div */}
        <div
          className="w-[250px] h-[250px] bg-blue-200 rounded-md p-4 flex flex-col items-center justify-between shadow-md"
          onClick={() => handleFeatureClick(1)}
        >
          <img src={assets.prediction_img} alt="" className="w-32" />
          <h2 className="text-xl font-bold text-center">Disease Prediction</h2>
          <p className="text-center text-sm">This Feature is for SOS model</p>
        </div>

        {/* second card div */}
        <div
          className="w-[250px] h-[250px] bg-blue-200 rounded-md p-4 flex flex-col items-center justify-between shadow-md cursor-pointer"
          onClick={() => handleFeatureClick(2)}
        >
          <img src={assets.doctor_img} alt="" className="w-32" />
          <h2 className="text-xl font-bold text-center">Symptoms to Doctor</h2>
          <p className="text-center text-sm">
            Get matched to a doctor based on symptoms
          </p>
        </div>

        {/* third card div */}
        <div className="w-[250px] h-[250px] bg-blue-200 rounded-md p-4 flex flex-col items-center justify-between shadow-md">
          <img src={assets.sos_img} alt="" className="w-32" />
          <h2 className="text-xl font-bold text-center">Feature 3</h2>
          <p className="text-center text-sm">This Feature is for SOS model</p>
        </div>

        {/* fourth card div - NGO Listing */}
        <div
          className="w-[250px] h-[250px] bg-blue-200 rounded-md p-4 flex flex-col items-center justify-between shadow-md cursor-pointer"
          onClick={() => handleFeatureClick(4)}
        >
          <img src={assets.ngolist_img} alt="" className="w-32" />
          <h2 className="text-xl font-bold text-center">NGO Listing</h2>
          <p className="text-center text-sm">
            Add and search NGOs for donation opportunities
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
