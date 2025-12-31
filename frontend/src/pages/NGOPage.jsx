import React, { useState } from "react";

const NGOPage = () => {
  // State to hold all NGOs
  const [ngos, setNgos] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [form, setForm] = useState({
    name: "",
    experience: "",
    specialty: "",
    amount: "",
    location: "",
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNgos([...ngos, form]);
    setForm({
      name: "",
      experience: "",
      specialty: "",
      amount: "",
      location: "",
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredNgos = ngos.filter((ngo) =>
    ngo.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">NGO Listings</h1>

      <input
        type="text"
        placeholder="Search NGOs by location (e.g., Kolkata)"
        value={searchQuery}
        onChange={handleSearch}
        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
      />

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add a New NGO</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="NGO Name"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="Years of Experience"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
            placeholder="Specialty (e.g., Education, Health)"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount to be Donated (INR)"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location (e.g., Kolkata)"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Add NGO
          </button>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-2">NGOs in Your Search</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNgos.length > 0 ? (
          filteredNgos.map((ngo, index) => (
            <div
              key={index}
              className="border p-4 rounded-md shadow-md space-y-4 bg-gray-100"
            >
              <h3 className="text-lg font-bold">{ngo.name}</h3>
              <p>
                <strong>Years of Experience:</strong> {ngo.experience}
              </p>
              <p>
                <strong>Specialty:</strong> {ngo.specialty}
              </p>
              <p>
                <strong>Amount to Donate:</strong> ₹{ngo.amount}
              </p>
              <p>
                <strong>Location:</strong> {ngo.location}
              </p>
            </div>
          ))
        ) : (
          <p>No NGOs found for the given location.</p>
        )}
      </div>
    </div>
  );
};

export default NGOPage;
