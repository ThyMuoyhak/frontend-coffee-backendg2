import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { fetchCoffeeProducts } from '../services/api';

const CoffeeProduct = () => {
  const [quantities, setQuantities] = useState({});
  const [sugarLevels, setSugarLevels] = useState({});
  const [coffeeProducts, setCoffeeProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addToCart, cartItems } = useCart();

  // Fetch coffee products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchCoffeeProducts();
        setCoffeeProducts(products);
        
        // Initialize quantities and sugar levels
        const initialQuantities = {};
        const initialSugarLevels = {};
        products.forEach(product => {
          initialQuantities[product.id] = 0;
          initialSugarLevels[product.id] = 'regular';
        });
        setQuantities(initialQuantities);
        setSugarLevels(initialSugarLevels);
        
      } catch (err) {
        setError('Failed to load products');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const handleSugarChange = (productId, level) => {
    setSugarLevels(prev => ({
      ...prev,
      [productId]: level
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const sugarLevel = sugarLevels[product.id] || 'regular';
    
    if (quantity === 0) {
      alert('Please select at least 1 quantity');
      return;
    }

    // Use the context function to add to cart
    addToCart(product, quantity, sugarLevel);

    // Show success message
    alert(`${quantity} ${product.name} added to cart!`);
    
    // Reset quantities and sugar levels for this product
    setQuantities(prev => ({ ...prev, [product.id]: 0 }));
    setSugarLevels(prev => ({ ...prev, [product.id]: 'regular' }));
  };

  const sugarOptions = [
    { value: 'no-sugar', label: 'No Sugar', icon: 'fa-times' },
    { value: 'less-sugar', label: 'Less Sugar', icon: 'fa-minus' },
    { value: 'regular', label: 'Regular', icon: 'fa-check' },
    { value: 'extra-sugar', label: 'Extra Sugar', icon: 'fa-plus' }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-amber-600">Coffee</span> Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover authentic Cambodian coffee blends crafted with passion and tradition
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            <span className="ml-3 text-gray-600">Loading products...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-amber-600">Coffee</span> Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover authentic Cambodian coffee blends crafted with passion and tradition
            </p>
          </div>
          <div className="text-center py-12">
            <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
            <p className="text-red-500 text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-amber-600">Coffee</span> Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover authentic Cambodian coffee blends crafted with passion and tradition
          </p>
        </div>

        {/* Products Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {coffeeProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${product.price}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur-sm text-amber-600 px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                    <i className="fas fa-star text-amber-400 mr-1"></i>
                    {product.rating}
                  </span>
                </div>
                {!product.is_available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <i className="fas fa-clock text-amber-500 mr-1"></i>
                    {product.brew_time || product.brewTime}
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-fire text-amber-500 mr-1"></i>
                    {product.stock} in stock
                  </div>
                </div>

                {/* Sugar Level Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sugar Level:
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {sugarOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSugarChange(product.id, option.value)}
                        disabled={!product.is_available}
                        className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                          sugarLevels[product.id] === option.value
                            ? 'bg-amber-500 text-white shadow-md'
                            : product.is_available
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <i className={`fas ${option.icon} mb-1 block`}></i>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold text-gray-700">
                    Quantity:
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(product.id, -1)}
                      disabled={!product.is_available}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      <i className="fas fa-minus text-sm"></i>
                    </button>
                    
                    <span className="font-semibold text-gray-900 min-w-8 text-center">
                      {quantities[product.id] || 0}
                    </span>
                    
                    <button
                      onClick={() => handleQuantityChange(product.id, 1)}
                      disabled={!product.is_available}
                      className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      <i className="fas fa-plus text-sm"></i>
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!quantities[product.id] || quantities[product.id] === 0 || !product.is_available}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    quantities[product.id] && quantities[product.id] > 0 && product.is_available
                      ? 'bg-amber-500 hover:bg-amber-600 text-white transform hover:scale-105'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <i className="fas fa-shopping-cart"></i>
                  <span>
                    {!product.is_available 
                      ? 'Out of Stock'
                      : quantities[product.id] && quantities[product.id] > 0
                      ? `Add ${quantities[product.id]} to Cart`
                      : 'Add to Cart'
                    }
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {cartItems && cartItems.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Cart Summary ({cartItems.length} items)
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">
                  Total: <span className="font-bold text-amber-600">
                    ${cartItems.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                  </span>
                </p>
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoffeeProduct;