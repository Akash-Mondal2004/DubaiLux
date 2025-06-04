import React from 'react';

const LoadingOverlay = ({ isLoading, isDarkMode }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-2xl text-center`}>
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-semibold">Searching for the best options...</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">This may take a few moments</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;