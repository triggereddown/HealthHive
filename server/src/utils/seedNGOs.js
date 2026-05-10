const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const NGO = require('../models/NGO');

const NGO_SEED_DATA = [
  {
    name: 'Asha Health Foundation',
    location: { city: 'Mumbai', state: 'Maharashtra', address: '14, Andheri West, Mumbai' },
    contact: { phone: '+91-22-4001-5000', email: 'contact@ashafoundation.org', website: 'www.ashafoundation.org' },
    services: ['Free Medical Camps', 'Child Immunization', 'Maternal Health', 'HIV Awareness'],
    description: 'Providing accessible healthcare to underserved communities across Mumbai for over 20 years.',
  },
  {
    name: 'Healing Hands Trust',
    location: { city: 'Delhi', state: 'Delhi', address: 'Block C, Karol Bagh, New Delhi' },
    contact: { phone: '+91-11-4567-8900', email: 'info@healinghands.org', website: 'www.healinghands.org' },
    services: ['Mental Health Support', 'Disability Rehabilitation', 'Free Medicines', 'Nutrition Programs'],
    description: 'Dedicated to holistic healthcare including mental wellness and disability support in Delhi NCR.',
  },
  {
    name: 'GreenLife Medical Society',
    location: { city: 'Bangalore', state: 'Karnataka', address: '22, Whitefield Road, Bangalore' },
    contact: { phone: '+91-80-2345-6789', email: 'hello@greenlife.org', website: 'www.greenlife.org' },
    services: ['Cancer Screening', 'Diabetes Management', 'Eye Care Camps', 'Blood Donation Drives'],
    description: 'A technology-forward NGO running preventive health programs and screening camps across Karnataka.',
  },
  {
    name: 'Swasth Bharat Initiative',
    location: { city: 'Chennai', state: 'Tamil Nadu', address: 'Anna Nagar, Chennai' },
    contact: { phone: '+91-44-1234-5678', email: 'reach@swasthbharat.in', website: 'www.swasthbharat.in' },
    services: ['Rural Healthcare', 'Telemedicine', 'Mother & Child Health', 'Sanitation Awareness'],
    description: 'Bringing quality healthcare to rural Tamil Nadu through telemedicine and mobile health vans.',
  },
  {
    name: 'Jan Arogya Kendra',
    location: { city: 'Kolkata', state: 'West Bengal', address: '5, Park Street, Kolkata' },
    contact: { phone: '+91-33-5678-9012', email: 'support@janarogya.org', website: 'www.janarogya.org' },
    services: ['Tuberculosis Treatment', 'Leprosy Rehabilitation', 'Free Diagnostics', 'Community Health Workers'],
    description: 'A grassroots organization fighting infectious diseases and supporting marginalized communities in WB.',
  },
  {
    name: 'Hope & Cure NGO',
    location: { city: 'Hyderabad', state: 'Telangana', address: 'Banjara Hills, Hyderabad' },
    contact: { phone: '+91-40-3456-7890', email: 'hopecure@healthhelp.in', website: 'www.hopecure.in' },
    services: ['Chronic Disease Management', 'Palliative Care', 'Geriatric Support', 'Free Surgeries'],
    description: 'Specializing in long-term care for chronic ailments and end-of-life palliative support.',
  },
  {
    name: 'Niramaya Health Trust',
    location: { city: 'Pune', state: 'Maharashtra', address: 'Koregaon Park, Pune' },
    contact: { phone: '+91-20-7654-3210', email: 'info@niramaya.org.in', website: 'www.niramaya.org.in' },
    services: ['Women\'s Health', 'Reproductive Health', 'Cancer Awareness', 'School Health Programs'],
    description: 'Empowering women and youth through reproductive health education and preventive care.',
  },
  {
    name: 'Prayas Health Mission',
    location: { city: 'Jaipur', state: 'Rajasthan', address: 'Mansarovar, Jaipur' },
    contact: { phone: '+91-141-456-7891', email: 'prayas@healthmission.org', website: 'www.prayashealthmission.org' },
    services: ['Malaria Control', 'Waterborne Disease Prevention', 'Vaccination Camps', 'Health Education'],
    description: 'Fighting endemic diseases in rural Rajasthan through vaccination drives and health literacy programs.',
  },
];

const seedNGOs = async () => {
  try {
    const count = await NGO.countDocuments();
    if (count === 0) {
      await NGO.insertMany(NGO_SEED_DATA);
      console.log('✅ NGO database seeded successfully.');
    } else {
      console.log(`ℹ️  NGO collection already has ${count} records. Skipping seed.`);
    }
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  }
};

// Run if called directly
if (require.main === module) {
  const seedAndExit = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      await seedNGOs();
      process.exit(0);
    } catch (err) {
      console.error('❌ Direct seed failed:', err.message);
      process.exit(1);
    }
  };
  seedAndExit();
}

module.exports = seedNGOs;
