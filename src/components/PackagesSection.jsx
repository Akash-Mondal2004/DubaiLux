import React, { useState } from 'react';
import { Star, Clock, MapPin, Users, Calendar, Camera, Eye, Heart, Share2, ArrowRight, X, Phone, Mail, CreditCard, Check } from 'lucide-react';

// Thank You Modal Component
const ThankYouModal = ({ isOpen, onClose, bookingDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full relative overflow-hidden">
        {/* Confetti Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute top-8 right-6 w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute bottom-8 right-4 w-1 h-1 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
        </div>

        <div className="text-center relative z-10">
          {/* Success Icon */}
          <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <Check size={40} className="text-white" />
          </div>

          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Booking Confirmed!
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank you for booking with us! We're excited to provide you with an amazing experience.
          </p>

          {bookingDetails && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 mb-6 text-left">
              <h4 className="font-semibold mb-3">Booking Summary:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Package:</span>
                  <span className="font-medium">{bookingDetails.packageTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span className="font-medium">{bookingDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{bookingDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span className="font-medium">{bookingDetails.guests}</span>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            You'll receive a confirmation email shortly with all the details.
          </p>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

// Booking Modal Component
const BookingModal = ({ isOpen, onClose, packageData, onBookingComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '1',
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !packageData) return null;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const bookingDetails = {
      ...formData,
      packageTitle: packageData.title,
      packagePrice: packageData.price
    };
    
    setIsSubmitting(false);
    onBookingComplete(bookingDetails);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Book Your Experience</h2>
            <p className="text-gray-600 dark:text-gray-300">Complete your booking for {packageData.title}</p>
          </div>

          {/* Package Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center space-x-4">
              <img 
                src={packageData.image} 
                alt={packageData.title}
                className="w-20 h-20 rounded-xl object-cover"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/200x200/3B82F6/FFFFFF?text=${encodeURIComponent(packageData.title.slice(0, 2))}`;
                }}
              />
              <div>
                <h3 className="text-xl font-bold">{packageData.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{packageData.location}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-2xl font-bold text-blue-600">{packageData.price}</span>
                  <span className="text-sm text-gray-500">per person</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Number of Guests *</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                placeholder="Any special requirements or requests..."
              />
            </div>

            {/* Total Price */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium">Total Price:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${(parseInt(packageData.price.replace('$', '')) * parseInt(formData.guests)).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {packageData.price} × {formData.guests} guest{formData.guests > 1 ? 's' : ''}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  <span>Confirm Booking</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Package Details Modal Component
const PackageModal = ({ isOpen, onClose, packageData, onBookNow }) => {
  if (!isOpen || !packageData) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/30 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Hero Image */}
        <div className="relative h-80 overflow-hidden rounded-t-3xl">
          <img 
            src={packageData.image} 
            alt={packageData.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=${encodeURIComponent(packageData.title)}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Package Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-4xl font-bold mb-2">{packageData.title}</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin size={18} />
                <span>{packageData.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400 fill-current" size={18} />
                <span>{packageData.rating}</span>
                <span>({packageData.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
              <Clock className="mx-auto mb-2 text-blue-600" size={24} />
              <div className="font-semibold">{packageData.duration}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
              <Users className="mx-auto mb-2 text-green-600" size={24} />
              <div className="font-semibold">{packageData.groupSize}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Group Size</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
              <Star className="mx-auto mb-2 text-purple-600" size={24} />
              <div className="font-semibold">{packageData.difficulty}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Difficulty</div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">About This Experience</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {packageData.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">What's Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {packageData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing and Book Button */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl font-bold text-blue-600">{packageData.price}</span>
                {packageData.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">{packageData.originalPrice}</span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400">per person</p>
            </div>
            
            <button
              onClick={() => onBookNow(packageData)}
              className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg flex items-center space-x-2 hover:scale-105"
            >
              <Calendar size={20} />
              <span>Book Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Packages Section Component
const PackagesSection = ({ isDarkMode = false }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedPackages, setLikedPackages] = useState(new Set());
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Sample packages data
  const packages = [
    { 
      id: 1, 
      title: "Desert Safari Deluxe", 
      price: "$299", 
      originalPrice: "$399",
      image: "https://veronikasadventure.com/wp-content/uploads/2024/07/2_all-in-one-deluxe-private-desert-safari-dubai.jpg?w=800&h=600&fit=crop", 
      duration: "6 hours",
      location: "Dubai Desert",
      rating: 4.9,
      reviews: 324,
      category: "Adventure",
      highlights: ["Camel Riding", "BBQ Dinner", "Cultural Show", "Sandboarding"],
      groupSize: "2-15 people",
      difficulty: "Easy",
      description: "Experience the magic of Dubai's desert with our premium safari package including traditional entertainment and authentic cuisine. Watch the sunset over golden dunes while enjoying a feast under the stars."
    },
    { 
      id: 2, 
      title: "Burj Khalifa Experience", 
      price: "$199", 
      originalPrice: "$249",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop", 
      duration: "3 hours",
      location: "Downtown Dubai",
      rating: 4.8,
      reviews: 567,
      category: "Sightseeing",
      highlights: ["Sky-high Views", "At the Top", "Dubai Mall", "Professional Photos"],
      groupSize: "1-8 people",
      difficulty: "Easy",
      description: "Ascend to the world's tallest building and witness breathtaking panoramic views of Dubai's stunning skyline. Perfect for capturing memories with professional photography services included."
    },
    { 
      id: 3, 
      title: "Yacht Charter Premium", 
      price: "$899", 
      originalPrice: "$1199",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop", 
      duration: "8 hours",
      location: "Dubai Marina",
      rating: 4.9,
      reviews: 189,
      category: "Luxury",
      highlights: ["Private Chef", "Water Sports", "Sunset Views", "Premium Service"],
      groupSize: "2-12 people",
      difficulty: "Easy",
      description: "Sail through Dubai's pristine waters on a luxury yacht with world-class amenities and personalized service. Enjoy gourmet dining and water activities in ultimate comfort."
    }
  ];

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(false);
    setShowBookingModal(true);
  };

  const handleBookingComplete = (details) => {
    setBookingDetails(details);
    setShowBookingModal(false);
    setShowThankYouModal(true);
  };

  const toggleLike = (e, packageId) => {
    e.stopPropagation();
    const newLiked = new Set(likedPackages);
    if (newLiked.has(packageId)) {
      newLiked.delete(packageId);
    } else {
      newLiked.add(packageId);
    }
    setLikedPackages(newLiked);
  };

  const handleShare = (e, pkg) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: pkg.title,
        text: pkg.description,
        url: window.location.href
      });
    }
  };

  return (
    <>
      <section id="packages" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.5) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full mb-4">
              <Star className="text-yellow-500 fill-current" size={20} />
              <span className="text-sm font-medium">Premium Experiences</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Featured <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Packages</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover handpicked experiences that showcase the best of Dubai's luxury and adventure
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`group relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-2`}
                onClick={() => handlePackageClick(pkg)}
                onMouseEnter={() => setHoveredCard(pkg.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=${encodeURIComponent(pkg.title)}`;
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium">
                      {pkg.category}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => toggleLike(e, pkg.id)}
                      className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                        likedPackages.has(pkg.id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart size={16} className={likedPackages.has(pkg.id) ? 'fill-current' : ''} />
                    </button>
                    <button
                      onClick={(e) => handleShare(e, pkg)}
                      className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>

                  {/* Quick Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span className="text-sm">{pkg.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400 fill-current" size={16} />
                        <span className="text-sm font-medium">{pkg.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title and Rating */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {pkg.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={16} />
                          <span>{pkg.groupSize}</span>
                        </div>
                      </div>
                      <span className="text-xs">{pkg.reviews} reviews</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {pkg.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                      {pkg.highlights.length > 3 && (
                        <span className="text-xs text-gray-500">+{pkg.highlights.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-600">{pkg.price}</span>
                        {pkg.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">{pkg.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">per person</span>
                    </div>
                    
                    <button 
                      className="group/btn bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:shadow-blue-500/25 flex items-center space-x-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePackageClick(pkg);
                      }}
                    >
                      <Eye size={16} />
                      <span className="font-medium">View</span>
                      <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold text-lg group">
              <span className="flex items-center space-x-2">
                <span>Explore All Packages</span>
                <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(60px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .animate-slide-in-up {
            animation: slideInUp 0.6s ease-out forwards;
          }
        `}</style>
      </section>

      {/* Package Details Modal */}
      <PackageModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        packageData={selectedPackage}
        onBookNow={handleBookNow}
      />

      {/* Booking Modal */}
      <BookingModal 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        packageData={selectedPackage}
        onBookingComplete={handleBookingComplete}
      />

      {/* Thank You Modal */}
      <ThankYouModal 
        isOpen={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
        bookingDetails={bookingDetails}
      />
    </>
  );
};

export default PackagesSection;