'use strict';

const { GoogleGenerativeAI } = require('@google/generative-ai');

// ─────────────────────────────────────────────────────────────
// FALLBACK — Rule-based engine (used when Gemini is unavailable
// or quota is exceeded, so the app never goes fully offline)
// ─────────────────────────────────────────────────────────────

const DISEASE_DATABASE = [
  {
    name: 'Common Cold',
    symptoms: ['runny nose', 'sneezing', 'sore throat', 'cough', 'congestion', 'mild fever', 'headache', 'fatigue'],
    description: 'A viral infection of the upper respiratory tract, usually harmless and resolves within 7–10 days.',
    recommendations: [
      'Rest and stay hydrated',
      'Use saline nasal spray for congestion',
      'Take over-the-counter cold remedies',
      'Consult a doctor if symptoms worsen after 10 days',
    ],
  },
  {
    name: 'Influenza (Flu)',
    symptoms: ['high fever', 'chills', 'muscle aches', 'fatigue', 'headache', 'cough', 'sore throat', 'vomiting', 'body pain'],
    description: 'A contagious respiratory illness caused by influenza viruses with sudden onset of symptoms.',
    recommendations: [
      'Stay home and rest',
      'Drink plenty of fluids',
      'Take antiviral medications if prescribed within 48 hours',
      'Seek medical care if symptoms are severe',
    ],
  },
  {
    name: 'COVID-19',
    symptoms: ['fever', 'dry cough', 'fatigue', 'loss of taste', 'loss of smell', 'shortness of breath', 'body pain', 'headache', 'sore throat'],
    description: 'A respiratory illness caused by the SARS-CoV-2 virus with a wide range of symptom severity.',
    recommendations: [
      'Isolate immediately and get tested',
      'Monitor oxygen levels with a pulse oximeter',
      'Stay hydrated and rest',
      'Seek emergency care if breathing becomes difficult',
    ],
  },
  {
    name: 'Malaria',
    symptoms: ['high fever', 'chills', 'sweating', 'headache', 'nausea', 'vomiting', 'muscle pain', 'fatigue'],
    description: 'A mosquito-borne infectious disease caused by Plasmodium parasites, common in tropical regions.',
    recommendations: [
      'Seek immediate medical diagnosis via blood test',
      'Take prescribed antimalarial drugs',
      'Use mosquito nets and repellents',
      'Complete the full course of treatment',
    ],
  },
  {
    name: 'Typhoid Fever',
    symptoms: ['prolonged fever', 'weakness', 'stomach pain', 'headache', 'loss of appetite', 'constipation', 'diarrhea', 'rash'],
    description: 'A bacterial infection caused by Salmonella typhi, spread through contaminated food and water.',
    recommendations: [
      'Seek medical diagnosis with blood/stool culture',
      'Take the full course of prescribed antibiotics',
      'Drink only purified water',
      'Maintain strict hygiene and sanitation',
    ],
  },
  {
    name: 'Dengue Fever',
    symptoms: ['sudden high fever', 'severe headache', 'pain behind eyes', 'joint pain', 'muscle pain', 'rash', 'fatigue', 'nausea'],
    description: 'A mosquito-borne viral infection transmitted by Aedes mosquitoes, common in tropical areas.',
    recommendations: [
      'Visit a doctor immediately for platelet count test',
      'Stay well-hydrated with ORS or fluids',
      'Rest and avoid aspirin/ibuprofen',
      'Use mosquito protection measures',
    ],
  },
  {
    name: 'Diabetes (Type 2)',
    symptoms: ['frequent urination', 'excessive thirst', 'blurred vision', 'fatigue', 'slow healing wounds', 'numbness in hands', 'numbness in feet', 'weight loss'],
    description: 'A chronic metabolic condition where the body cannot effectively use insulin, leading to high blood sugar.',
    recommendations: [
      'Consult a diabetologist for HbA1c testing',
      'Follow a low-glycemic diet',
      'Exercise regularly (30 min/day)',
      'Monitor blood sugar levels consistently',
    ],
  },
  {
    name: 'Hypertension',
    symptoms: ['headache', 'dizziness', 'blurred vision', 'chest pain', 'shortness of breath', 'nosebleed', 'fatigue', 'palpitations'],
    description: 'A chronic condition where blood pressure in the arteries is persistently elevated.',
    recommendations: [
      'Measure blood pressure regularly',
      'Reduce salt and processed food intake',
      'Exercise moderately and manage stress',
      'Consult a doctor about medication if BP stays high',
    ],
  },
  {
    name: 'Asthma',
    symptoms: ['shortness of breath', 'wheezing', 'chest tightness', 'coughing', 'difficulty breathing', 'night cough'],
    description: 'A chronic lung disease that inflames and narrows the airways, causing recurrent episodes of breathlessness.',
    recommendations: [
      'Use prescribed inhalers as directed',
      'Avoid known triggers (dust, smoke, allergens)',
      'Monitor peak flow readings',
      'Have an emergency action plan ready',
    ],
  },
  {
    name: 'Gastroenteritis',
    symptoms: ['diarrhea', 'vomiting', 'nausea', 'stomach cramps', 'abdominal pain', 'mild fever', 'headache', 'dehydration'],
    description: 'Inflammation of the stomach and intestines, usually caused by a viral or bacterial infection.',
    recommendations: [
      'Stay hydrated with ORS solutions',
      'Follow a bland diet (bananas, rice, applesauce, toast)',
      'Avoid dairy and fatty foods temporarily',
      'Seek care if symptoms persist beyond 3 days',
    ],
  },
  {
    name: 'Migraine',
    symptoms: ['severe headache', 'nausea', 'vomiting', 'sensitivity to light', 'sensitivity to sound', 'blurred vision', 'dizziness'],
    description: 'A neurological condition characterized by intense, debilitating headaches often with sensory disturbances.',
    recommendations: [
      'Rest in a quiet, dark room',
      'Take prescribed migraine medication at onset',
      'Track migraine triggers in a diary',
      'Consult a neurologist for preventive therapy',
    ],
  },
  {
    name: 'Urinary Tract Infection (UTI)',
    symptoms: ['burning urination', 'frequent urination', 'pelvic pain', 'cloudy urine', 'blood in urine', 'lower back pain', 'fever'],
    description: 'A bacterial infection affecting any part of the urinary system.',
    recommendations: [
      'Drink plenty of water to flush bacteria',
      'Consult a doctor for urinalysis and antibiotics',
      'Avoid caffeine and alcohol during infection',
      'Complete the full antibiotic course',
    ],
  },
  {
    name: 'Anemia',
    symptoms: ['fatigue', 'weakness', 'pale skin', 'shortness of breath', 'dizziness', 'cold hands', 'cold feet', 'headache', 'brittle nails'],
    description: 'A condition where you lack enough healthy red blood cells to carry adequate oxygen to body tissues.',
    recommendations: [
      'Get a CBC blood test to confirm type and severity',
      'Eat iron-rich foods (spinach, lentils, red meat)',
      'Take iron supplements as prescribed',
      'Address underlying causes with a doctor',
    ],
  },
  {
    name: 'Pneumonia',
    symptoms: ['cough', 'chest pain', 'fever', 'chills', 'shortness of breath', 'fatigue', 'nausea', 'sweating'],
    description: 'An infection that inflames the air sacs in one or both lungs, which may fill with fluid.',
    recommendations: [
      'Seek immediate medical attention',
      'Take prescribed antibiotics or antivirals',
      'Rest completely and stay hydrated',
      'Follow up with chest X-ray after treatment',
    ],
  },
  {
    name: 'Chickenpox',
    symptoms: ['itchy rash', 'blister-like sores', 'fever', 'tiredness', 'loss of appetite', 'headache'],
    description: 'A highly contagious viral infection causing an itchy, blister-like rash.',
    recommendations: [
      'Isolate to prevent spreading the virus',
      'Apply calamine lotion for itch relief',
      'Take antihistamines to reduce itching',
      'Consult doctor about antiviral medication',
    ],
  },
  {
    name: 'Allergy',
    symptoms: ['sneezing', 'runny nose', 'itchy eyes', 'watery eyes', 'skin rash', 'hives', 'itching', 'congestion'],
    description: 'An immune system response to a foreign substance (allergen) that is not harmful to most people.',
    recommendations: [
      'Identify and avoid triggers',
      'Take prescribed antihistamines',
      'Consider allergy skin testing',
      'Consult an allergist for immunotherapy options',
    ],
  },
  {
    name: 'Depression',
    symptoms: ['persistent sadness', 'loss of interest', 'fatigue', 'sleep problems', 'appetite changes', 'concentration problems', 'feelings of worthlessness', 'irritability'],
    description: 'A mood disorder causing persistent feelings of sadness and loss of interest, affecting daily functioning.',
    recommendations: [
      'Seek professional mental health support immediately',
      'Talk to a trusted person about your feelings',
      'Maintain a daily routine with light exercise',
      'Consider therapy and/or medication as advised by a doctor',
    ],
  },
  {
    name: 'Obesity',
    symptoms: ['excess body weight', 'fatigue', 'shortness of breath', 'joint pain', 'back pain', 'sleep apnea', 'snoring'],
    description: 'A complex disease involving an excessive amount of body fat that increases risk of many health problems.',
    recommendations: [
      'Consult a dietitian for a structured meal plan',
      'Aim for 150+ minutes of moderate exercise per week',
      'Track food intake and portions',
      'Consider medical intervention if BMI is critically high',
    ],
  },
];

