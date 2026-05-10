import { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaPhoneAlt, FaGlobe, FaEnvelope } from 'react-icons/fa';
import useNGOStore from '../store/ngoStore';
import { FullPageSpinner } from '../components/Spinner';

/* ── Fallback data shown when API returns no results ─────────── */
const DUMMY_NGOS = [
  {
    _id: 'd1', name: 'Aarogya Sewa Foundation', isActive: true,
    description: 'Providing free primary healthcare, immunisation drives, and nutritional support to underserved communities in urban and rural Maharashtra.',
    location: { city: 'Mumbai', state: 'Maharashtra', address: '14, Parel Village Road, Parel' },
    contact: { phone: '+91-22-2413-0001', email: 'contact@aarogyasewa.org', website: 'aarogyasewa.org' },
    services: ['Primary Care', 'Immunisation', 'Nutrition', 'Maternal Health'],
  },
  {
    _id: 'd2', name: 'Jan Arogya Initiative', isActive: true,
    description: 'Running mobile health clinics across Delhi-NCR, offering diagnostics, free medicines, and referrals to tertiary hospitals for complex cases.',
    location: { city: 'New Delhi', state: 'Delhi', address: 'B-12, Lajpat Nagar II' },
    contact: { phone: '+91-11-4567-8900', email: 'info@janarogya.in', website: 'janarogya.in' },
    services: ['Mobile Clinics', 'Diagnostics', 'Free Medicines', 'Referrals'],
  },
  {
    _id: 'd3', name: 'Swasthya Raksha Trust', isActive: true,
    description: 'Dedicated to mental health awareness and counselling services across Karnataka. Operates 24/7 helplines and community support groups.',
    location: { city: 'Bengaluru', state: 'Karnataka', address: '55, Koramangala 5th Block' },
    contact: { phone: '+91-80-2553-1122', email: 'support@swasthyaraksha.org', website: 'swasthyaraksha.org' },
    services: ['Mental Health', 'Counselling', 'Helpline', 'Community Support'],
  },
  {
    _id: 'd4', name: 'Disha Health & Welfare Society', isActive: true,
    description: 'Focusing on tuberculosis prevention and treatment support in Rajasthan, including DOTS therapy adherence programs and family counselling.',
    location: { city: 'Jaipur', state: 'Rajasthan', address: 'Plot 7, Malviya Nagar' },
    contact: { phone: '+91-141-270-4455', email: 'disha@dishawelfare.org', website: 'dishawelfare.org' },
    services: ['TB Prevention', 'DOTS Therapy', 'Family Counselling', 'Awareness Camps'],
  },
  {
    _id: 'd5', name: 'Prana Healthcare Collective', isActive: true,
    description: 'Specialises in palliative care and end-of-life support for cancer patients across Tamil Nadu, with home visit services and pain management.',
    location: { city: 'Chennai', state: 'Tamil Nadu', address: '22, Anna Salai, Nungambakkam' },
    contact: { phone: '+91-44-2822-9000', email: 'care@pranahealthcare.org', website: 'pranahealthcare.org' },
    services: ['Palliative Care', 'Pain Management', 'Home Visits', 'Cancer Support'],
  },
  {
    _id: 'd6', name: 'Nishtha Tribal Health Mission', isActive: true,
    description: 'Bringing healthcare to tribal and remote areas of Jharkhand through trained community health workers, telemedicine kiosks, and quarterly health camps.',
    location: { city: 'Ranchi', state: 'Jharkhand', address: 'Near Birsa Munda Park, Doranda' },
    contact: { phone: '+91-651-232-6677', email: 'outreach@nishthahm.in', website: 'nishthahm.in' },
    services: ['Telemedicine', 'Community Health', 'Health Camps', 'Tribal Welfare'],
  },
  {
    _id: 'd7', name: 'Vatsalya Child Health Network', isActive: true,
    description: 'Committed to reducing infant and child mortality in UP through neonatal care training, vaccination outreach, and malnutrition treatment centres.',
    location: { city: 'Lucknow', state: 'Uttar Pradesh', address: '3, Hazratganj Colony' },
    contact: { phone: '+91-522-400-7788', email: 'info@vatsalya.org.in', website: 'vatsalya.org.in' },
    services: ['Child Health', 'Neonatal Care', 'Vaccination', 'Malnutrition'],
  },
  {
    _id: 'd8', name: 'NovaMed Rural Health Trust', isActive: true,
    description: 'Deploying telemedicine-enabled health sub-centres across rural Gujarat, connecting villages to specialist consultations and emergency ambulance services.',
    location: { city: 'Ahmedabad', state: 'Gujarat', address: '101, Navrangpura Crossroads' },
    contact: { phone: '+91-79-2646-3399', email: 'hello@novamedrural.org', website: 'novamedrural.org' },
    services: ['Telemedicine', 'Specialist Consultation', 'Emergency Ambulance'],
  },
  {
    _id: 'd9', name: "SheHeals Women's Health Society", isActive: true,
    description: "Championing women's reproductive health, domestic violence support, and adolescent health programs across Telangana and Andhra Pradesh.",
    location: { city: 'Hyderabad', state: 'Telangana', address: '8-2-293, Road 82, Jubilee Hills' },
    contact: { phone: '+91-40-2354-4567', email: 'reach@sheheals.in', website: 'sheheals.in' },
    services: ['Reproductive Health', 'Women Safety', 'Adolescent Health'],
  },
  {
    _id: 'd10', name: 'Jeevan Jyoti Eye Care Foundation', isActive: true,
    description: 'Eliminating preventable blindness in Eastern India through free cataract surgeries, school eye-screening programs, and corrective spectacle distribution.',
    location: { city: 'Kolkata', state: 'West Bengal', address: '12, AJC Bose Road, Bhowanipore' },
    contact: { phone: '+91-33-2282-1100', email: 'vision@jeevanjyoti.org', website: 'jeevanjyoti.org' },
    services: ['Eye Care', 'Cataract Surgery', 'School Screening'],
  },
  {
    _id: 'd11', name: 'HealFirst Diabetes Foundation', isActive: true,
    description: 'Combating the diabetes epidemic in Punjab through free HbA1c camps, dietary counselling, insulin support schemes, and dedicated foot-care clinics.',
    location: { city: 'Chandigarh', state: 'Punjab', address: 'SCO 24-25, Sector 34A' },
    contact: { phone: '+91-172-509-8810', email: 'diabetescare@healfirst.in', website: 'healfirst.in' },
    services: ['Diabetes Management', 'Free Camps', 'Dietary Counselling', 'Foot Care'],
  },
  {
    _id: 'd12', name: 'Suraksha HIV/AIDS Care Centre', isActive: true,
    description: 'Offering confidential HIV testing, ART linkage, PLHIV support groups, and nutrition rehabilitation for people living with HIV across Goa.',
    location: { city: 'Panaji', state: 'Goa', address: 'Altinho Hill, near IPHB' },
    contact: { phone: '+91-832-222-7654', email: 'confidential@surakshacare.org', website: 'surakshacare.org' },
    services: ['HIV Testing', 'ART Support', 'Support Groups', 'Nutrition Rehab'],
  },
];

