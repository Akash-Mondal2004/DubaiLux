// components/HeroSection.js
import React, { useState, useEffect, useRef } from 'react';
import { Play, ChevronDown } from 'lucide-react';

const HeroSection = ({ isDarkMode }) => {
  const [typedText, setTypedText] = useState('');
  const [currentTagline, setCurrentTagline] = useState(0);
  const heroRef = useRef(null);

  const taglines = [
    "Discover Dubai's Magnificence",
    "Experience Luxury Beyond Dreams",
    "Your Gateway to Arabian Adventures"
  ];

  // Typing animation
  useEffect(() => {
    const text = taglines[currentTagline];
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentTagline((prev) => (prev + 1) % taglines.length);
          setTypedText('');
        }, 2000);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [currentTagline]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="block">Welcome to</span>
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Dubai Luxury
          </span>
        </h1>
        
        <div className="h-16 mb-8">
          <p className="text-xl md:text-2xl text-gray-200 min-h-[2rem]">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
            <span className="relative z-10">Explore Packages</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
          </button>
          
          <button className="group px-8 py-4 border-2 border-white/50 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-105">
            <span className="flex items-center space-x-2">
              <Play size={20} />
              <span>Watch Video</span>
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <ChevronDown size={32} className="text-white/70" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;