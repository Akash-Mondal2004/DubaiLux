// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import DubaiTravelPlatform from './components/DubaiTravelPlatform';

  
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <DubaiTravelPlatform />
//     </>
//   )
// }

// export default App

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SearchSection from './components/SearchSection';
import ServicesSection from './components/ServicesSection';
import PackagesSection from './components/PackagesSection';
import TestimonialsSection from './components/TestimonialsSection';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import PackageModal from './components/PackageModal';
import LoadingOverlay from './components/LoadingOverlay';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const appState = {
    isDarkMode,
    scrollY,
    selectedLanguage,
    showModal,
    selectedPackage,
    isLoading,
    setSelectedLanguage,
    setShowModal,
    setSelectedPackage,
    setIsLoading,
    toggleDarkMode
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar {...appState} />
      <HeroSection isDarkMode={isDarkMode} />
      <SearchSection {...appState} />
      <ServicesSection isDarkMode={isDarkMode} />
      <PackagesSection {...appState} />
      <TestimonialsSection isDarkMode={isDarkMode} />
      <MapSection isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
      
      {/* Modals and Overlays */}
      {showModal && selectedPackage && (
        <PackageModal {...appState} />
      )}
      {isLoading && <LoadingOverlay isDarkMode={isDarkMode} />}
      <ScrollToTop scrollY={scrollY} />
    </div>
  );
};

export default App;
