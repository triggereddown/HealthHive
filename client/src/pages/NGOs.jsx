import { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaPhoneAlt, FaGlobe, FaEnvelope } from 'react-icons/fa';
import useNGOStore from '../store/ngoStore';
import { FullPageSpinner } from '../components/Spinner';

function NGOs() {
  const { ngos, fetchNGOs, isLoading } = useNGOStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    fetchNGOs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Healthcare NGOs & Services</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Find verified non-governmental organizations and healthcare services near you. We connect you with organizations providing affordable or free medical support.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="card p-4 mb-10">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by NGO name, service, or keyword..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64 relative">
            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="City (e.g. Mumbai)"
              className="input-field pl-10"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary w-full md:w-auto px-8">
            Filter
          </button>
          {(searchTerm || cityFilter) && (
            <button type="button" onClick={handleClear} className="btn-ghost text-gray-500 w-full md:w-auto">
              Clear
            </button>
          )}
        </form>
      </div>

      {/* NGOS Grid */}
      {isLoading ? (
        <FullPageSpinner />
      ) : ngos.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <FaSearch className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900">No NGOs found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
          <button onClick={handleClear} className="mt-6 text-primary-600 font-medium hover:underline">
            View all NGOs
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ngos.map((ngo) => (
            <div key={ngo._id} className="card flex flex-col h-full hover:-translate-y-1 transition-transform duration-300 group">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="font-playfair text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{ngo.name}</h2>
                  {ngo.isActive && (
                    <span className="shrink-0 w-2.5 h-2.5 bg-green-500 rounded-full mt-1.5 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                  {ngo.description}
                </p>

                <div className="space-y-2 mb-6">
                  {ngo.location.city && (
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-primary-500 shrink-0 mt-1" />
                      <span>{ngo.location.address}, {ngo.location.city}, {ngo.location.state}</span>
                    </div>
                  )}
                  {ngo.contact.phone && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <FaPhoneAlt className="text-primary-500 shrink-0" />
                      <a href={`tel:${ngo.contact.phone}`} className="hover:text-primary-600 hover:underline">{ngo.contact.phone}</a>
                    </div>
                  )}
                  {ngo.contact.email && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <FaEnvelope className="text-primary-500 shrink-0" />
                      <a href={`mailto:${ngo.contact.email}`} className="hover:text-primary-600 hover:underline">{ngo.contact.email}</a>
                    </div>
                  )}
                  {ngo.contact.website && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <FaGlobe className="text-primary-500 shrink-0" />
                      <a href={`https://${ngo.contact.website}`} target="_blank" rel="noreferrer" className="hover:text-primary-600 hover:underline">
                        {ngo.contact.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto border-t border-gray-50">
                <div className="pt-4">
                  <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Services Provided</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ngo.services.map((service, idx) => (
                      <span key={idx} className="badge bg-primary-50 text-primary-700 text-[10px]">
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
  );
}

export default NGOs;
