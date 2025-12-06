import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './components/Header';
import Slideshow from './components/Slideshow';
import Brand from './components/Brand';
import CoffeeProduct from './components/CoffeeProduct';
import { CartProvider } from './context/CartContext';
import Footer from './components/Footer';

// Create a simple routing system without react-router-dom
const App = () => {
  const [currentPage, setCurrentPage] = React.useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return (
          <div className="pt-20">
            <CoffeeProduct />
          </div>
        );
      case 'home':
      default:
        return (
          <>
            <Slideshow />
            <CoffeeProduct />
            <Brand />
          </>
        );
    }
  };

  return (
    <CartProvider>
      <div className="App">
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
        {renderPage()}
        <Footer onNavigate={setCurrentPage} />
      </div>
    </CartProvider>
  );
};

export default App;