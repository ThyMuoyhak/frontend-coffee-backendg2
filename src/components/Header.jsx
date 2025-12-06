import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import CheckoutForm from './CheckoutForm';

const Header = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Use cart context
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartItemCount, 
    cartTotal 
  } = useCart();

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen || showCheckout) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, showCheckout]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setShowCheckout(true);
  };

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleOrderSuccess = () => {
    setShowCheckout(false);
    // You can add additional success actions here
    // like showing a success message or redirecting
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2' 
          : 'bg-gradient-to-r from-gray-900 to-gray-800 py-4'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button 
              onClick={() => handleNavigation('home')}
              className="flex items-center space-x-3"
            >
              <div className={`p-2 rounded-2xl transition-all duration-500 ${
                isScrolled 
                  ? 'bg-amber-500 shadow-lg shadow-amber-500/25' 
                  : 'bg-white/10 backdrop-blur-sm'
              }`}>
                <i className={`fas fa-mug-hot text-xl ${
                  isScrolled ? 'text-white' : 'text-amber-300'
                }`}></i>
              </div>
              <h1 className={`text-2xl font-bold transition-colors duration-500 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Brew<span className="text-amber-500">Haven</span>
              </h1>
            </button>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={() => handleNavigation('home')}
                className={`font-medium transition-all duration-300 hover:text-amber-500 flex items-center space-x-2 ${
                  isScrolled ? 'text-gray-700 hover:scale-105' : 'text-white/90'
                } ${
                  currentPage === 'home' ? 'text-amber-500' : ''
                }`}
              >
                <i className="fas fa-home text-sm"></i>
                <span>Home</span>
              </button>
              <button 
                onClick={() => handleNavigation('menu')}
                className={`font-medium transition-all duration-300 hover:text-amber-500 flex items-center space-x-2 ${
                  isScrolled ? 'text-gray-700 hover:scale-105' : 'text-white/90'
                } ${
                  currentPage === 'menu' ? 'text-amber-500' : ''
                }`}
              >
                <i className="fas fa-coffee text-sm"></i>
                <span>Menu</span>
              </button>
              <button 
                onClick={() => handleNavigation('home')}
                className={`font-medium transition-all duration-300 hover:text-amber-500 flex items-center space-x-2 ${
                  isScrolled ? 'text-gray-700 hover:scale-105' : 'text-white/90'
                }`}
              >
                <i className="fas fa-book-open text-sm"></i>
                <span>Story</span>
              </button>
              <button 
                onClick={() => handleNavigation('home')}
                className={`font-medium transition-all duration-300 hover:text-amber-500 flex items-center space-x-2 ${
                  isScrolled ? 'text-gray-700 hover:scale-105' : 'text-white/90'
                }`}
              >
                <i className="fas fa-map-marker-alt text-sm"></i>
                <span>Locations</span>
              </button>
              <button 
                onClick={() => handleNavigation('home')}
                className={`font-medium transition-all duration-300 hover:text-amber-500 flex items-center space-x-2 ${
                  isScrolled ? 'text-gray-700 hover:scale-105' : 'text-white/90'
                }`}
              >
                <i className="fas fa-phone text-sm"></i>
                <span>Contact</span>
              </button>
            </nav>
            
            {/* CTA & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Cart Icon */}
              <div className="relative">
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className={`p-3 rounded-xl transition-all duration-300 relative ${
                    isScrolled 
                      ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
                      : 'bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
                  }`}
                >
                  <i className="fas fa-shopping-cart text-lg"></i>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Order Now Button */}
              <button 
                onClick={() => handleNavigation('menu')}
                className={`hidden lg:flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-500 hover:scale-105 ${
                  isScrolled
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30 hover:bg-amber-600'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                <i className="fas fa-bolt"></i>
                <span>Order Now</span>
                <i className="fas fa-arrow-right text-sm"></i>
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
                    : 'bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 mt-4' 
              : 'max-h-0 opacity-0'
          }`}>
            <div className={`py-6 px-4 rounded-2xl backdrop-blur-lg border ${
              isScrolled
                ? 'bg-white/95 border-gray-200'
                : 'bg-white/10 border-white/20'
            }`}>
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => handleNavigation('home')}
                  className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                    isScrolled
                      ? 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                      : 'text-white hover:bg-white/20'
                  } ${
                    currentPage === 'home' ? (isScrolled ? 'bg-amber-50 text-amber-600' : 'bg-white/20') : ''
                  }`}
                >
                  <i className="fas fa-home w-5 text-center"></i>
                  <span>Home</span>
                </button>
                <button 
                  onClick={() => handleNavigation('menu')}
                  className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                    isScrolled
                      ? 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                      : 'text-white hover:bg-white/20'
                  } ${
                    currentPage === 'menu' ? (isScrolled ? 'bg-amber-50 text-amber-600' : 'bg-white/20') : ''
                  }`}
                >
                  <i className="fas fa-coffee w-5 text-center"></i>
                  <span>Menu</span>
                </button>
                <button 
                  onClick={() => handleNavigation('home')}
                  className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                    isScrolled
                      ? 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <i className="fas fa-book-open w-5 text-center"></i>
                  <span>Story</span>
                </button>
                <button 
                  onClick={() => handleNavigation('home')}
                  className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                    isScrolled
                      ? 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <i className="fas fa-map-marker-alt w-5 text-center"></i>
                  <span>Locations</span>
                </button>
                <button 
                  onClick={() => handleNavigation('home')}
                  className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                    isScrolled
                      ? 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <i className="fas fa-phone w-5 text-center"></i>
                  <span>Contact</span>
                </button>
                <button 
                  onClick={() => handleNavigation('menu')}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 mt-2 flex items-center justify-center space-x-2 ${
                    isScrolled
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <i className="fas fa-mobile-alt"></i>
                  <span>Order Online</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={handleCloseCart}
          ></div>
          
          {/* Sidebar */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <i className="fas fa-shopping-cart text-amber-500"></i>
                  <span>Your Cart ({cartItemCount})</span>
                </h2>
                <button 
                  onClick={handleCloseCart}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
                    <p className="text-gray-400">Add some delicious coffee to get started!</p>
                    <button 
                      onClick={() => {
                        handleCloseCart();
                        handleNavigation('menu');
                      }}
                      className="mt-6 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div 
                        key={`${item.id}-${item.sugarLevel}-${index}`}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-600 flex items-center space-x-1 mt-1">
                            <i className="fas fa-cube text-amber-500"></i>
                            <span>Sugar: {item.sugarLevel}</span>
                          </p>
                          <p className="text-amber-600 font-bold text-sm mt-1">
                            ${item.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs hover:bg-gray-300 transition-colors"
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="font-semibold text-gray-900 min-w-6 text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-amber-600 transition-colors"
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700 flex items-center space-x-2">
                      <i className="fas fa-receipt"></i>
                      <span>Total:</span>
                    </span>
                    <span className="text-2xl font-bold text-amber-600">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={clearCart}
                      className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                    >
                      <i className="fas fa-broom"></i>
                      <span>Clear All</span>
                    </button>
                    <button 
                      onClick={handleCheckout}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <i className="fas fa-credit-card"></i>
                      <span>Checkout</span>
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Free delivery on orders over $15
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Form Overlay */}
      {showCheckout && (
        <CheckoutForm 
          onClose={() => setShowCheckout(false)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}
    </>
  );
}

export default Header;