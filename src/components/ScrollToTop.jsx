import React from 'react';
import { ChevronLeft } from 'lucide-react';

const ScrollToTop = ({ scrollY }) => {
  if (scrollY <= 500) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
    >
      <ChevronLeft className="rotate-90" size={24} />
    </button>
  );
};

export default ScrollToTop;