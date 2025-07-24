import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

interface HeaderProps {
  category: 'buy' | 'rent';
  onCategoryChange: (category: 'buy' | 'rent') => void;
  onShowFavorites: () => void;
  favoritesCount: number;
}

export const Header = ({ category, onCategoryChange, onShowFavorites, favoritesCount }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-luxury">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Animated Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold logo-shimmer animate-pulse-glow animate-float relative">
              DHARTI
              <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-lg -z-10 animate-glow-pulse" />
            </h1>
            <span className="hidden md:block text-sm text-muted-foreground">
              Luxury Real Estate
            </span>
          </div>

          {/* Buy/Rent Toggle - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center bg-muted rounded-xl p-1">
              <button
                onClick={() => onCategoryChange('buy')}
                className={`px-6 py-2 rounded-lg transition-all duration-300 font-semibold ${
                  category === 'buy' 
                    ? 'btn-gold text-primary-foreground' 
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => onCategoryChange('rent')}
                className={`px-6 py-2 rounded-lg transition-all duration-300 font-semibold ${
                  category === 'rent' 
                    ? 'btn-gold text-primary-foreground' 
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                Rent
              </button>
            </div>

            {/* Favorites Button */}
            <button
              onClick={onShowFavorites}
              className="relative btn-glass flex items-center space-x-2 hover:text-primary"
            >
              <Heart className="w-5 h-5" />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden btn-glass p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center bg-muted rounded-xl p-1">
                <button
                  onClick={() => {
                    onCategoryChange('buy');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-2 rounded-lg transition-all duration-300 font-semibold ${
                    category === 'buy' 
                      ? 'btn-gold text-primary-foreground' 
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => {
                    onCategoryChange('rent');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-2 rounded-lg transition-all duration-300 font-semibold ${
                    category === 'rent' 
                      ? 'btn-gold text-primary-foreground' 
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  Rent
                </button>
              </div>

              <button
                onClick={() => {
                  onShowFavorites();
                  setMobileMenuOpen(false);
                }}
                className="btn-glass flex items-center justify-center space-x-2 w-full py-3"
              >
                <Heart className="w-5 h-5" />
                <span>Favorites ({favoritesCount})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};