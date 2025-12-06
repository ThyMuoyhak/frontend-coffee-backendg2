import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-amber-500 rounded-2xl">
                <i className="fas fa-mug-hot text-white text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold">
                Brew<span className="text-amber-500">Haven</span>
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Serving the finest Cambodian coffee blends since 2010. 
              Experience the rich flavors and traditions of Khmer coffee culture.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center">
              <i className="fas fa-link text-amber-500 mr-2"></i>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-300 hover:text-amber-400 transition-colors flex items-center space-x-2">
                  <i className="fas fa-chevron-right text-amber-500 text-xs"></i>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#menu" className="text-gray-300 hover:text-amber-400 transition-colors flex items-center space-x-2">
                  <i className="fas fa-chevron-right text-amber-500 text-xs"></i>
                  <span>Our Menu</span>
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-amber-400 transition-colors flex items-center space-x-2">
                  <i className="fas fa-chevron-right text-amber-500 text-xs"></i>
                  <span>Our Story</span>
                </a>
              </li>
              <li>
                <a href="#locations" className="text-gray-300 hover:text-amber-400 transition-colors flex items-center space-x-2">
                  <i className="fas fa-chevron-right text-amber-500 text-xs"></i>
                  <span>Locations</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-amber-400 transition-colors flex items-center space-x-2">
                  <i className="fas fa-chevron-right text-amber-500 text-xs"></i>
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center">
              <i className="fas fa-map-marker-alt text-amber-500 mr-2"></i>
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt text-amber-500 mt-1"></i>
                <div>
                  <p className="font-semibold">Main Branch</p>
                  <p className="text-gray-300 text-sm">123 Coffee Street, Phnom Penh, Cambodia</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-phone text-amber-500"></i>
                <div>
                  <p className="text-gray-300">+855 12 345 678</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-envelope text-amber-500"></i>
                <div>
                  <p className="text-gray-300">hello@brewhaven.com</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-clock text-amber-500"></i>
                <div>
                  <p className="text-gray-300">Open Daily: 7:00 AM - 9:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center">
              <i className="fas fa-newspaper text-amber-500 mr-2"></i>
              Newsletter
            </h4>
            <p className="text-gray-300 mb-4">
              Subscribe to get updates on new blends and special offers.
            </p>
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2">
                <i className="fas fa-paper-plane"></i>
                <span>Subscribe</span>
              </button>
            </div>
            <div className="mt-6 p-4 bg-gray-800 rounded-xl">
              <div className="flex items-center space-x-3">
                <i className="fas fa-award text-amber-500 text-2xl"></i>
                <div>
                  <p className="font-semibold">Award Winning</p>
                  <p className="text-gray-300 text-sm">Best Coffee 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div>
              <p className="text-gray-400 text-sm mb-2">We Accept</p>
              <div className="flex space-x-3">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <i className="fab fa-cc-visa text-blue-600"></i>
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <i className="fab fa-cc-mastercard text-red-600"></i>
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <i className="fab fa-cc-paypal text-blue-500"></i>
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <i className="fab fa-cc-apple-pay text-black"></i>
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <p className="text-gray-400 text-sm mb-2">Download Our App</p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center space-x-2 transition-colors">
                  <i className="fab fa-apple"></i>
                  <span className="text-sm">App Store</span>
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center space-x-2 transition-colors">
                  <i className="fab fa-google-play"></i>
                  <span className="text-sm">Play Store</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              <p>&copy; 2024 BrewHaven Coffee. All rights reserved.</p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
          <i className="fab fa-whatsapp text-white text-2xl"></i>
        </button>
      </div>
    </footer>
  );
};

export default Footer;