/**
 * Fallback rule-based prediction (synchronous)
 * Used when Gemini is unavailable or API key is missing
 */
const runFallbackPrediction = (inputSymptoms) => {
  const normalize = (s) => s.toLowerCase().trim();
  const normalized = inputSymptoms.map(normalize);

  const scored = DISEASE_DATABASE.map((disease) => {
    const diseaseSymptoms = disease.symptoms.map(normalize);
    let matchCount = 0;
    normalized.forEach((inputSym) => {
      if (diseaseSymptoms.some((ds) => ds.includes(inputSym) || inputSym.includes(ds))) {
        matchCount++;
      }
    });
    const rawConfidence = matchCount / diseaseSymptoms.length;
    const coverageBonus = matchCount / normalized.length;
    const confidence = Math.min(Math.round((rawConfidence * 0.7 + coverageBonus * 0.3) * 100), 97);
    return { disease: disease.name, description: disease.description, recommendations: disease.recommendations, matchCount, confidence };
  });

  scored.sort((a, b) => b.matchCount - a.matchCount || b.confidence - a.confidence);
  const best = scored[0];

  if (best.matchCount === 0) {
    return {
      result: 'No Match Found',
      confidence: 0,
      description: 'No disease closely matched the provided symptoms. Please consult a medical professional.',
      recommendations: ['Visit a certified doctor', 'Describe symptoms in detail to your healthcare provider', 'Do not self-medicate'],
    };
  }

  return {
    result: best.disease,
    confidence: Math.max(best.confidence, 10),
    description: best.description,
    recommendations: best.recommendations,
  };
};

