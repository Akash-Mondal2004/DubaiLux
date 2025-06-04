import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = ({ isDarkMode, newsletter, setNewsletter }) => {
  return (
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
  );
};

export default Footer;