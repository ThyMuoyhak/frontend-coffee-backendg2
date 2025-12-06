const API_BASE_URL = 'http://localhost:8000/api/v1';

// Fetch all coffee products
export const fetchCoffeeProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return mock data if API is not available
    return getMockProducts();
  }
};

// Add item to cart via API
export const addToCartAPI = async (cartItem) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
    });
    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Mock data fallback
const getMockProducts = () => {
  return [
    {
      id: 1,
      name: "Mondulkiri Arabica",
      price: 4.50,
      image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Single origin from Cambodian highlands",
      category: "Hot Coffee",
      rating: 4.8,
      brew_time: "4-5 min",
      is_available: true,
      stock: 100
    },
    {
      id: 2,
      name: "Phnom Penh Cold Brew",
      price: 5.25,
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Smooth 12-hour cold extraction",
      category: "Cold Brew",
      rating: 4.9,
      brew_time: "12 hours",
      is_available: true,
      stock: 100
    },
    {
      id: 3,
      name: "Siem Reap Robusta",
      price: 3.75,
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Strong and bold traditional blend",
      category: "Hot Coffee",
      rating: 4.6,
      brew_time: "3-4 min",
      is_available: true,
      stock: 100
    },
    {
      id: 4,
      name: "Kampot Espresso",
      price: 4.95,
      image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Rich and intense espresso shot",
      category: "Espresso",
      rating: 4.7,
      brew_time: "2-3 min",
      is_available: true,
      stock: 100
    }
  ];
};