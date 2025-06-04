import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Users, Plane, Car, Home, Music, Smartphone, Wifi, Menu, X, Sun, Moon, Globe, Star, Play, ChevronDown, ChevronLeft, ChevronRight, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const DubaiTravelPlatform = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newsletter, setNewsletter] = useState('');
  
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const mapRef = useRef(null);

  const taglines = [
    "Discover Dubai's Magnificence",
    "Experience Luxury Beyond Dreams",
    "Your Gateway to Arabian Adventures"
  ];

  const [currentTagline, setCurrentTagline] = useState(0);

  const services = [
    { id: 1, icon: Plane, title: "Flight Booking", desc: "Premium flights to Dubai", stats: "500+ Airlines", color: "from-blue-500 to-cyan-500" },
    { id: 2, icon: Car, title: "Car Rentals", desc: "Luxury vehicles & sports cars", stats: "200+ Models", color: "from-purple-500 to-pink-500" },
    { id: 3, icon: Home, title: "Villa Reservations", desc: "Exclusive beachfront villas", stats: "150+ Properties", color: "from-green-500 to-emerald-500" },
    { id: 4, icon: Music, title: "Nightlife", desc: "VIP club experiences", stats: "50+ Venues", color: "from-orange-500 to-red-500" },
    { id: 5, icon: Smartphone, title: "eSIM Cards", desc: "Stay connected globally", stats: "100+ Countries", color: "from-indigo-500 to-purple-500" },
    { id: 6, icon: Wifi, title: "Travel Packages", desc: "All-inclusive luxury tours", stats: "25+ Packages", color: "from-teal-500 to-blue-500" }
  ];

  const testimonials = [
    { name: "Sarah Johnson", country: "🇺🇸 USA", text: "The villa booking was seamless and the property exceeded expectations!", rating: 5, audio: true },
    { name: "Ahmed Al-Rashid", country: "🇦🇪 UAE", text: "Best nightlife experience in Dubai. VIP treatment throughout!", rating: 5, audio: false },
    { name: "Emma Thompson", country: "🇬🇧 UK", text: "Car rental service was exceptional. Luxury at its finest!", rating: 5, audio: true }
  ];

  const packages = [
    { id: 1, title: "Desert Safari Deluxe", price: "$299", image: "🏜️", duration: "6 hours" },
    { id: 2, title: "Burj Khalifa Experience", price: "$199", image: "🏢", duration: "3 hours" },
    { id: 3, title: "Yacht Charter Premium", price: "$899", image: "🛥️", duration: "8 hours" }
  ];

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    [heroRef, servicesRef, testimonialsRef, mapRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const searchTabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'cars', label: 'Cars', icon: Car },
    { id: 'villas', label: 'Villas', icon: Home },
    { id: 'nightlife', label: 'Nightlife', icon: Music },
    { id: 'esim', label: 'eSIM', icon: Smartphone }
  ];

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navItems = ['Home', 'Services', 'Packages', 'About', 'Contact'];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Sticky Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrollY > 50 
          ? `${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md shadow-lg` 
          : 'bg-transparent'
      } ${scrollY > 200 && scrollY > 250 ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DubaiLux
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-blue-500 transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <button
                onClick={() => setSelectedLanguage(selectedLanguage === 'EN' ? 'AR' : 'EN')}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Globe size={16} />
                <span className="text-sm font-medium">{selectedLanguage}</span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-yellow-500'
                }`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden absolute top-16 left-0 right-0 ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          } border-t shadow-lg`}>
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 hover:text-blue-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
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

      {/* Animated Search Bar */}
      <section className="relative -mt-20 z-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-2xl shadow-2xl p-6 backdrop-blur-md bg-opacity-95`}>
            {/* Search Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {searchTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                      : `${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} text-gray-600 dark:text-gray-300`
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Search Form */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <select className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}>
                    <option>🇺🇸 New York</option>
                    <option>🇬🇧 London</option>
                    <option>🇫🇷 Paris</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <select className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}>
                    <option>🇦🇪 Dubai</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="date"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 text-gray-400" size={20} />
                  <select className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}>
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <Search size={20} />
                  <span>Search {searchTabs.find(t => t.id === activeTab)?.label}</span>
                </span>
              )}
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        ref={servicesRef}
        id="services"
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Premium <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience Dubai's finest with our curated selection of luxury services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 ${
                  visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: visibleSections.has('services') ? `${index * 100}ms` : '0ms'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative p-8 text-white h-64 flex flex-col justify-between">
                  <div>
                    <service.icon size={48} className="mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-white/90 mb-4">{service.desc}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                      {service.stats}
                    </span>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Packages</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`group ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer`}
                onClick={() => {
                  setSelectedPackage(pkg);
                  setShowModal(true);
                }}
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-6xl">
                  {pkg.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{pkg.duration}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{pkg.price}</span>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        id="about"
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            What Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Guests Say</span>
          </h2>

          <div className="relative">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8 md:p-12`}>
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={24} />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                  <p className="text-sm text-gray-500">{testimonials[currentTestimonial].country}</p>
                </div>
                {testimonials[currentTestimonial].audio && (
                  <button className="ml-4 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                    <Play size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-blue-600 scale-125' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section
        ref={mapRef}
        id="map"
        className={`py-20 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Explore <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dubai</span>
            </h2>
          </div>

          <div className="relative">
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-2xl shadow-2xl p-8 h-96 relative overflow-hidden`}>
              {/* Simplified map representation */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
                {/* Location pins */}
                {[
                  { x: '20%', y: '30%', name: 'Burj Khalifa', color: 'bg-red-500' },
                  { x: '40%', y: '50%', name: 'Dubai Mall', color: 'bg-green-500' },
                  { x: '60%', y: '25%', name: 'Palm Jumeirah', color: 'bg-purple-500' },
                  { x: '80%', y: '60%', name: 'Dubai Marina', color: 'bg-yellow-500' },
                ].map((pin, index) => (
                  <div
                    key={index}
                    className="absolute group cursor-pointer"
                    style={{ left: pin.x, top: pin.y }}
                  >
                    <div className={`w-4 h-4 ${pin.color} rounded-full animate-pulse hover:scale-150 transition-transform duration-300`}></div>
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {pin.name}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                <p className="text-sm font-medium">Interactive Map</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Hover over pins for details</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Newsletter */}
      <footer id="contact" className={`py-16 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DubaiLux
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your premium gateway to Dubai's most exclusive experiences. From luxury accommodations to unforgettable adventures, we curate the finest that Dubai has to offer.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-300 hover:scale-110 transform">
                  <Facebook size={20} />
                </a>
                <a href="#" className="p-3 bg-pink-600 hover:bg-pink-700 rounded-full transition-colors duration-300 hover:scale-110 transform">
                  <Instagram size={20} />
                </a>
                <a href="#" className="p-3 bg-blue-400 hover:bg-blue-500 rounded-full transition-colors duration-300 hover:scale-110 transform">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['About Us', 'Services', 'Packages', 'Contact', 'Blog'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-blue-400" />
                  <span className="text-gray-300">+971 4 123 4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-blue-400" />
                  <span className="text-gray-300">hello@dubailux.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin size={16} className="text-blue-400" />
                  <span className="text-gray-300">Dubai, UAE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-700'} rounded-2xl p-8 mb-8`}>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">Subscribe to our newsletter for exclusive offers and travel tips</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletter}
                    onChange={(e) => setNewsletter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-600 text-white rounded-lg border border-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  />
                </div>
                <button
                  onClick={() => {
                    if (newsletter) {
                      setNewsletter('');
                      // Add success feedback here
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 DubaiLux. All rights reserved. | 
              <a href="#" className="hover:text-blue-400 transition-colors duration-300 ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-blue-400 transition-colors duration-300 ml-1">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Package Modal */}
      {showModal && selectedPackage && (
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
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-2xl text-center`}>
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Searching for the best options...</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">This may take a few moments</p>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {scrollY > 500 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
        >
          <ChevronLeft className="rotate-90" size={24} />
        </button>
      )}
    </div>
  );
};

export default DubaiTravelPlatform;