import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const CheckoutForm = ({ onClose, onOrderSuccess }) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    deliveryAddress: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [khqrData, setKhqrData] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending', 'processing', 'paid', 'failed'
  const [statusCheckInterval, setStatusCheckInterval] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to check payment status
  const checkPaymentStatus = async (orderNumber) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/khqr/status/${orderNumber}`);
      if (!response.ok) {
        throw new Error('Failed to check payment status');
      }
      
      const statusData = await response.json();
      console.log('Payment status:', statusData);
      
      setPaymentStatus(statusData.payment_status);
      
      if (statusData.payment_status === 'paid') {
        // Payment successful!
        clearStatusCheck();
        clearCart();
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking payment status:', error);
      return false;
    }
  };

  // Start checking payment status periodically
  const startStatusCheck = (orderNumber) => {
    const interval = setInterval(async () => {
      const isPaid = await checkPaymentStatus(orderNumber);
      if (isPaid) {
        clearInterval(interval);
      }
    }, 3000); // Check every 3 seconds
    
    setStatusCheckInterval(interval);
  };

  // Clear the status check interval
  const clearStatusCheck = () => {
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
      setStatusCheckInterval(null);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      clearStatusCheck();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Create order first
      const orderResponse = await fetch('http://localhost:8000/api/v1/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: formData.fullName,
          phone_number: formData.phoneNumber,
          delivery_address: formData.deliveryAddress,
          items: cartItems,
          total_amount: cartTotal,
          currency: 'USD'
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const order = await orderResponse.json();
      setCurrentOrder(order);

      // Generate KHQR payment
      const khqrResponse = await fetch('http://localhost:8000/api/v1/khqr/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: cartTotal,
          currency: 'USD',
          order_number: order.order_number
        })
      });

      if (!khqrResponse.ok) {
        throw new Error('Failed to generate KHQR');
      }

      const khqr = await khqrResponse.json();
      setKhqrData(khqr);

      // Start checking payment status
      startStatusCheck(order.order_number);

    } catch (error) {
      console.error('Checkout error:', error);
      setPaymentStatus('failed');
      alert('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentComplete = async () => {
    if (!currentOrder) return;

    const isPaid = await checkPaymentStatus(currentOrder.order_number);
    if (isPaid) {
      alert('Payment successful! Your order is being prepared.');
      clearCart();
      onOrderSuccess();
      onClose();
    } else {
      alert('Payment not yet confirmed. Please wait or try again.');
    }
  };

  const openBakongApp = () => {
    if (khqrData?.deeplink) {
      window.open(khqrData.deeplink, '_blank');
    }
  };

  const handleClose = () => {
    clearStatusCheck();
    onClose();
  };

  // Payment Success Screen
  if (paymentStatus === 'paid') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full">
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-check text-white text-2xl"></i>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for your order. Your payment has been confirmed.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Order Number:</span>
                <span className="font-semibold">{currentOrder?.order_number}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Paid:</span>
                <span className="text-green-600 font-bold">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button
              onClick={() => {
                clearCart();
                onOrderSuccess();
                onClose();
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // KHQR Payment Screen
  if (khqrData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {paymentStatus === 'processing' ? 'Processing Payment...' : 'KHQR Payment'}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <i className="fas fa-times text-gray-500"></i>
              </button>
            </div>

            {/* Payment Status Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className={`flex items-center ${paymentStatus === 'processing' || paymentStatus === 'paid' ? 'text-green-500' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStatus === 'processing' || paymentStatus === 'paid' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                    {paymentStatus === 'paid' ? (
                      <i className="fas fa-check text-xs"></i>
                    ) : (
                      <span className="text-sm">1</span>
                    )}
                  </div>
                  <span className="ml-2 text-sm font-medium">Scan QR</span>
                </div>
                
                <div className={`flex-1 h-1 ${paymentStatus === 'processing' || paymentStatus === 'paid' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                
                <div className={`flex items-center ${paymentStatus === 'paid' ? 'text-green-500' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStatus === 'paid' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                    {paymentStatus === 'paid' ? (
                      <i className="fas fa-check text-xs"></i>
                    ) : (
                      <span className="text-sm">2</span>
                    )}
                  </div>
                  <span className="ml-2 text-sm font-medium">Payment</span>
                </div>
              </div>
              
              {paymentStatus === 'processing' && (
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                    <i className="fas fa-spinner fa-spin"></i>
                    <span className="text-sm">Waiting for payment confirmation...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-600 mb-4">
                Scan the QR code with Bakong app to complete your payment
              </p>
              
              {khqrData.qr_image ? (
                <div className="mb-4 p-4 bg-white rounded-lg border-2 border-gray-200">
                  <img 
                    src={khqrData.qr_image} 
                    alt="KHQR Code" 
                    className="w-64 h-64 mx-auto"
                  />
                </div>
              ) : (
                <div className="mb-4 p-8 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                  <i className="fas fa-qrcode text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500 text-sm">Demo QR Code</p>
                  <p className="text-gray-400 text-xs mt-1">Order: {currentOrder?.order_number}</p>
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Order Total:</span>
                  <span className="text-2xl font-bold text-amber-600">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Order #:</span>
                  <span className="font-mono">{currentOrder?.order_number}</span>
                </div>
              </div>

              <button
                onClick={openBakongApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors mb-3 flex items-center justify-center space-x-2"
              >
                <i className="fas fa-mobile-alt"></i>
                <span>Open in Bakong App</span>
              </button>

              <button
                onClick={handlePaymentComplete}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <i className="fas fa-check-circle"></i>
                <span>I've Completed Payment</span>
              </button>

              <p className="text-xs text-gray-500 mt-4">
                After payment, the status will update automatically, or click "I've Completed Payment" to check manually
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Checkout Form Screen
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <i className="fas fa-times text-gray-500"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="855 12 345 678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address *
              </label>
              <textarea
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="Enter your complete delivery address"
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
              <div className="space-y-2">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-3 pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span className="text-amber-600">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <i className="fas fa-info-circle text-blue-500 mt-1"></i>
                <div className="text-sm text-blue-700">
                  <p className="font-semibold">KHQR Payment</p>
                  <p>You'll be redirected to scan a QR code with Bakong app after submitting this form.</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing || cartItems.length === 0}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-400 text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-credit-card"></i>
                  <span>Proceed to KHQR Payment</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;