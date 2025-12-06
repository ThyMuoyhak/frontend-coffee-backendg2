import React from 'react';

const Brand = () => {
  const cambodianCoffeeBrands = [
    {
      id: 1,
      name: "Brown Coffee",
      logo: "https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      description: "Phnom Penh's premium coffee chain offering specialty blends from Mondulkiri highlands",
      established: "2009",
      specialty: "Espresso Blends",
      origin: "Mondulkiri Province",
      popular: "Brown Coffee Signature Blend"
    },
    {
      id: 2,
      name: "Coffeedesk",
      logo: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      description: "Modern coffee roastery focusing on single-origin Cambodian beans",
      established: "2015",
      specialty: "Single Origin",
      origin: "Ratanakiri Province",
      popular: "Ratanakiri Arabica"
    },
    {
      id: 3,
      name: "Mondulkiri Coffee",
      logo: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      description: "Direct from Cambodia's highlands, supporting local hill tribe communities",
      established: "2012",
      specialty: "Organic Coffee",
      origin: "Mondulkiri Highlands",
      popular: "Mondulkiri Wild Forest"
    },
    {
      id: 4,
      name: "Feel Good Coffee",
      logo: "https://images.unsplash.com/photo-1587080413959-06b859fb1071?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      description: "Social enterprise supporting Cambodian coffee farmers and sustainable practices",
      established: "2016",
      specialty: "Sustainable Coffee",
      origin: "Various Cambodian Regions",
      popular: "Phnom Penh Roast"
    },
    {
      id: 5,
      name: "Cafe Amazon Cambodia",
      logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      description: "Local adaptation featuring Cambodian-grown coffee beans",
      established: "2018",
      specialty: "Traditional Brews",
      origin: "Kampot Province",
      popular: "Kampot Pepper Coffee"
    },
    {
      id: 6,
      name: "Java Creative Cafe",
      logo: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      description: "Artisanal coffee house promoting Cambodian art and local coffee culture",
      established: "2014",
      specialty: "Creative Blends",
      origin: "Takeo Province",
      popular: "Angkor Wat Blend"
    }
  ];

  const cambodianCoffeeFacts = {
    regions: ["Mondulkiri", "Ratanakiri", "Kampot", "Takeo"],
    characteristics: "Rich, earthy tones with chocolate and spice notes",
    altitude: "400-1100 meters above sea level",
    harvest: "November to February",
    uniqueAspect: "Grown in volcanic soil with tropical climate"
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100 py-20">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-16 h-1 bg-amber-500"></div>
            <span className="text-amber-600 font-semibold tracking-widest text-sm uppercase">
              Khmer Coffee Heritage
            </span>
            <div className="w-16 h-1 bg-amber-500"></div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Authentic <span className="text-amber-600">Cambodian</span> Coffee Brands
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the rich flavors of Cambodia's growing coffee scene. 
            From the highlands of Mondulkiri to the bustling cafes of Phnom Penh, 
            experience unique blends that tell the story of Khmer coffee culture.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {cambodianCoffeeBrands.map((brand) => (
            <div 
              key={brand.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Brand Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-mug-hot text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{brand.name}</h3>
                    <p className="text-amber-600 text-sm">Est. {brand.established}</p>
                  </div>
                </div>
              </div>

              {/* Brand Details */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {brand.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <i className="fas fa-mountain text-amber-500"></i>
                    <span className="text-gray-700"><strong>Origin:</strong> {brand.origin}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-sm">
                    <i className="fas fa-star text-amber-500"></i>
                    <span className="text-gray-700"><strong>Specialty:</strong> {brand.specialty}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-sm">
                    <i className="fas fa-fire text-amber-500"></i>
                    <span className="text-gray-700"><strong>Popular:</strong> {brand.popular}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6">
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg">
                  Explore {brand.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cambodian Coffee Facts */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Cambodian Coffee <span className="text-amber-600">Characteristics</span>
            </h3>
            <p className="text-gray-600 text-lg">
              What makes Cambodian coffee unique in Southeast Asia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors duration-300">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-map-marker-alt text-white"></i>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Growing Regions</h4>
              <p className="text-gray-600 text-sm">
                {cambodianCoffeeFacts.regions.join(", ")}
              </p>
            </div>

            <div className="text-center p-6 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors duration-300">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-wine-glass-alt text-white"></i>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Flavor Profile</h4>
              <p className="text-gray-600 text-sm">
                {cambodianCoffeeFacts.characteristics}
              </p>
            </div>

            <div className="text-center p-6 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors duration-300">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-mountain text-white"></i>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Altitude</h4>
              <p className="text-gray-600 text-sm">
                {cambodianCoffeeFacts.altitude}
              </p>
            </div>

            <div className="text-center p-6 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors duration-300">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-seedling text-white"></i>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Unique Aspect</h4>
              <p className="text-gray-600 text-sm">
                {cambodianCoffeeFacts.uniqueAspect}
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Taste the Flavors of Cambodia
            </h3>
            <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
              Join us in celebrating Cambodia's emerging coffee culture. 
              Each cup tells a story of tradition, innovation, and the rich soils of the Kingdom of Wonder.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Visit Our Cambodian Collection
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-amber-600 transition-all duration-300">
                Learn About Khmer Coffee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;