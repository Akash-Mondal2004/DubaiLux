import React from 'react';
import { X } from 'lucide-react';

const PackageModal = ({ showModal, setShowModal, selectedPackage, isDarkMode }) => {
  if (!showModal || !selectedPackage) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">{selectedPackage.title}</h3>
            <button
              onClick={() => setShowModal(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-300"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-6xl mb-6">
            {selectedPackage.image}
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Duration:</span>
              <span className="font-semibold">{selectedPackage.duration}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Price:</span>
              <span className="text-2xl font-bold text-blue-600">{selectedPackage.price}</span>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Experience the best of Dubai with our premium package. Includes luxury accommodations, 
            guided tours, and exclusive access to Dubai's top attractions.
          </p>
          
          <div className="flex space-x-4">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
              Book Now
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 border-2 border-gray-300 dark:border-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageModal;