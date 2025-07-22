import { ArrowLeft, Heart } from 'lucide-react';
import { Property } from '@/types/property';
import { PropertyCard } from './PropertyCard';

interface FavoritesPageProps {
  favorites: Property[];
  onBack: () => void;
  onFavoriteToggle: (propertyId: string) => void;
  onRatingSubmit: (propertyId: string, rating: number) => void;
  onViewDetails: (property: Property) => void;
  userRatings: { [key: string]: number };
}

export const FavoritesPage = ({ 
  favorites, 
  onBack, 
  onFavoriteToggle, 
  onRatingSubmit, 
  onViewDetails,
  userRatings 
}: FavoritesPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={onBack}
            className="btn-glass p-3 rounded-full hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
              <Heart className="w-8 h-8 text-red-500 fill-current" />
              <span>My Favorites</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} saved
            </p>
          </div>
        </div>

        {/* Favorites List */}
        {favorites.length === 0 ? (
          <div className="glass-luxury rounded-2xl p-12 text-center">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No favorites yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Start browsing properties and add them to your favorites!
            </p>
            <button
              onClick={onBack}
              className="btn-gold"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onFavoriteToggle={onFavoriteToggle}
                onRatingSubmit={onRatingSubmit}
                onViewDetails={onViewDetails}
                isFavorited={true}
                userRating={userRatings[property.id] || 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};