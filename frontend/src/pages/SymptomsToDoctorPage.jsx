// SymptomsToDoctorPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const specialistMap = {
  rash: "Dermatologist",
  skin: "Dermatologist",
  fever: "General Physician",
  chestpain: "Cardiologist",
  anxiety: "Psychiatrist",
  jointpain: "Orthopedic",
  eyepain: "Ophthalmologist",
};

function getSpecialist(symptomText) {
  const lower = symptomText.toLowerCase();
  for (const keyword in specialistMap) {
    if (lower.includes(keyword)) return specialistMap[keyword];
  }
  return "General Physician";
}

const SymptomsToDoctorPage = () => {
  const [symptom, setSymptom] = useState("");
  const [doctorRecommendation, setDoctorRecommendation] = useState("");

  const handleMatch = () => {
    const doctor = getSpecialist(symptom);
    setDoctorRecommendation(`You should see a ${doctor}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Symptoms to Doctor Matching</h1>
      <div className="my-4">
        <input
          type="text"
          placeholder="Enter your symptoms"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <button
          onClick={handleMatch}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Get Doctor Recommendation
        </button>
      </div>
      {doctorRecommendation && (
        <div className="mt-4 p-4 bg-green-100 rounded-md">
          <h2 className="text-xl font-semibold">{doctorRecommendation}</h2>
        </div>
      )}
    </div>
  );
};

export default SymptomsToDoctorPage;