function NGOs() {
  const { ngos, fetchNGOs, isLoading } = useNGOStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  /* Use real API data if available, otherwise fall back to dummy entries */
  const isFiltering = searchTerm || cityFilter;
  const displayNgos = ngos.length > 0 ? ngos : (!isFiltering ? DUMMY_NGOS : []);

  useEffect(() => {
    fetchNGOs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNGOs({ search: searchTerm, city: cityFilter });
  };

  const handleClear = () => {
    setSearchTerm('');
    setCityFilter('');
    fetchNGOs();
  };

  return (
    <div className="bg-void min-h-screen pt-24 pb-32">
      <div className="px-6 sm:px-12 lg:px-24 max-w-screen-2xl mx-auto">
        <div className="mb-12">
          <span className="section-label">/ GLOBAL DIRECTORY</span>
          <h1 className="font-display text-display-sm uppercase text-ink">
            HEALTHCARE NGOS & SERVICES
          </h1>
        </div>

        {/* Filter Bar */}
        <div className="bg-surface border-y border-[#222222] py-6 px-4 md:px-8 mb-16">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1 w-full">
              <label className="section-label text-ink-faint mb-2 block">SEARCH KEYWORD</label>
              <div className="relative">
                <FaSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-ink-muted text-sm" />
                <input
                  type="text"
                  placeholder="NGO name, service, or keyword..."
                  className="w-full bg-transparent border-b border-[#333] pl-8 pb-2 text-ink font-body focus:border-accent outline-none transition-colors placeholder-ink-faint rounded-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-72">
              <label className="section-label text-ink-faint mb-2 block">LOCATION</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-0 top-1/2 -translate-y-1/2 text-ink-muted text-sm" />
                <input
                  type="text"
                  placeholder="City (e.g. Mumbai)"
                  className="w-full bg-transparent border-b border-[#333] pl-8 pb-2 text-ink font-body focus:border-accent outline-none transition-colors placeholder-ink-faint rounded-none"
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button type="submit" className="btn-primary flex-1 md:flex-none">
                FILTER RESULTS
              </button>
              {(searchTerm || cityFilter) && (
                <button type="button" onClick={handleClear} className="btn-secondary">
                  CLEAR
                </button>
              )}
            </div>
          </form>
        </div>

        {/* NGOS Grid */}
        {isLoading ? (
          <FullPageSpinner />
        ) : displayNgos.length === 0 ? (
          <div className="py-32 text-center border border-[#222222] bg-surface">
            <span className="font-mono text-xs text-ink-faint block mb-4">ERR_NO_RESULTS</span>
            <h3 className="font-display text-2xl uppercase text-ink">NO NGOS FOUND</h3>
            <button onClick={handleClear} className="text-accent text-sm font-mono mt-4 hover:text-white transition-colors underline decoration-accent underline-offset-4">
              [ RESET FILTERS ]
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#222222] border border-[#222222]">
            {displayNgos.map((ngo) => (
              <div key={ngo._id} className="bg-surface flex flex-col h-full group hover:bg-surface2 transition-colors relative">
                <div className="absolute top-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500 ease-out" />
                
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="font-display text-2xl uppercase text-ink">{ngo.name}</h2>
                    {ngo.isActive && (
                      <span className="shrink-0 w-2 h-2 rounded-full bg-accent mt-2 animate-pulse"></span>
                    )}
                  </div>
                  
                  <p className="font-body font-light text-sm text-ink-muted mb-8 line-clamp-3 leading-relaxed">
                    {ngo.description}
                  </p>

                  <div className="space-y-4">
                    {ngo.location.city && (
                      <div className="flex items-start gap-4">
                        <FaMapMarkerAlt className="text-ink-faint shrink-0 mt-1" />
                        <span className="font-mono text-xs text-ink-muted">{ngo.location.address}, {ngo.location.city}, {ngo.location.state}</span>
                      </div>
                    )}
                    {ngo.contact.phone && (
                      <div className="flex items-center gap-4">
                        <FaPhoneAlt className="text-ink-faint shrink-0" />
                        <a href={`tel:${ngo.contact.phone}`} className="font-mono text-xs text-ink-muted hover:text-accent transition-colors">{ngo.contact.phone}</a>
                      </div>
                    )}
                    {ngo.contact.email && (
                      <div className="flex items-center gap-4">
                        <FaEnvelope className="text-ink-faint shrink-0" />
                        <a href={`mailto:${ngo.contact.email}`} className="font-mono text-xs text-ink-muted hover:text-accent transition-colors">{ngo.contact.email}</a>
                      </div>
                    )}
                    {ngo.contact.website && (
                      <div className="flex items-center gap-4">
                        <FaGlobe className="text-ink-faint shrink-0" />
                        <a href={`https://${ngo.contact.website}`} target="_blank" rel="noreferrer" className="font-mono text-xs text-ink-muted hover:text-accent transition-colors">
                          {ngo.contact.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-8 pt-0 mt-auto border-t border-[#1A1A1A]">
                  <div className="pt-6">
                    <span className="section-label mb-3">SERVICES</span>
                    <div className="flex flex-wrap gap-2">
                      {ngo.services.map((service, idx) => (
                        <span key={idx} className="badge-default">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NGOs;
