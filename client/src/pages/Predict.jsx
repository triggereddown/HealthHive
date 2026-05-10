import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePredictionStore from '../store/predictionStore';

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

  const [confidenceWidth, setConfidenceWidth] = useState(0);
  useEffect(() => {
    if (currentResult) {
      setTimeout(() => setConfidenceWidth(currentResult.confidence), 100);
    } else {
      setConfidenceWidth(0);
    }
  }, [currentResult]);

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
    if (e.key === 'Enter' || e.key === ',') {
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
    <div className="max-w-3xl mx-auto px-6 py-24 pb-32">
      <div className="mb-12">
        <span className="section-label">/ SYMPTOM ANALYSIS ENGINE</span>
        <h1 className="font-display text-display-sm uppercase text-ink">
          INTELLIGENT SYMPTOM CHECKER
        </h1>
        <p className="font-body font-light text-sm text-ink-muted max-w-xl mt-4">
          Enter your symptoms below to get an AI-powered disease prediction. Note: This tool is for informational purposes and is not a substitute for professional medical advice.
        </p>
        <div className="border-t border-[#222222] mt-8 mb-12" />
      </div>

      {!currentResult ? (
        <div className="bg-surface border border-[#222222] p-8 md:p-12 rounded-none">
          <div className="bg-surface2 border-b border-[#1A1A1A] px-6 py-3 -mx-8 -mt-8 md:-mx-12 md:-mt-12 mb-8 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-600" />
            <span className="font-mono text-xs text-ink-faint ml-4">comcare://symptom-analysis</span>
          </div>

          <div className="mb-8">
            <label className="section-label mb-4">ENTER YOUR SYMPTOMS</label>
            <div className="relative">
              <div className="min-h-[80px] bg-surface2 border border-[#2A2A2A] p-4 flex flex-wrap gap-2 items-start focus-within:border-accent transition-colors rounded-none">
                {symptoms.map((s, idx) => (
                  <span key={idx} className="bg-accent-glow border border-accent text-accent text-2xs font-mono px-3 py-1.5 rounded-full flex items-center gap-2">
                    {s}
                    <button type="button" onClick={() => removeSymptom(s)} className="text-accent hover:text-ink focus:outline-none">
                      ×
                    </button>
                  </span>
                ))}
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 bg-transparent min-w-[180px] outline-none text-ink placeholder-ink-faint font-mono text-sm py-1"
                  placeholder={symptoms.length === 0 ? "e.g., headache, fever, cough..." : ""}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
              </div>
              
              {/* Autocomplete Dropdown */}
              {suggestions.length > 0 && (
                <ul className="absolute z-50 w-full bg-surface2 border border-[#2A2A2A] mt-1 shadow-elevated py-1 max-h-60 overflow-auto">
                  {suggestions.map((s, idx) => (
                    <li 
                      key={idx}
                      className="px-4 py-3 cursor-pointer hover:bg-surface text-ink-muted hover:text-ink font-body text-sm flex items-center"
                      onClick={() => addSymptom(s)}
                    >
                      <span className="font-mono text-accent text-xs mr-2">$</span> {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="bg-surface2 border-l-2 border-warning px-5 py-4 flex gap-3 mt-6 mb-8">
            <span className="text-warning">⚠</span>
            <p className="font-body font-light text-xs text-ink-muted">
              Please enter at least one symptom to run the analysis. The more specific symptoms you provide, the more accurate the prediction might be.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={symptoms.length === 0 || isLoading}
            className="btn-primary w-full py-4 text-sm mt-8"
          >
            {isLoading ? (
              <span className="font-mono flex items-center justify-center gap-1">
                ANALYZING<span className="animate-pulse">...</span>
              </span>
            ) : (
              "RUN PREDICTION ANALYSIS →"
            )}
          </button>
        </div>
      ) : (
        /* Result View */
        <div className="bg-surface border-t-2 border-t-accent border-l border-r border-b border-[#222222] animate-slide-up relative">
          <div className="p-8 md:p-12">
            <span className="section-label">/ ANALYSIS RESULT</span>
            <h3 className="font-display text-display-md uppercase text-ink mt-2 mb-8 leading-none tracking-tightest">
              {currentResult.result}
            </h3>
            
            <div className="flex justify-between items-end">
              <span className="section-label mb-0">CONFIDENCE</span>
              <span className="font-mono text-5xl text-accent">{currentResult.confidence}%</span>
            </div>
            <div className="h-px w-full bg-[#1A1A1A] mt-4">
              <div 
                className="bg-accent h-px transition-all duration-1000 ease-out"
                style={{ width: `${confidenceWidth}%` }}
              />
            </div>
          </div>
          
          <div className="border-t border-[#1A1A1A]" />
          
          <div className="p-8 md:p-12">
            <span className="section-label">/ CLINICAL DESCRIPTION</span>
            <p className="font-body font-light text-sm text-ink-muted leading-relaxed">
              {currentResult.description}
            </p>
          </div>
          
          <div className="border-t border-[#1A1A1A]" />
          
          <div className="p-8 md:p-12">
            <span className="section-label">/ RECOMMENDED ACTIONS</span>
            <div className="flex flex-col">
              {currentResult.recommendations.map((rec, idx) => (
                <div key={idx} className="flex gap-4 py-4 border-b border-[#1A1A1A] last:border-0">
                  <span className="font-mono text-2xs text-ink-faint w-6 shrink-0 pt-0.5">0{idx + 1}</span>
                  <p className="font-body font-light text-sm text-ink-muted">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 border-t border-[#1A1A1A] flex flex-col sm:flex-row gap-4">
            <button onClick={resetForm} className="btn-secondary flex-1">
              ← NEW ANALYSIS
            </button>
            <Link to="/ngos" className="btn-primary flex-1">
              FIND NEARBY HEALTHCARE →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Predict;
