import React, { useState, useEffect } from 'react';

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Artisan Coffee Experience",
      subtitle: "Handcrafted with Passion",
      description: "Discover our carefully sourced beans from the world's finest coffee regions",
      buttonText: "Explore Menu",
      buttonColor: "bg-amber-500 hover:bg-amber-600"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      title: "Seasonal Specials",
      subtitle: "New Autumn Collection",
      description: "Try our limited edition pumpkin spice and maple pecan creations",
      buttonText: "View Specials",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2056&q=80",
      title: "Brewing Masterclass",
      subtitle: "Learn from the Experts",
      description: "Join our coffee workshops and master the art of perfect brewing",
      buttonText: "Book Now",
      buttonColor: "bg-rose-600 hover:bg-rose-700"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2047&q=80",
      title: "Cozy Atmosphere",
      subtitle: "Your Perfect Workspace",
      description: "Comfortable seating, fast WiFi, and the perfect ambience for work or relaxation",
      buttonText: "Find Locations",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 relative"
          >
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-6 lg:px-12">
                <div className="max-w-2xl">
                  {/* Subtitle */}
                  <div className="inline-flex items-center space-x-2 mb-4">
                    <div className="w-12 h-0.5 bg-amber-400"></div>
                    <p className="text-amber-300 font-light tracking-widest text-sm uppercase">
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* Title */}
                  <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-lg">
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button className={`${slide.buttonColor} text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}>
                      {slide.buttonText}
                    </button>
                    <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-gray-900">
                      Learn More
                    </button>
                  </div>

                  {/* Additional Info */}
                  <div className="flex items-center space-x-6 mt-8">
                    <div className="flex items-center space-x-2 text-white/80">
                      <i className="fas fa-star text-amber-400"></i>
                      <span>4.9 Rating</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/80">
                      <i className="fas fa-clock text-amber-400"></i>
                      <span>Open 7AM-9PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <i className="fas fa-chevron-left text-lg"></i>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <i className="fas fa-chevron-right text-lg"></i>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-amber-400 w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-amber-400 transition-all duration-1000 ease-linear"
          style={{ 
            width: `${(currentSlide + 1) * (100 / slides.length)}%`,
            transition: 'width 5s linear'
          }}
        />
      </div>

      {/* Social Proof Badge */}
      <div className="absolute top-8 right-8 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 bg-amber-400 rounded-full border-2 border-white"></div>
              ))}
            </div>
            <div className="text-white">
              <p className="text-sm font-semibold">200+ Happy Customers</p>
              <p className="text-xs text-white/70">Today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;