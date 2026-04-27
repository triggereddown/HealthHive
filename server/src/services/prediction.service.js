/**
 * ComCare Disease Prediction Engine
 * Rule-based symptom → disease mapping with weighted confidence scoring.
 *
 * Each disease entry has:
 *  - symptoms: core symptoms (each match increases confidence)
 *  - description: brief clinical description
 *  - recommendations: action items for the user
 */

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
    symptoms: ['high fever', 'chills', 'sweating', 'headache', 'nausea', 'vomiting', 'muscle pain', 'fatigue', 'anemia'],
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
    symptoms: ['sudden high fever', 'severe headache', 'pain behind eyes', 'joint pain', 'muscle pain', 'rash', 'mild bleeding', 'fatigue', 'nausea'],
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
    symptoms: ['frequent urination', 'excessive thirst', 'blurred vision', 'fatigue', 'slow healing wounds', 'numbness in hands', 'numbness in feet', 'weight loss', 'infections'],
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
    description: 'A chronic condition where blood pressure in the arteries is persistently elevated, increasing cardiovascular risk.',
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
    symptoms: ['diarrhea', 'vomiting', 'nausea', 'stomach cramps', 'abdominal pain', 'mild fever', 'headache', 'muscle aches', 'dehydration'],
    description: 'Inflammation of the stomach and intestines, usually caused by a viral or bacterial infection.',
    recommendations: [
      'Stay hydrated with ORS solutions',
      'Follow a bland diet (BRAT: bananas, rice, applesauce, toast)',
      'Avoid dairy and fatty foods temporarily',
      'Seek care if symptoms persist beyond 3 days or blood is present',
    ],
  },
  {
    name: 'Migraine',
    symptoms: ['severe headache', 'nausea', 'vomiting', 'sensitivity to light', 'sensitivity to sound', 'blurred vision', 'dizziness', 'aura'],
    description: 'A neurological condition characterized by intense, debilitating headaches often accompanied by sensory disturbances.',
    recommendations: [
      'Rest in a quiet, dark room',
      'Take prescribed migraine medication at onset',
      'Track migraine triggers in a diary',
      'Consult a neurologist for preventive therapy',
    ],
  },
  {
    name: 'Urinary Tract Infection (UTI)',
    symptoms: ['burning urination', 'frequent urination', 'pelvic pain', 'cloudy urine', 'blood in urine', 'strong smelling urine', 'lower back pain', 'fever'],
    description: 'A bacterial infection affecting any part of the urinary system — kidneys, bladder, ureters, or urethra.',
    recommendations: [
      'Drink plenty of water to flush bacteria',
      'Consult a doctor for urianalysis and antibiotics',
      'Avoid caffeine and alcohol during infection',
      'Complete the full antibiotic course',
    ],
  },
  {
    name: 'Anemia',
    symptoms: ['fatigue', 'weakness', 'pale skin', 'shortness of breath', 'dizziness', 'cold hands', 'cold feet', 'headache', 'brittle nails'],
    description: 'A condition where you lack enough healthy red blood cells to carry adequate oxygen to your body\'s tissues.',
    recommendations: [
      'Get a CBC blood test to confirm type and severity',
      'Eat iron-rich foods (spinach, lentils, red meat)',
      'Take iron supplements as prescribed',
      'Address underlying causes with a doctor',
    ],
  },
  {
    name: 'Pneumonia',
    symptoms: ['cough', 'chest pain', 'fever', 'chills', 'shortness of breath', 'fatigue', 'nausea', 'vomiting', 'confusion', 'sweating'],
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
    description: 'A highly contagious viral infection causing an itchy, blister-like rash, mainly affecting children.',
    recommendations: [
      'Isolate to prevent spreading the virus',
      'Apply calamine lotion for itch relief',
      'Take antihistamines to reduce itching',
      'Consult doctor about antiviral medication',
    ],
  },
  {
    name: 'Allergy',
    symptoms: ['sneezing', 'runny nose', 'itchy eyes', 'watery eyes', 'skin rash', 'hives', 'itching', 'congestion', 'coughing'],
    description: 'An immune system response to a foreign substance (allergen) that isn\'t typically harmful to most people.',
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
    symptoms: ['excess body weight', 'fatigue', 'shortness of breath', 'joint pain', 'back pain', 'sleep apnea', 'snoring', 'excessive sweating'],
    description: 'A complex disease involving an excessive amount of body fat that increases the risk of many health problems.',
    recommendations: [
      'Consult a dietitian for a structured meal plan',
      'Aim for 150+ minutes of moderate exercise per week',
      'Track food intake and portions',
      'Consider medical intervention if BMI is critically high',
    ],
  },
];

/**
 * Normalize symptom strings for comparison
 */
const normalize = (str) => str.toLowerCase().trim();

/**
 * Run disease prediction given an array of symptom strings.
 * Returns the top matched disease with confidence score.
 */
const runPrediction = (inputSymptoms) => {
  const normalized = inputSymptoms.map(normalize);

  const scored = DISEASE_DATABASE.map((disease) => {
    const diseaseSymptoms = disease.symptoms.map(normalize);
    let matchCount = 0;

    normalized.forEach((inputSym) => {
      const matched = diseaseSymptoms.some(
        (ds) => ds.includes(inputSym) || inputSym.includes(ds)
      );
      if (matched) matchCount++;
    });

    // Confidence: based on ratio of matched symptoms to total disease symptoms
    const rawConfidence = matchCount / diseaseSymptoms.length;
    const coverageBonus = matchCount / normalized.length;
    const confidence = Math.min(Math.round((rawConfidence * 0.7 + coverageBonus * 0.3) * 100), 97);

    return {
      disease: disease.name,
      description: disease.description,
      recommendations: disease.recommendations,
      matchCount,
      confidence,
    };
  });

  // Sort by match count, then confidence
  scored.sort((a, b) => b.matchCount - a.matchCount || b.confidence - a.confidence);

  const best = scored[0];

  // If no matches at all, return a generic response
  if (best.matchCount === 0) {
    return {
      result: 'Unknown / No Match Found',
      confidence: 0,
      description: 'No disease matched the provided symptoms. Please consult a medical professional for proper diagnosis.',
      recommendations: [
        'Visit a certified doctor for physical examination',
        'Describe your symptoms in detail to your healthcare provider',
        'Do not self-medicate',
      ],
    };
  }

  return {
    result: best.disease,
    confidence: Math.max(best.confidence, 10),
    description: best.description,
    recommendations: best.recommendations,
  };
};

module.exports = { runPrediction };
