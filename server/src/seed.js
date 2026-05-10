/**
 * Seed script — populates the DB with dummy healthcare NGOs.
 * Run: node src/seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const NGO = require('./models/NGO');

const DUMMY_NGOS = [
  {
    name: 'Aarogya Sewa Foundation',
    description: 'Providing free primary healthcare, immunisation drives, and nutritional support to underserved communities in urban and rural Maharashtra.',
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India', address: '14, Parel Village Road, Parel' },
    contact: { phone: '+91-22-2413-0001', email: 'contact@aarogyasewa.org', website: 'aarogyasewa.org' },
    services: ['Primary Care', 'Immunisation', 'Nutrition', 'Maternal Health'],
    isActive: true,
  },
  {
    name: 'Jan Arogya Initiative',
    description: 'Running mobile health clinics across Delhi-NCR, offering diagnostics, free medicines, and referrals to tertiary hospitals for complex cases.',
    location: { city: 'New Delhi', state: 'Delhi', country: 'India', address: 'B-12, Lajpat Nagar II' },
    contact: { phone: '+91-11-4567-8900', email: 'info@janarogya.in', website: 'janarogya.in' },
    services: ['Mobile Clinics', 'Diagnostics', 'Free Medicines', 'Referrals'],
    isActive: true,
  },
  {
    name: 'Swasthya Raksha Trust',
    description: 'Dedicated to mental health awareness and counselling services across Karnataka. Operates 24/7 helplines and community support groups.',
    location: { city: 'Bengaluru', state: 'Karnataka', country: 'India', address: '55, Koramangala 5th Block' },
    contact: { phone: '+91-80-2553-1122', email: 'support@swasthyaraksha.org', website: 'swasthyaraksha.org' },
    services: ['Mental Health', 'Counselling', 'Helpline', 'Community Support'],
    isActive: true,
  },
  {
    name: 'Disha Health & Welfare Society',
    description: 'Focusing on tuberculosis prevention and treatment support in Rajasthan, including DOTS therapy adherence programs and family counselling.',
    location: { city: 'Jaipur', state: 'Rajasthan', country: 'India', address: 'Plot 7, Malviya Nagar' },
    contact: { phone: '+91-141-270-4455', email: 'disha@dishawelfare.org', website: 'dishawelfare.org' },
    services: ['TB Prevention', 'DOTS Therapy', 'Family Counselling', 'Awareness Camps'],
    isActive: true,
  },
  {
    name: 'Prana Healthcare Collective',
    description: 'Specialises in palliative care and end-of-life support for cancer patients across Tamil Nadu, with home visit services and pain management.',
    location: { city: 'Chennai', state: 'Tamil Nadu', country: 'India', address: '22, Anna Salai, Nungambakkam' },
    contact: { phone: '+91-44-2822-9000', email: 'care@pranahealthcare.org', website: 'pranahealthcare.org' },
    services: ['Palliative Care', 'Pain Management', 'Home Visits', 'Cancer Support'],
    isActive: true,
  },
  {
    name: 'Nishtha Tribal Health Mission',
    description: 'Bringing healthcare to tribal and remote areas of Jharkhand through trained community health workers, telemedicine kiosks, and quarterly health camps.',
    location: { city: 'Ranchi', state: 'Jharkhand', country: 'India', address: 'Near Birsa Munda Park, Doranda' },
    contact: { phone: '+91-651-232-6677', email: 'outreach@nishthahm.in', website: 'nishthahm.in' },
    services: ['Telemedicine', 'Community Health Workers', 'Health Camps', 'Tribal Welfare'],
    isActive: true,
  },
  {
    name: 'Vatsalya Child Health Network',
    description: 'Committed to reducing infant and child mortality in UP through neonatal care training, vaccination outreach, and malnutrition treatment centres.',
    location: { city: 'Lucknow', state: 'Uttar Pradesh', country: 'India', address: '3, Hazratganj Colony' },
    contact: { phone: '+91-522-400-7788', email: 'info@vatsalya.org.in', website: 'vatsalya.org.in' },
    services: ['Child Health', 'Neonatal Care', 'Vaccination', 'Malnutrition Treatment'],
    isActive: true,
  },
  {
    name: 'NovaMed Rural Health Trust',
    description: 'Deploying telemedicine-enabled health sub-centres across rural Gujarat, connecting villages to specialist consultations and emergency ambulance services.',
    location: { city: 'Ahmedabad', state: 'Gujarat', country: 'India', address: '101, Navrangpura Crossroads' },
    contact: { phone: '+91-79-2646-3399', email: 'hello@novamedrural.org', website: 'novamedrural.org' },
    services: ['Telemedicine', 'Specialist Consultation', 'Emergency Ambulance', 'Health Sub-Centres'],
    isActive: true,
  },
  {
    name: 'SheHeals Women\'s Health Society',
    description: 'Championing women\'s reproductive health, domestic violence support, and adolescent health programs across Telangana and Andhra Pradesh.',
    location: { city: 'Hyderabad', state: 'Telangana', country: 'India', address: '8-2-293, Road 82, Jubilee Hills' },
    contact: { phone: '+91-40-2354-4567', email: 'reach@sheheals.in', website: 'sheheals.in' },
    services: ['Reproductive Health', 'Women Safety', 'Adolescent Health', 'Counselling'],
    isActive: true,
  },
  {
    name: 'Jeevan Jyoti Eye Care Foundation',
    description: 'Eliminating preventable blindness in Eastern India through free cataract surgeries, school eye-screening programs, and corrective spectacle distribution.',
    location: { city: 'Kolkata', state: 'West Bengal', country: 'India', address: '12, AJC Bose Road, Bhowanipore' },
    contact: { phone: '+91-33-2282-1100', email: 'vision@jeevanjyoti.org', website: 'jeevanjyoti.org' },
    services: ['Eye Care', 'Cataract Surgery', 'School Screening', 'Spectacle Distribution'],
    isActive: true,
  },
  {
    name: 'HealFirst Diabetes Awareness Foundation',
    description: 'Combating the diabetes epidemic in Punjab through free HbA1c camps, dietary counselling, insulin support schemes, and foot-care clinics.',
    location: { city: 'Chandigarh', state: 'Punjab', country: 'India', address: 'SCO 24-25, Sector 34A' },
    contact: { phone: '+91-172-509-8810', email: 'diabetescare@healfirst.in', website: 'healfirst.in' },
    services: ['Diabetes Management', 'Free Camps', 'Dietary Counselling', 'Foot Care'],
    isActive: true,
  },
  {
    name: 'Suraksha HIV/AIDS Care Centre',
    description: 'Offering confidential HIV testing, ART linkage, PLHIV support groups, and nutrition rehabilitation for people living with HIV across Goa.',
    location: { city: 'Panaji', state: 'Goa', country: 'India', address: 'Altinho Hill, near IPHB' },
    contact: { phone: '+91-832-222-7654', email: 'confidential@surakshacare.org', website: 'surakshacare.org' },
    services: ['HIV Testing', 'ART Support', 'Support Groups', 'Nutrition Rehab'],
    isActive: true,
  },
];

async function seed() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/comcare';
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    await NGO.deleteMany({});
    console.log('🗑️  Cleared existing NGOs');

    const inserted = await NGO.insertMany(DUMMY_NGOS);
    console.log(`🌱 Seeded ${inserted.length} NGOs successfully`);

    await mongoose.disconnect();
    console.log('✅ Done. Database disconnected.');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