// ─────────────────────────────────────────────────────────────
// GEMINI AI PREDICTION
// ─────────────────────────────────────────────────────────────

/**
 * Build the structured prompt for Gemini.
 * We instruct it to return ONLY a raw JSON object — no markdown, no backticks,
 * no explanation text — because we parse the response directly with JSON.parse().
 */
const buildGeminiPrompt = (symptoms) => {
  const symptomList = symptoms.join(', ');
  return `You are a clinical informatics assistant. A patient reports these symptoms: ${symptomList}.

Analyze the symptoms and respond with ONLY a raw JSON object. No markdown. No backticks. No explanation. No preamble. Just the JSON object.

The JSON must have exactly these four keys:
- "result": the most likely disease name as a string (be specific, e.g. "Influenza (Flu)" not just "flu")
- "confidence": an integer between 10 and 95 representing your diagnostic confidence based on symptom match quality
- "description": a single paragraph (2-4 sentences) clinical description of the disease in plain, patient-friendly language
- "recommendations": an array of 3-5 actionable strings the patient should do next, ordered by priority

Example of the exact format expected:
{"result":"Common Cold","confidence":72,"description":"The common cold is a viral infection of the upper respiratory tract caused by rhinoviruses. It typically resolves within 7-10 days and is generally not serious.","recommendations":["Rest and drink plenty of fluids","Use saline nasal spray for congestion relief","Take over-the-counter decongestants if needed","See a doctor if fever exceeds 39°C or symptoms worsen after 10 days"]}

Important rules:
- "result" must be a well-known medical condition name
- "confidence" must be an integer (not a float, not a string)
- "recommendations" must be an array of strings, not a string
- If symptoms do not clearly point to any specific disease, set "result" to "Unspecified Condition — Consult a Doctor", confidence to 15, and recommendations to general advice
- NEVER suggest specific prescription drug names or dosages
- This is for informational purposes only — do not present this as a diagnosis
- Return ONLY the JSON object. Absolutely nothing else.`;
};

