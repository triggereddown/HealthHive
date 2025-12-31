from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.preprocessing import LabelEncoder
import numpy as np
import re
import string
import uvicorn
import os

app = FastAPI(
    title="HealthHive Medical AI",
    description="Predict diseases, prescriptions, and deficiencies from symptoms"
)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



dataset_path = os.path.join(os.path.dirname(__file__), "data/patient_dataset_100k.csv")
df = pd.read_csv(dataset_path)

# Encode labels
le_category = LabelEncoder()
df['Category_Encoded'] = le_category.fit_transform(df['Category'])
df['Disease_Encoded'] = LabelEncoder().fit_transform(df['Disease'])
df['Prescription_Encoded'] = LabelEncoder().fit_transform(df['Prescription'])
df['Deficiency_Encoded'] = LabelEncoder().fit_transform(df['Macronutrient_Deficiency'])

# Fit TF-IDF
tfidf = TfidfVectorizer()
tfidf.fit(df['Symptoms'].str.lower())



keyword_category_map = {
    "Urology": ["urination", "pee", "frequent urination", "burning sensation", "blood in urine"],
    "Neurology": ["headache", "dizzy", "numbness", "seizure", "confusion", "memory loss", "nausea"],
    "Cardiology": ["chest pain", "palpitations", "shortness of breath", "heartburn", "high blood pressure", "fatigue"],
    "Dermatology": ["rash", "itching", "skin", "blisters", "redness", "pimples", "oily skin"],
    "Pulmonology": ["cough", "wheezing", "breath", "asthma", "shortness of breath", "breathlessness"],
    "Gastroenterology": ["vomit", "diarrhea", "abdomen", "stomach pain", "constipation", "bloating", "abdominal pain"],
    "Orthopedics": ["joint pain", "bone pain", "fracture", "back pain", "joint swelling", "stiffness", "swelling", "pain on movement"],
    "Endocrinology": ["diabetes", "thyroid", "fatigue", "weight gain", "weight loss", "thirst"]
}

test_suggestions = {
    "Cardiology": ["ECG", "Lipid Profile"],
    "Neurology": ["EEG", "MRI Brain"],
    "Endocrinology": ["Blood Sugar", "Thyroid Profile"],
    "Gastroenterology": ["Endoscopy", "Liver Function Test"],
    "Orthopedics": ["X-Ray", "Bone Density Test"],
    "Dermatology": ["Skin Biopsy"],
    "Pulmonology": ["Chest X-Ray", "Spirometry"],
    "Urology": ["Urine Analysis", "Ultrasound KUB"]
}

# ------------------ Utils ------------------

def preprocess_symptoms(symptoms_text):
    delimiters = [',', ';', ' and ', ' with ', ' or ', '.']
    for d in delimiters:
        symptoms_text = symptoms_text.replace(d, ',')
    symptom_list = [s.strip().lower() for s in symptoms_text.split(',') if s.strip()]
    symptom_list = [''.join(ch for ch in s if ch not in string.punctuation) for s in symptom_list]
    return symptom_list



class SymptomRequest(BaseModel):
    name: str
    age: int
    gender: str
    symptoms: str



@app.get("/")
def read_root():
    return {"message": "Welcome to HealthHive Medical AI!"}

@app.post("/diagnose")
def diagnose(data: SymptomRequest):
    symptom_list = preprocess_symptoms(data.symptoms)
    matched_categories = set()

    for symptom in symptom_list:
        for cat, keywords in keyword_category_map.items():
            if any(keyword in symptom for keyword in keywords):
                matched_categories.add(cat)

    # Filter dataset
    if matched_categories:
        filtered_df = df[df['Category'].isin(matched_categories)]
    else:
        pattern = '|'.join(re.escape(s) for s in symptom_list)
        filtered_df = df[df['Symptoms'].str.lower().str.contains(pattern, regex=True)]

    if filtered_df.empty:
        return {"message": "No matching records found. Try rephrasing your symptoms."}

    X = tfidf.transform(filtered_df['Symptoms'].str.lower())
    disease_model = MultinomialNB().fit(X, filtered_df['Disease_Encoded'])
    prescription_model = MultinomialNB().fit(X, filtered_df['Prescription_Encoded'])
    deficiency_model = MultinomialNB().fit(X, filtered_df['Deficiency_Encoded'])

    
    symptoms_vec = tfidf.transform([" ".join(symptom_list)])
    disease_probs = disease_model.predict_proba(symptoms_vec)[0]
    top_indices = np.argsort(disease_probs)[-3:][::-1]
    top_disease_encodings = [disease_model.classes_[i] for i in top_indices]

    
    disease_lookup = filtered_df[['Disease_Encoded', 'Disease', 'Category']].drop_duplicates().set_index('Disease_Encoded')
    prescription_lookup = filtered_df[['Disease', 'Prescription']].drop_duplicates().set_index('Disease')['Prescription'].to_dict()
    deficiency_lookup = filtered_df[['Disease', 'Macronutrient_Deficiency']].drop_duplicates().set_index('Disease')['Macronutrient_Deficiency'].to_dict()

    predictions = []
    for enc in top_disease_encodings:
        row = disease_lookup.loc[enc]
        disease = row['Disease']
        category = row['Category']
        prescription = prescription_lookup.get(disease, "Consult Specialist")
        deficiency = deficiency_lookup.get(disease, "Unknown")
        tests = test_suggestions.get(category, ["General Blood Test"])
        predictions.append({
            "disease": disease,
            "category": category,
            "prescription": prescription,
            "deficiency": deficiency,
            "suggested_tests": tests
        })

    return {
        "name": data.name,
        "age": data.age,
        "gender": data.gender,
        "input_symptoms": symptom_list,
        "matched_categories": list(matched_categories),
        "predictions": predictions
    }



if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
