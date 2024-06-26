import React from 'react';

const HouseDetails = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">House Details</h2>
      <img src="https://via.placeholder.com/600x400" alt="House" className="w-full h-64 object-cover rounded-lg mb-4" />
      <div className="text-lg text-gray-700 space-y-2">
        <p><strong>Address:</strong> 123 Main St, Anytown, USA</p>
        <p><strong>Price:</strong> $500,000</p>
        <p><strong>Bedrooms:</strong> 4</p>
        <p><strong>Bathrooms:</strong> 3</p>
        <p><strong>Description:</strong> This beautiful house is located in a serene neighborhood with easy access to amenities. It features modern architecture, spacious rooms, and a large backyard.</p>
      </div>
    </div>
  );
};

const ContactForm = () => {
  return (
    <div className="bg-yellow-600 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/50" alt="Company Logo" className="w-12 h-12 mr-4" />
          <h1 className="text-3xl font-bold text-blue-800">Company Name</h1>
        </div>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://via.placeholder.com/30" alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="https://via.placeholder.com/30" alt="Twitter" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://via.placeholder.com/30" alt="Instagram" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="https://via.placeholder.com/30" alt="LinkedIn" />
          </a>
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-blue-800">Contact Us</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-800 text-sm font-bold mb-2">Name</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-gray-800 text-sm font-bold mb-2">Email</label>
          <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-gray-800 text-sm font-bold mb-2">Message</label>
          <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <button type="submit" className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Submit</button>
      </form>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Contact Details</h3>
        <p className="text-gray-800"><strong>Phone:</strong> (123) 456-7890</p>
        <p className="text-gray-800"><strong>Email:</strong> info@realestate.com</p>
        <p className="text-gray-800"><strong>Address:</strong> 456 Realty St, Anytown, USA</p>
      </div>
    </div>
  );
};

const RealEstatePage = () => {
  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <HouseDetails />
        </div>
        <div className="lg:col-span-1">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default RealEstatePage;
