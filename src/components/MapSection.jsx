import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom map styles controller
const MapStyleController = ({ isDarkMode, currentStyle, onStyleChange }) => {
  const map = useMap();
  
  useEffect(() => {
    // Update tile layer based on style
    map.eachLayer((layer) => {
      if (layer._url) {
        map.removeLayer(layer);
      }
    });
    
    const tileLayer = L.tileLayer(currentStyle.url, {
      attribution: currentStyle.attribution,
      maxZoom: 18,
    });
    
    tileLayer.addTo(map);
  }, [currentStyle, map]);

  return null;
};

// Custom markers with different categories
const createCustomIcon = (category, color) => {
  const iconHtml = `
    <div class="custom-marker" style="
      background: linear-gradient(135deg, ${color}, ${color}dd);
      width: 40px;
      height: 40px;
      border-radius: 50% 50% 50% 0;
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(-45deg);
      position: relative;
    ">
      <span style="
        transform: rotate(45deg);
        font-size: 16px;
        color: white;
        font-weight: bold;
      ">${category}</span>
      <div style="
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 12px;
        height: 12px;
        background: ${color};
        border-left: 3px solid white;
        border-bottom: 3px solid white;
      "></div>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className: 'custom-div-icon'
  });
};

const MapSection = ({ mapRef, isDarkMode }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapStyle, setMapStyle] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState(new Set());
  
  const mapStyles = {
    default: {
      name: 'Default',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
    },
    satellite: {
      name: 'Satellite',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
    },
    dark: {
      name: 'Dark',
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    },
    terrain: {
      name: 'Terrain',
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
    }
  };

  const locations = [
    {
      name: 'Burj Khalifa',
      lat: 25.1972,
      lng: 55.2744,
      description: 'The world\'s tallest building standing at 828 meters',
      category: 'Architecture',
      icon: '🏗️',
      color: '#ef4444',
      details: {
        height: '828m',
        floors: '163',
        opened: '2010',
        architect: 'Adrian Smith'
      }
    },
    {
      name: 'Dubai Mall',
      lat: 25.1985,
      lng: 55.2796,
      description: 'One of the world\'s largest shopping destinations',
      category: 'Shopping',
      icon: '🛍️',
      color: '#22c55e',
      details: {
        area: '502,000 m²',
        stores: '1,200+',
        visitors: '80M annually',
        opened: '2008'
      }
    },
    {
      name: 'Palm Jumeirah',
      lat: 25.1122,
      lng: 55.1386,
      description: 'Iconic palm-shaped artificial island',
      category: 'Island',
      icon: '🏝️',
      color: '#a855f7',
      details: {
        length: '5km',
        width: '5km',
        residents: '10,000+',
        completed: '2006'
      }
    },
    {
      name: 'Dubai Marina',
      lat: 25.0800,
      lng: 55.1400,
      description: 'Stunning waterfront district with luxury living',
      category: 'Marina',
      icon: '⚓',
      color: '#eab308',
      details: {
        area: '4.4 km²',
        population: '50,000+',
        towers: '200+',
        marina: '3km long'
      }
    },
    {
      name: 'Atlantis The Palm',
      lat: 25.1308,
      lng: 55.1173,
      description: 'Luxury resort on Palm Jumeirah',
      category: 'Hotel',
      icon: '🏨',
      color: '#06b6d4',
      details: {
        rooms: '1,548',
        aquarium: '65,000 marine animals',
        waterpark: 'Aquaventure',
        opened: '2008'
      }
    },
    {
      name: 'Jumeirah Beach',
      lat: 25.2048,
      lng: 55.2381,
      description: 'Premium beachfront destination',
      category: 'Beach',
      icon: '🏖️',
      color: '#f97316',
      details: {
        length: '7km',
        temperature: '24-34°C',
        activities: 'Water sports',
        facilities: 'World-class'
      }
    }
  ];

  const categories = [...new Set(locations.map(loc => loc.category))];

  const filteredLocations = locations.filter(loc => 
    filteredCategories.size === 0 || filteredCategories.has(loc.category)
  );

  const toggleCategory = (category) => {
    const newFiltered = new Set(filteredCategories);
    if (newFiltered.has(category)) {
      newFiltered.delete(category);
    } else {
      newFiltered.add(category);
    }
    setFilteredCategories(newFiltered);
  };

  const clearFilters = () => {
    setFilteredCategories(new Set());
  };

  return (
    <section
      ref={mapRef}
      id="map"
      className={`py-12 px-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Explore{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Dubai
            </span>
          </h2>
          <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover Dubai's most iconic landmarks. Click on markers to explore detailed information.
          </p>
        </div>

        {/* Map Controls */}
        <div className="mb-4 flex flex-wrap gap-3 justify-between items-center">
          {/* Style Selector */}
          <div className="flex flex-wrap gap-2 items-center">
            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Style:
            </label>
            {Object.entries(mapStyles).map(([key, style]) => (
              <button
                key={key}
                onClick={() => setMapStyle(key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  mapStyle === key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {style.name}
              </button>
            ))}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            🎯 Filters {filteredCategories.size > 0 && `(${filteredCategories.size})`}
          </button>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div className={`mb-6 p-4 rounded-xl transition-all duration-300 ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex flex-wrap gap-2 items-center">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Filter by category:
              </span>
              {categories.map(category => {
                const location = locations.find(loc => loc.category === category);
                return (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      filteredCategories.has(category)
                        ? 'text-white shadow-lg'
                        : isDarkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={filteredCategories.has(category) ? { backgroundColor: location.color } : {}}
                  >
                    {location.icon} {category}
                  </button>
                );
              })}
              {filteredCategories.size > 0 && (
                <button
                  onClick={clearFilters}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        )}

        {/* Map Container */}
        <div className="relative">
          <div className={`rounded-2xl shadow-2xl overflow-hidden h-[400px] transition-all duration-300 ${
            isDarkMode ? 'ring-1 ring-gray-700' : 'ring-1 ring-gray-200'
          }`}>
            <MapContainer
              center={[25.2048, 55.2708]}
              zoom={11}
              scrollWheelZoom={true}
              className="h-full w-full z-10"
              style={{ borderRadius: '1rem' }}
            >
              <MapStyleController 
                isDarkMode={isDarkMode} 
                currentStyle={mapStyles[mapStyle]}
                onStyleChange={setMapStyle}
              />

              {filteredLocations.map((location, index) => (
                <Marker
                  key={index}
                  position={[location.lat, location.lng]}
                  icon={createCustomIcon(location.icon, location.color)}
                  eventHandlers={{
                    click: () => setSelectedLocation(index),
                  }}
                >
                  <Popup
                    className="custom-popup"
                    closeButton={false}
                    maxWidth={320}
                  >
                    <div className="p-4">
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg"
                          style={{ backgroundColor: location.color }}
                        >
                          {location.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-1">
                            {location.name}
                          </h3>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            {location.category}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {location.description}
                      </p>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(location.details).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                              {key}
                            </div>
                            <div className="font-semibold text-gray-900">
                              {value}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <button 
                        className="w-full mt-4 py-2 rounded-lg font-medium transition-all duration-200 text-white shadow-lg hover:shadow-xl"
                        style={{ backgroundColor: location.color }}
                        onClick={() => {
                          window.open(`https://www.google.com/maps/search/${location.name}+Dubai`, '_blank');
                        }}
                      >
                        View on Google Maps
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Map Statistics */}
          <div className={`mt-4 grid grid-cols-4 gap-3`}>
            {[
              { label: 'Total Locations', value: locations.length, icon: '📍' },
              { label: 'Categories', value: categories.length, icon: '🏷️' },
              { label: 'Currently Showing', value: filteredLocations.length, icon: '👁️' },
              { label: 'Map Styles', value: Object.keys(mapStyles).length, icon: '🗺️' }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{stat.icon}</span>
                  <div>
                    <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {stat.value}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .custom-div-icon {
          background: transparent !important;
          border: none !important;
        }
        
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          padding: 0 !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        }
        
        .custom-popup .leaflet-popup-content {
          margin: 0 !important;
          width: 320px !important;
        }
        
        .custom-popup .leaflet-popup-tip {
          background: white !important;
          box-shadow: 0 3px 14px rgba(0,0,0,0.1) !important;
        }
        
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        }
        
        .leaflet-control-zoom a {
          background: white !important;
          border: none !important;
          color: #374151 !important;
          font-weight: bold !important;
          transition: all 0.2s ease !important;
        }
        
        .leaflet-control-zoom a:hover {
          background: #f3f4f6 !important;
          transform: scale(1.05) !important;
        }
      `}</style>
    </section>
  );
};

export default MapSection;