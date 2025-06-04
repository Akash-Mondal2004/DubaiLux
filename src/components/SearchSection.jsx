import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Users, Plane, Car, Home, Music, Smartphone, ChevronDown, X, Star, Clock, Wifi, Shield } from 'lucide-react';

const SearchSection = ({ isDarkMode, isLoading, setIsLoading }) => {
  const [activeTab, setActiveTab] = useState('flights');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [fromCity, setFromCity] = useState({ name: 'New York', flag: '🇺🇸', code: 'NYC' });
  const [toCity, setToCity] = useState({ name: 'Dubai', flag: '🇦🇪', code: 'DXB' });
  const [morphingFields, setMorphingFields] = useState({});
  
  const searchInputRef = useRef(null);
  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);

  const searchTabs = [
    { id: 'flights', label: 'Flights', icon: Plane, color: 'from-blue-500 to-cyan-500' },
    { id: 'cars', label: 'Cars', icon: Car, color: 'from-green-500 to-emerald-500' },
    { id: 'villas', label: 'Villas', icon: Home, color: 'from-purple-500 to-pink-500' },
    { id: 'nightlife', label: 'Nightlife', icon: Music, color: 'from-red-500 to-orange-500' },
    { id: 'esim', label: 'eSIM', icon: Smartphone, color: 'from-indigo-500 to-blue-500' }
  ];

  const cities = [
    { name: 'New York', flag: '🇺🇸', code: 'NYC' },
    { name: 'London', flag: '🇬🇧', code: 'LHR' },
    { name: 'Paris', flag: '🇫🇷', code: 'CDG' },
    { name: 'Dubai', flag: '🇦🇪', code: 'DXB' },
    { name: 'Tokyo', flag: '🇯🇵', code: 'NRT' },
    { name: 'Singapore', flag: '🇸🇬', code: 'SIN' },
    { name: 'Sydney', flag: '🇦🇺', code: 'SYD' },
    { name: 'Mumbai', flag: '🇮🇳', code: 'BOM' }
  ];

  // Mock search results based on active tab
  const mockResults = {
    flights: [
      { id: 1, title: 'Emirates A380 Direct', price: '$899', time: '14h 30m', rating: 4.8, stops: 'Non-stop' },
      { id: 2, title: 'Qatar Airways Premium', price: '$756', time: '16h 15m', rating: 4.7, stops: '1 stop' },
      { id: 3, title: 'Etihad Business Class', price: '$1,249', time: '15h 45m', rating: 4.9, stops: 'Non-stop' }
    ],
    cars: [
      { id: 1, title: 'BMW X5 Luxury SUV', price: '$89/day', features: 'GPS, AC', rating: 4.8, type: 'SUV' },
      { id: 2, title: 'Mercedes E-Class', price: '$76/day', features: 'Premium Sound', rating: 4.7, type: 'Sedan' },
      { id: 3, title: 'Audi Q7 Premium', price: '$95/day', features: 'All-wheel drive', rating: 4.9, type: 'SUV' }
    ],
    villas: [
      { id: 1, title: 'Luxury Beach Villa', price: '$450/night', features: 'Pool, Beach Access', rating: 4.9, beds: '4 beds' },
      { id: 2, title: 'Modern City Penthouse', price: '$320/night', features: 'Skyline View', rating: 4.7, beds: '3 beds' },
      { id: 3, title: 'Desert Resort Villa', price: '$280/night', features: 'Spa, Golf', rating: 4.8, beds: '2 beds' }
    ],
    nightlife: [
      { id: 1, title: 'Skybar Rooftop', price: 'Premium', time: '8 PM - 3 AM', rating: 4.8, type: 'Rooftop Bar' },
      { id: 2, title: 'Club Zero Gravity', price: 'VIP Available', time: '10 PM - 4 AM', rating: 4.7, type: 'Beach Club' },
      { id: 3, title: 'Atmosphere Lounge', price: 'Exclusive', time: '6 PM - 2 AM', rating: 4.9, type: 'Fine Dining' }
    ],
    esim: [
      { id: 1, title: 'UAE 30-Day Plan', price: '$24', data: '20GB', rating: 4.8, network: '5G Coverage' },
      { id: 2, title: 'Global Roaming Plus', price: '$45', data: '50GB', rating: 4.7, network: 'Multi-country' },
      { id: 3, title: 'Business Travel Plan', price: '$89', data: 'Unlimited', rating: 4.9, network: 'Premium Speed' }
    ]
  };

  // Field configurations for different tabs
  const fieldConfigs = {
    flights: [
      { key: 'from', label: 'From', icon: MapPin, type: 'city' },
      { key: 'to', label: 'To', icon: MapPin, type: 'city' },
      { key: 'date', label: 'Departure', icon: Calendar, type: 'date' },
      { key: 'guests', label: 'Passengers', icon: Users, type: 'select', options: ['1 Passenger', '2 Passengers', '3 Passengers', '4+ Passengers'] }
    ],
    cars: [
      { key: 'pickup', label: 'Pickup Location', icon: MapPin, type: 'city' },
      { key: 'dropoff', label: 'Drop-off Location', icon: MapPin, type: 'city' },
      { key: 'date', label: 'Pickup Date', icon: Calendar, type: 'date' },
      { key: 'time', label: 'Pickup Time', icon: Clock, type: 'time' }
    ],
    villas: [
      { key: 'destination', label: 'Destination', icon: MapPin, type: 'city' },
      { key: 'checkin', label: 'Check-in', icon: Calendar, type: 'date' },
      { key: 'checkout', label: 'Check-out', icon: Calendar, type: 'date' },
      { key: 'guests', label: 'Guests', icon: Users, type: 'select', options: ['1 Guest', '2 Guests', '3-4 Guests', '5+ Guests'] }
    ],
    nightlife: [
      { key: 'city', label: 'City', icon: MapPin, type: 'city' },
      { key: 'date', label: 'Date', icon: Calendar, type: 'date' },
      { key: 'time', label: 'Time', icon: Clock, type: 'time' },
      { key: 'party', label: 'Party Size', icon: Users, type: 'select', options: ['2 People', '3-5 People', '6-10 People', '10+ People'] }
    ],
    esim: [
      { key: 'country', label: 'Country', icon: MapPin, type: 'city' },
      { key: 'duration', label: 'Duration', icon: Calendar, type: 'select', options: ['7 Days', '15 Days', '30 Days', '90 Days'] },
      { key: 'data', label: 'Data Amount', icon: Wifi, type: 'select', options: ['5GB', '10GB', '20GB', 'Unlimited'] },
      { key: 'coverage', label: 'Coverage', icon: Shield, type: 'select', options: ['Local Only', 'Regional', 'Global'] }
    ]
  };

  // Handle tab change with morphing animation
  const handleTabChange = (tabId) => {
    setMorphingFields({ morphing: true });
    setTimeout(() => {
      setActiveTab(tabId);
      setMorphingFields({ morphing: false });
    }, 150);
  };

  // Handle search with live results
  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSearchResults(mockResults[activeTab] || []);
      setShowResults(true);
      setIsLoading(false);
    }, 2000);
  };

  // Live search functionality
  useEffect(() => {
    if (searchQuery.length > 2) {
      const filtered = mockResults[activeTab]?.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchQuery, activeTab]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromDropdownRef.current && !fromDropdownRef.current.contains(event.target)) {
        setShowFromDropdown(false);
      }
      if (toDropdownRef.current && !toDropdownRef.current.contains(event.target)) {
        setShowToDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const CityDropdown = ({ isOpen, onToggle, selectedCity, onSelect, dropdownRef }) => (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
          isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'
        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 flex items-center justify-between hover:shadow-md`}
      >
        <span className="flex items-center space-x-2">
          <span className="text-lg">{selectedCity.flag}</span>
          <span>{selectedCity.name}</span>
          <span className="text-sm text-gray-400">({selectedCity.code})</span>
        </span>
        <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={16} />
      </button>
      
      {isOpen && (
        <div className={`absolute top-full left-0 right-0 z-50 mt-1 ${
          isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
        } border rounded-lg shadow-2xl max-h-60 overflow-y-auto animate-in slide-in-from-top-2 duration-200`}>
          {cities.map((city, index) => (
            <button
              key={city.code}
              onClick={() => {
                onSelect(city);
                onToggle();
              }}
              className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 flex items-center space-x-3 ${
                index === 0 ? 'rounded-t-lg' : ''
              } ${index === cities.length - 1 ? 'rounded-b-lg' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-xl animate-bounce" style={{ animationDelay: `${index * 100}ms` }}>
                {city.flag}
              </span>
              <div>
                <div className="font-medium">{city.name}</div>
                <div className="text-sm text-gray-500">{city.code}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const currentFields = fieldConfigs[activeTab] || fieldConfigs.flights;
  const activeTabConfig = searchTabs.find(tab => tab.id === activeTab);

  return (
    <section className="relative -mt-20 z-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`${
          isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'
        } rounded-2xl shadow-2xl p-6 backdrop-blur-md border ${
          isDarkMode ? 'border-gray-700' : 'border-gray-100'
        }`}>
          
          {/* Live Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={`Search ${activeTabConfig?.label.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-12 py-4 rounded-xl border-2 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Search Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {searchTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105 shadow-blue-500/25`
                    : `${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} hover:scale-105`
                }`}
              >
                <tab.icon size={20} className={activeTab === tab.id ? 'animate-pulse' : ''} />
                <span className="font-medium">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Dynamic Search Form */}
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 transition-all duration-300 ${
            morphingFields.morphing ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
          }`}>
            {currentFields.map((field, index) => (
              <div key={`${activeTab}-${field.key}`} className="space-y-2" style={{ animationDelay: `${index * 100}ms` }}>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center space-x-1">
                  <field.icon size={16} />
                  <span>{field.label}</span>
                </label>
                <div className="relative">
                  <field.icon className="absolute left-3 top-3 text-gray-400" size={20} />
                  
                  {field.type === 'city' && field.key === 'from' && (
                    <CityDropdown
                      isOpen={showFromDropdown}
                      onToggle={() => setShowFromDropdown(!showFromDropdown)}
                      selectedCity={fromCity}
                      onSelect={setFromCity}
                      dropdownRef={fromDropdownRef}
                    />
                  )}
                  
                  {field.type === 'city' && (field.key === 'to' || field.key === 'destination' || field.key === 'pickup' || field.key === 'dropoff' || field.key === 'city' || field.key === 'country') && (
                    <CityDropdown
                      isOpen={showToDropdown}
                      onToggle={() => setShowToDropdown(!showToDropdown)}
                      selectedCity={toCity}
                      onSelect={setToCity}
                      dropdownRef={toDropdownRef}
                    />
                  )}
                  
                  {field.type === 'date' && (
                    <input
                      type="date"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                    />
                  )}
                  
                  {field.type === 'time' && (
                    <input
                      type="time"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                    />
                  )}
                  
                  {field.type === 'select' && (
                    <select className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}>
                      {field.options?.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Search Button */}
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r ${activeTabConfig?.color || 'from-blue-600 to-purple-600'} text-white font-semibold py-4 rounded-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-r-white/50 rounded-full animate-spin animation-delay-75"></div>
                </div>
                <span className="text-lg">Searching {activeTabConfig?.label}...</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-100"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-200"></div>
                </div>
              </div>
            ) : (
              <span className="flex items-center justify-center space-x-3 text-lg">
                <Search size={24} className="group-hover:animate-pulse" />
                <span>Search {activeTabConfig?.label}</span>
                <div className="w-0 group-hover:w-8 h-8 bg-white/20 rounded-full transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </div>
              </span>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
          </button>

          {/* Live Search Results */}
          {showResults && searchResults.length > 0 && (
            <div className={`mt-6 ${
              isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50/50'
            } rounded-xl p-4 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-500`}>
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Star className="text-yellow-500" size={20} />
                <span>Top Results</span>
              </h3>
              <div className="grid gap-3">
                {searchResults.slice(0, 3).map((result, index) => (
                  <div
                    key={result.id}
                    className={`p-4 rounded-lg ${
                      isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                    } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} 
                    transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer animate-in slide-in-from-left-4`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">{result.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                          {result.time && <span>{result.time}</span>}
                          {result.features && <span>• {result.features}</span>}
                          {result.data && <span>• {result.data}</span>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">{result.price}</div>
                        <div className="flex items-center space-x-1 text-sm">
                          <Star className="text-yellow-500 fill-current" size={16} />
                          <span>{result.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .animation-delay-75 { animation-delay: 75ms; }
        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(-8px); }
          70% { transform: translateY(-4px); }
        }
        .animate-bounce { animation: bounce 1s infinite; }
      `}</style>
    </section>
  );
};

export default SearchSection;