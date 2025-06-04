import React, { useState } from 'react';
import { Star, Clock, MapPin, Users, Calendar, Camera, Eye, Heart, Share2, ArrowRight } from 'lucide-react';

const PackagesSection = ({ isDarkMode, setSelectedPackage, setShowModal }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedPackages, setLikedPackages] = useState(new Set());

  // Sample images - replace with your actual images
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
      description: "Experience the magic of Dubai's desert with our premium safari package including traditional entertainment and authentic cuisine."
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
      description: "Ascend to the world's tallest building and witness breathtaking panoramic views of Dubai's stunning skyline."
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
      description: "Sail through Dubai's pristine waters on a luxury yacht with world-class amenities and personalized service."
    }
  ];

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
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
  );
};

export default PackagesSection;