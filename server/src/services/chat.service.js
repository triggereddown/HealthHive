'use strict';

const { GoogleGenerativeAI } = require('@google/generative-ai');

// ──────────────────────────────────────────────────────────────────────────────
// SYSTEM INSTRUCTION
// Instructs Gemini to behave as a clinical assistant that gathers information
// through natural conversation before outputting a structured diagnosis.
// ──────────────────────────────────────────────────────────────────────────────
const SYSTEM_INSTRUCTION = `You are Dr. AI, a compassionate and precise clinical AI assistant for ComCare — a healthcare platform. Your role is to conduct a structured medical consultation in natural, conversational language.

CONSULTATION PROTOCOL:
1. Carefully read the patient's initial message. Extract any symptoms, duration, or context already mentioned.
2. Ask ONE focused clarifying question at a time — never multiple questions in one response.
3. Gather the following information progressively, in a natural order:
   - Primary symptoms (what they already mentioned)
   - Duration of symptoms (how long)
   - Severity on a scale of 1-10
   - Age
   - Gender / biological sex
   - Any associated or secondary symptoms
   - Relevant medical history (e.g. diabetes, asthma, heart disease)
   - Current medications or known allergies (only if relevant)
4. After gathering sufficient information (typically 5–8 exchanges), provide your final assessment.

RESPONSE STYLE DURING CONSULTATION:
- Be warm, professional, and reassuring — like a real doctor.
- Keep each response SHORT: 1–2 sentences of acknowledgment/context, then ONE clear question.
- Do NOT use bullet points, numbered lists, or headers during the conversation.
- Use simple, patient-friendly language. Avoid medical jargon.
- If the patient mentions an emergency symptom (severe chest pain + arm pain, difficulty breathing, unresponsiveness, signs of stroke), immediately skip to diagnosis with consultDoctorUrgency = "emergency".

WHEN YOU ARE READY TO DIAGNOSE:
After collecting sufficient information (do NOT ask more than 8 questions total), respond with EXACTLY the following format. There must be NOTHING before or after this block:

<DIAGNOSIS>
{"result":"Disease or Condition Name","confidence":78,"description":"2–3 sentence clinical description in plain, patient-friendly language.","recommendations":["Action 1","Action 2","Action 3","Action 4"],"severity":"mild","consultDoctorUrgency":"routine","summary":"A warm, 2-sentence summary addressed directly to the patient, summarizing what you found and what they should do next."}
</DIAGNOSIS>

DIAGNOSIS FIELD RULES:
- result: a recognized medical condition name (be specific)
- confidence: integer between 10 and 95
- severity: exactly one of "mild", "moderate", "severe"
- consultDoctorUrgency: exactly one of "routine" (no rush), "soon" (within a week), "urgent" (within 24–48h), "emergency" (go to ER now)
- recommendations: 3–5 actionable string items
- summary: warm, second-person language addressed to the patient
- NEVER name specific prescription drugs or dosages
- This is informational only — never claim this is a definitive diagnosis`;

// ──────────────────────────────────────────────────────────────────────────────
// PARSE DIAGNOSIS BLOCK from Gemini response text
// ──────────────────────────────────────────────────────────────────────────────
const parseDiagnosis = (text) => {
  const match = text.match(/<DIAGNOSIS>([\s\S]*?)<\/DIAGNOSIS>/i);
  if (!match) return null;

  let cleaned = match[1].trim();
  // Strip any accidental markdown fences inside
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  const parsed = JSON.parse(cleaned);

  // Validate all required keys
  const required = ['result', 'confidence', 'description', 'recommendations', 'severity', 'consultDoctorUrgency', 'summary'];
  for (const key of required) {
    if (parsed[key] === undefined) throw new Error(`Diagnosis missing key: ${key}`);
  }

  return {
    result: String(parsed.result).trim(),
    confidence: Math.min(Math.max(Math.round(Number(parsed.confidence)), 0), 97),
    description: String(parsed.description).trim(),
    recommendations: Array.isArray(parsed.recommendations)
      ? parsed.recommendations.map((r) => String(r).trim()).filter(Boolean)
      : [],
    severity: ['mild', 'moderate', 'severe'].includes(parsed.severity) ? parsed.severity : 'moderate',
    consultDoctorUrgency: ['routine', 'soon', 'urgent', 'emergency'].includes(parsed.consultDoctorUrgency)
      ? parsed.consultDoctorUrgency
      : 'routine',
    summary: String(parsed.summary).trim(),
  };
};

// ──────────────────────────────────────────────────────────────────────────────
// MAIN CHAT FUNCTION
// Takes full conversation history + new user message, returns AI reply.
// ──────────────────────────────────────────────────────────────────────────────
const sendChatMessage = async (history, userMessage) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    // Fallback: simple scripted responses when no API key
    return {
      type: 'question',
      content: "I'm sorry, the AI service is not configured right now. Please ensure the GEMINI_API_KEY is set in your environment.",
      diagnosis: null,
    };
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig: {
      temperature: 0.6,
      topK: 40,
      topP: 0.9,
      maxOutputTokens: 1024,
    },
  });

  // Convert stored history to Gemini format
  // Gemini history does NOT include the current message being sent
  const geminiHistory = history.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));

  const chat = model.startChat({ history: geminiHistory });
  const result = await chat.sendMessage(userMessage);
  const responseText = result.response.text();

  if (!responseText || responseText.trim() === '') {
    throw new Error('Gemini returned an empty response');
  }

  // Check if the response contains a diagnosis block
  if (/<DIAGNOSIS>/i.test(responseText)) {
    try {
      const diagnosis = parseDiagnosis(responseText);
      if (diagnosis) {
        return { type: 'diagnosis', content: diagnosis.summary, diagnosis };
      }
    } catch (parseErr) {
      console.error('❌ Failed to parse diagnosis JSON:', parseErr.message);
      // Fall through to return as a regular message
    }
  }

  return { type: 'question', content: responseText.trim(), diagnosis: null };
};

module.exports = { sendChatMessage };
