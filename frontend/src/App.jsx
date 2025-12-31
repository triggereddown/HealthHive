import React from "react";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SymptomsToDoctorPage from "./pages/SymptomsToDoctorPage";
import NGOPage from "./pages/NGOPage";
import About from "./pages/About";
import Prediction from "./pages/Prediction";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor-matching" element={<SymptomsToDoctorPage />} />
        <Route path="/ngo-listing" element={<NGOPage />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </div>
  );
};

export default App;
