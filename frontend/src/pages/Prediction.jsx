import React, { useState } from "react";

const Prediction = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    symptoms: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Prediction failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = () => {
    switch (step) {
      case 1:
        return (
          <>
            <label className=" text-2xl p-3 mt-4">Enter Your Name:</label>
            <input
              className="border-2 border-gray-300 rounded-md p-2 "
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </>
        );
      case 2:
        return (
          <>
            <label className=" text-2xl p-3 ">Your Age:</label>
            <input
              className="border-2 border-gray-300 rounded-md p-2 ml-2 "
              type="number"
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
            />
          </>
        );
      case 3:
        return (
          <>
            <label className="text-2xl p-3 ">Your Gender:</label>
            <select
              className="border-2 border-gray-300 rounded-md p-2 "
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </>
        );
      case 4:
        return (
          <>
            <label className="text-2xl p-3">
              Your Symptoms (comma separated):
            </label>
            <textarea
              className="border-2 border-gray-300 rounded-md p-2  w-full mt-3"
              rows={3}
              value={formData.symptoms}
              onChange={(e) => handleChange("symptoms", e.target.value)}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2 className="text-4xl font-bold mb-7">🧠 HealthHive Prediction</h2>

      {!result ? (
        <>
          <div style={{ marginBottom: 20 }}>{renderInput()}</div>
          <button
            className="bg-blue-500 text-white p-2 rounded-md ml-3"
            onClick={handleNext}
            disabled={loading}
          >
            {step < 4 ? "Next" : "Submit"}
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl">
            👋 Hi {result.name}, here are your results:
          </h3>
          <p>
            <strong className="text-blue-600 text-2xl p-4">
              Matched Categories:
            </strong>{" "}
            {result.matched_categories.join(", ")}
          </p>
          <div className="border-2 border-gray-700 rounded-md p-4 mt-4">
            <ul>
              {result.predictions.map((pred, idx) => (
                <li key={idx} style={{ marginBottom: 12 }}>
                  <p>
                    <strong>🦠 Disease:</strong> {pred.disease}
                  </p>
                  <p>
                    <strong>🔬 Category:</strong> {pred.category}
                  </p>
                  <p>
                    <strong>💊 Prescription:</strong> {pred.prescription}
                  </p>
                  <p>
                    <strong>🍎 Deficiency:</strong> {pred.deficiency}
                  </p>
                  <p>
                    <strong>📋 Suggested Tests:</strong>{" "}
                    {pred.suggested_tests.join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded-md ml-3 mt-3"
            onClick={() => window.location.reload()}
          >
            Restart
          </button>
        </>
      )}
    </div>
  );
};

export default Prediction;
