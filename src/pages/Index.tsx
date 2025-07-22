import { useState, useEffect } from 'react';
import { Property, FilterState, UserRating } from '@/types/property';
import { properties } from '@/data/properties';
import { Header } from '@/components/Header';
import { FilterSection } from '@/components/FilterSection';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyModal } from '@/components/PropertyModal';
import { FavoritesPage } from '@/components/FavoritesPage';
import { ContactSection } from '@/components/ContactSection';
import { Building2, Zap } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'favorites'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    category: 'buy',
    type: '',
    location: '',
    minPrice: 0,
    maxPrice: 0
  });

  // User data stored in localStorage
  const [favorites, setFavorites] = useState<string[]>([]);
  const [userRatings, setUserRatings] = useState<{ [key: string]: number }>({});

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('dharti_favorites');
    const savedRatings = localStorage.getItem('dharti_ratings');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    if (savedRatings) {
      setUserRatings(JSON.parse(savedRatings));
    }

    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Save favorites to localStorage
  const saveFavorites = (newFavorites: string[]) => {
    setFavorites(newFavorites);
    localStorage.setItem('dharti_favorites', JSON.stringify(newFavorites));
  };

  // Save ratings to localStorage
  const saveRating = (propertyId: string, rating: number) => {
    const newRatings = { ...userRatings, [propertyId]: rating };
    setUserRatings(newRatings);
    localStorage.setItem('dharti_ratings', JSON.stringify(newRatings));
  };

  // Filter properties based on current filters
  const filteredProperties = properties.filter(property => {
    if (property.category !== filters.category) return false;
    if (filters.type && property.type !== filters.type) return false;
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.minPrice > 0 && property.price < filters.minPrice) return false;
    if (filters.maxPrice > 0 && property.price > filters.maxPrice) return false;
    return true;
  });

  // Get favorite properties
  const favoriteProperties = properties.filter(property => 
    favorites.includes(property.id)
  );

  // Handle favorite toggle
  const handleFavoriteToggle = (propertyId: string) => {
    const newFavorites = favorites.includes(propertyId)
      ? favorites.filter(id => id !== propertyId)
      : [...favorites, propertyId];
    saveFavorites(newFavorites);
  };

  // Handle rating submission
  const handleRatingSubmit = (propertyId: string, rating: number) => {
    saveRating(propertyId, rating);
  };

  // Handle property detail view
  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  // Handle category change (Buy/Rent toggle)
  const handleCategoryChange = (category: 'buy' | 'rent') => {
    setFilters(prev => ({ ...prev, category }));
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-6">
            <Building2 className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse-glow" />
          </div>
          <h1 className="text-4xl font-bold mb-4 logo-shimmer">
            DHARTI
          </h1>
          <p className="text-muted-foreground mb-6">Loading luxury properties...</p>
          <div className="loading-spinner mx-auto" />
        </div>
      </div>
    );
  }

  // Render favorites page
  if (currentView === 'favorites') {
    return (
      <FavoritesPage
        favorites={favoriteProperties}
        onBack={() => setCurrentView('home')}
        onFavoriteToggle={handleFavoriteToggle}
        onRatingSubmit={handleRatingSubmit}
        onViewDetails={handleViewDetails}
        userRatings={userRatings}
      />
    );
  }

  // Main home page
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        category={filters.category}
        onCategoryChange={handleCategoryChange}
        onShowFavorites={() => setCurrentView('favorites')}
        favoritesCount={favorites.length}
      />

      <main>
        {/* Hero Section with Premium Background */}
        <section className="relative py-20 px-4 overflow-hidden">
          {/* Luxury Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background opacity-90" />
          <div className="absolute inset-0 glass-luxury opacity-30" />
          
          {/* Hero Content */}
          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-poppins font-black mb-8 relative">
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse-glow">
                Find Your Dream Property
              </span>
              <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full -z-10" />
            </h2>
            <div className="glass-luxury rounded-2xl p-8 max-w-4xl mx-auto mb-10 backdrop-blur-xl">
              <p className="text-xl md:text-2xl text-foreground font-urbanist font-medium leading-relaxed">
                Discover luxury real estate with premium locations, world-class amenities, 
                and exceptional service. Your perfect home is just a click away.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-primary">
              <div className="glass rounded-xl px-6 py-3 flex items-center space-x-3">
                <Zap className="w-6 h-6" />
                <span className="font-semibold text-lg">Instant Search</span>
              </div>
              <div className="glass rounded-xl px-6 py-3 flex items-center space-x-3">
                <Building2 className="w-6 h-6" />
                <span className="font-semibold text-lg">Premium Properties</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="px-4 pb-8">
          <div className="container mx-auto">
            <FilterSection
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>
        </section>

        {/* Properties Grid */}
        <section className="px-4 pb-16">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold text-foreground">
                {filters.category === 'buy' ? 'Properties for Sale' : 'Properties for Rent'}
              </h3>
              <p className="text-muted-foreground">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
              </p>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="glass-luxury rounded-2xl p-12 text-center">
                <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  No properties found
                </h4>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={() => setFilters({
                    category: filters.category,
                    type: '',
                    location: '',
                    minPrice: 0,
                    maxPrice: 0
                  })}
                  className="btn-gold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property, index) => (
                  <div
                    key={property.id}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <PropertyCard
                      property={property}
                      onFavoriteToggle={handleFavoriteToggle}
                      onRatingSubmit={handleRatingSubmit}
                      onViewDetails={handleViewDetails}
                      isFavorited={favorites.includes(property.id)}
                      userRating={userRatings[property.id] || 0}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Property Details Modal */}
      <PropertyModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRatingSubmit={handleRatingSubmit}
        userRating={selectedProperty ? userRatings[selectedProperty.id] || 0 : 0}
      />

      {/* Footer */}
      <footer className="glass-luxury py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold logo-shimmer mb-4">DHARTI</h3>
          <p className="text-muted-foreground mb-4">
            Luxury Real Estate • Premium Properties • Exceptional Service
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 DHARTI Real Estate. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
