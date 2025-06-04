import React, { useState, useEffect, useRef } from 'react';
import { Star, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const isDarkMode = false;

  const testimonials = [
    {
      name: "John Doe",
      text: "This was the best experience of my life! The service was top-notch and exceeded all expectations.",
      rating: 5,
      country: "USA",
      audio: "https://example.com/audio1.mp3",
    },
    {
      name: "Aisha Khan",
      text: "Absolutely amazing! Will definitely recommend to my friends and family. Outstanding quality!",
      rating: 4,
      country: "UAE",
      audio: null,
    },
    {
      name: "Carlos Fernandez",
      text: "Loved every bit of it. The team was super friendly and helpful throughout the entire process.",
      rating: 5,
      country: "Spain",
      audio: "https://example.com/audio2.mp3",
    },
    {
      name: "Haruki Tanaka",
      text: "Very well organized and smooth process throughout. Thank you for the wonderful experience!",
      rating: 4,
      country: "Japan",
      audio: null,
    },
    {
      name: "Emma Wilson",
      text: "Professional, reliable, and simply fantastic. I couldn't have asked for a better service.",
      rating: 5,
      country: "UK",
      audio: "https://example.com/audio3.mp3",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, testimonials.length]);

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === currentTestimonial) return;
    setIsAnimating(true);
    setCurrentTestimonial(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resumeAutoPlay = () => {
    setIsAutoPlaying(true);
  };

  const current = testimonials?.[currentTestimonial];

  if (!current) return null;

  return (
    <section id="testimonials" className="py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header with staggered animation */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-6xl font-bold mb-4 animate-[slideInUp_0.8s_ease-out]"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            What Our{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Guests Say
            </span>
          </h2>
          {/* <div 
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full animate-[slideInUp_0.8s_ease-out]"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          ></div> */}
        </div>

        {/* Main testimonial container */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          {/* Navigation Arrows - Hidden on mobile */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            disabled={isAnimating}
          >
            <ChevronLeft className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors" size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            disabled={isAnimating}
          >
            <ChevronRight className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors" size={24} />
          </button>

          {/* Testimonial Card */}
          <div
            className="touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              key={currentTestimonial}
              className={`${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
              } rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden transform transition-all duration-500 hover:scale-[1.02] animate-[fadeInScale_0.6s_ease-out]`}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 opacity-50"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Stars with staggered animation */}
                <div className="flex justify-center mb-8">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="text-yellow-400 fill-current animate-[starPulse_0.6s_ease-out]" 
                      size={28}
                      style={{ 
                        animationDelay: `${i * 0.1}s`,
                        animationFillMode: 'both'
                      }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote 
                  className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 italic leading-relaxed animate-[slideInUp_0.8s_ease-out]"
                  style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                >
                  "{current.text}"
                </blockquote>

                {/* Author info */}
                <div 
                  className="flex items-center justify-center space-x-4 animate-[slideInUp_0.8s_ease-out]"
                  style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {current.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-lg">{current.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{current.country}</p>
                  </div>
                  {current.audio && (
                    <button className="ml-4 p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-110 shadow-lg">
                      <Play size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-6 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentTestimonial + 1) / testimonials.length) * 100}%` 
              }}
            ></div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`relative transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'w-8 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full'
                    : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                disabled={isAnimating}
              >
                {index === currentTestimonial && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Swipe indicator for mobile */}
          <div className="flex justify-center mt-4 md:hidden">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span>Swipe to navigate</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes starPulse {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;