/**
 * Parse Gemini response text into a structured prediction object.
 * Handles cases where Gemini wraps its JSON in markdown code fences.
 */
const parseGeminiResponse = (text) => {
  // Strip markdown code fences if present (```json ... ``` or ``` ... ```)
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  const parsed = JSON.parse(cleaned); // throws if not valid JSON

  // Validate required fields
  if (typeof parsed.result !== 'string' || !parsed.result) {
    throw new Error('Gemini response missing "result" field');
  }
  if (typeof parsed.confidence !== 'number' || isNaN(parsed.confidence)) {
    throw new Error('Gemini response "confidence" is not a number');
  }
  if (typeof parsed.description !== 'string' || !parsed.description) {
    throw new Error('Gemini response missing "description" field');
  }
  if (!Array.isArray(parsed.recommendations) || parsed.recommendations.length === 0) {
    throw new Error('Gemini response "recommendations" is not a valid array');
  }

  return {
    result: parsed.result.trim(),
    confidence: Math.min(Math.max(Math.round(Number(parsed.confidence)), 0), 97),
    description: parsed.description.trim(),
    recommendations: parsed.recommendations.map((r) => String(r).trim()).filter(Boolean),
  };
};

/**
 * Main prediction function — async.
 * Tries Gemini first. Falls back to rule-based if Gemini fails for any reason.
 *
 * @param {string[]} symptoms - Array of symptom strings from the user
 * @returns {Promise<{result: string, confidence: number, description: string, recommendations: string[]}>}
 */
const runPrediction = async (symptoms) => {
  const apiKey = process.env.GEMINI_API_KEY;

  // If no API key is configured, use fallback immediately
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    console.warn('⚠️  GEMINI_API_KEY not set — using rule-based fallback prediction.');
    return runFallbackPrediction(symptoms);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    // gemini-1.5-flash is free tier, fast, and sufficient for this use case
    // Do NOT use gemini-pro — it has stricter quotas on the free tier
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.2,       // Low temperature = more deterministic, less creative
        topK: 1,                 // Only sample from top token
        topP: 0.8,
        maxOutputTokens: 512,    // JSON response will always be under 512 tokens
      },
    });

    const prompt = buildGeminiPrompt(symptoms);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    if (!responseText || responseText.trim() === '') {
      throw new Error('Gemini returned an empty response');
    }

    const prediction = parseGeminiResponse(responseText);
    console.log(`✅ Gemini prediction: ${prediction.result} (${prediction.confidence}%)`);
    return prediction;

  } catch (error) {
    // Log specific Gemini error category for debugging
    const errMsg = error.message || '';

    if (errMsg.includes('API_KEY_INVALID') || errMsg.includes('API key not valid')) {
      console.error('❌ Gemini: Invalid API key. Check GEMINI_API_KEY in .env');
    } else if (errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota')) {
      console.warn('⚠️  Gemini: Quota exceeded. Falling back to rule-based engine.');
    } else if (errMsg.includes('SAFETY')) {
      console.warn('⚠️  Gemini: Response blocked by safety filters. Falling back.');
    } else if (errMsg.includes('JSON') || errMsg.includes('parse')) {
      console.error('❌ Gemini: Response could not be parsed as JSON. Raw response logged above.');
    } else {
      console.error('❌ Gemini error:', errMsg);
    }

    // Always fall back gracefully — the app must never return a 500 on prediction
    console.log('↩️  Using rule-based fallback prediction engine.');
    return runFallbackPrediction(symptoms);
  }
};

module.exports = { runPrediction };
