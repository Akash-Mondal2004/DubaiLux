// components/ServicesSection.js
import React, { useState, useEffect, useRef } from 'react';
import { Plane, Car, Home, Music, Smartphone, Wifi, ChevronRight } from 'lucide-react';

const ServicesSection = ({ isDarkMode }) => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const servicesRef = useRef(null);

  const services = [
    { id: 1, icon: Plane, title: "Flight Booking", desc: "Premium flights to Dubai", stats: "500+ Airlines", color: "from-blue-500 to-cyan-500" },
    { id: 2, icon: Car, title: "Car Rentals", desc: "Luxury vehicles & sports cars", stats: "200+ Models", color: "from-purple-500 to-pink-500" },
    { id: 3, icon: Home, title: "Villa Reservations", desc: "Exclusive beachfront villas", stats: "150+ Properties", color: "from-green-500 to-emerald-500" },
    { id: 4, icon: Music, title: "Nightlife", desc: "VIP club experiences", stats: "50+ Venues", color: "from-orange-500 to-red-500" },
    { id: 5, icon: Smartphone, title: "eSIM Cards", desc: "Stay connected globally", stats: "100+ Countries", color: "from-indigo-500 to-purple-500" },
    { id: 6, icon: Wifi, title: "Travel Packages", desc: "All-inclusive luxury tours", stats: "25+ Packages", color: "from-teal-500 to-blue-500" }
  ];

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

    if (servicesRef.current) observer.observe(servicesRef.current);
    return () => observer.disconnect();
  }, []);

  return (
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
  );
};

export default ServicesSection;