import { useState, useRef } from 'react';
import { FaHeartbeat, FaTimes, FaPlus, FaExclamationTriangle, FaRedo } from 'react-icons/fa';
import usePredictionStore from '../store/predictionStore';
import Spinner from '../components/Spinner';

// Some common symptoms for autocomplete
const COMMON_SYMPTOMS = [
  'fever', 'headache', 'fatigue', 'cough', 'nausea', 'vomiting', 'sore throat',
  'runny nose', 'muscle aches', 'shortness of breath', 'chills', 'dizziness',
  'diarrhea', 'chest pain', 'sweating', 'loss of taste', 'loss of smell', 'rash'
];

function Predict() {
  const [symptoms, setSymptoms] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  const { predict, currentResult, isLoading, clearResult } = usePredictionStore();
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.trim().length > 1) {
      const filtered = COMMON_SYMPTOMS.filter(
        s => s.toLowerCase().includes(value.toLowerCase()) && !symptoms.includes(s)
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const addSymptom = (symptom) => {
    const cleanSym = symptom.trim().toLowerCase();
    if (cleanSym && !symptoms.includes(cleanSym)) {
      setSymptoms([...symptoms, cleanSym]);
    }
    setInputValue('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue) addSymptom(inputValue);
    }
  };

  const removeSymptom = (symptomToRemove) => {
    setSymptoms(symptoms.filter(s => s !== symptomToRemove));
  };

  const handleSubmit = async () => {
    if (symptoms.length === 0) return;
    await predict(symptoms);
  };

  const resetForm = () => {
    setSymptoms([]);
    clearResult();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Intelligent Symptom Checker
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Enter your symptoms below to get an AI-powered disease prediction. Note: This tool is for informational purposes and is not a substitute for professional medical advice.
        </p>
      </div>

      {!currentResult ? (
        <div className="card p-6 md:p-10 animate-fade-in shadow-xl">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-3 text-lg">
              What are you feeling?
            </label>
            <div className="relative">
              <div className="flex border-2 border-primary-100 rounded-xl bg-gray-50/50 p-2 focus-within:border-primary-400 focus-within:bg-white transition-all flex-wrap gap-2">
                {symptoms.map((s, idx) => (
                  <span key={idx} className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-primary-200">
                    {s}
                    <button type="button" onClick={() => removeSymptom(s)} className="hover:text-primary-900 focus:outline-none">
                      <FaTimes className="text-xs" />
                    </button>
                  </span>
                ))}
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 bg-transparent min-w-[150px] outline-none text-gray-800 py-1.5 focus:ring-0 px-2"
                  placeholder={symptoms.length === 0 ? "e.g., headache, fever, cough..." : "Add another symptom..."}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
              </div>
              
              {/* Autocomplete Dropdown */}
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white mt-1 rounded-xl shadow-lg border border-gray-100 py-1 max-h-60 overflow-auto">
                  {suggestions.map((s, idx) => (
                    <li 
                      key={idx}
                      className="px-4 py-2 cursor-pointer hover:bg-primary-50 text-gray-700 flex items-center gap-2"
                      onClick={() => addSymptom(s)}
                    >
                      <FaPlus className="text-xs text-primary-400" /> {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2">Press enter or comma to add a symptom.</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 flex gap-3 text-sm text-yellow-800">
            <FaExclamationTriangle className="text-yellow-600 mt-0.5 shrink-0 text-lg" />
            <p>
              Please enter at least one symptom to run the analysis. The more specific symptoms you provide, the more accurate the prediction might be.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={symptoms.length === 0 || isLoading}
            className="btn-primary w-full py-3.5 text-lg flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <><Spinner size="sm" className="border-white/30 border-t-white" /> Analyzing Symptoms...</>
            ) : (
              <><FaHeartbeat className="text-xl" /> Run Prediction Analysis</>
            )}
          </button>
        </div>
      ) : (
        /* Result View */
        <div className="card overflow-hidden animate-slide-up shadow-xl">
          <div className="bg-hero-gradient p-8 text-white relative">
            <h2 className="text-sm font-medium uppercase tracking-wider text-primary-200 mb-2">Analysis Result</h2>
            <h3 className="font-playfair text-4xl font-bold mb-4">{currentResult.result}</h3>
            
            <div className="mb-2">
              <div className="flex justify-between items-end mb-1">
                <span className="text-sm font-medium">Confidence Score</span>
                <span className="text-2xl font-bold">{currentResult.confidence}%</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${currentResult.confidence >= 70 ? 'bg-green-400' : currentResult.confidence >= 40 ? 'bg-yellow-400' : 'bg-red-400'}`}
                  style={{ width: `${currentResult.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Clinical Description</h4>
              <p className="text-gray-600 leading-relaxed">{currentResult.description}</p>
            </div>
            
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Recommended Actions</h4>
              <ul className="space-y-3">
                {currentResult.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 border-t pt-6">
              <button onClick={resetForm} className="btn-secondary flex-1 flex items-center justify-center gap-2">
                <FaRedo /> New Analysis
              </button>
              <Link to="/ngos" className="btn-primary flex-1 flex items-center justify-center gap-2 text-center">
                Find Nearby Healthcare <FaHeartbeat />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Predict;
