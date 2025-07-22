import { useState, useEffect } from 'react';
import { Heart, Star, Bed, Bath, Car, MapPin, Eye } from 'lucide-react';
import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
  onFavoriteToggle: (propertyId: string) => void;
  onRatingSubmit: (propertyId: string, rating: number) => void;
  onViewDetails: (property: Property) => void;
  isFavorited: boolean;
  userRating?: number;
}

export const PropertyCard = ({ 
  property, 
  onFavoriteToggle, 
  onRatingSubmit, 
  onViewDetails,
  isFavorited, 
  userRating = 0 
}: PropertyCardProps) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [showRating, setShowRating] = useState(false);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    }
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const handleStarClick = (rating: number) => {
    onRatingSubmit(property.id, rating);
    setShowRating(false);
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`star ${interactive ? 'cursor-pointer' : ''} ${
          i < (interactive ? hoveredStar || rating : rating) 
            ? 'text-primary fill-current' 
            : 'text-muted-foreground'
        }`}
        size={16}
        onClick={interactive ? () => handleStarClick(i + 1) : undefined}
        onMouseEnter={interactive ? () => setHoveredStar(i + 1) : undefined}
        onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
      />
    ));
  };

  return (
    <div className="property-card group animate-fade-in-up">
      {/* Property Image */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Favorite Button */}
        <button
          onClick={() => onFavoriteToggle(property.id)}
          className={`absolute top-3 right-3 heart-button ${isFavorited ? 'favorited' : 'text-white'}`}
          style={{ textShadow: '0 0 10px rgba(0,0,0,0.7)' }}
        >
          <Heart className={`w-6 h-6 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3 btn-gold text-xs px-3 py-1 rounded-full font-semibold">
          {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3 glass text-white px-3 py-1 rounded-lg font-bold">
          {formatPrice(property.price)}
          {property.category === 'rent' && (
            <span className="text-xs ml-1">/month</span>
          )}
        </div>
      </div>

      {/* Property Details */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{property.location}</span>
        </div>

        {/* Property Features */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          {property.bedrooms && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.parking && (
            <div className="flex items-center">
              <Car className="w-4 h-4 mr-1" />
              <span>Parking</span>
            </div>
          )}
          <div className="flex items-center">
            <span>{property.area} sq ft</span>
          </div>
        </div>

        {/* Rating Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="star-rating">
              {renderStars(property.rating)}
            </div>
            <span className="text-sm text-muted-foreground">
              ({property.rating.toFixed(1)})
            </span>
          </div>

          <button
            onClick={() => setShowRating(!showRating)}
            className="text-xs text-primary hover:text-primary/80 font-medium"
          >
            Rate Property
          </button>
        </div>

        {/* User Rating Input */}
        {showRating && (
          <div className="glass p-3 rounded-lg animate-fade-in-up">
            <p className="text-sm text-foreground mb-2">Your Rating:</p>
            <div className="star-rating">
              {renderStars(userRating, true)}
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {property.description}
        </p>

        {/* Action Button */}
        <button
          onClick={() => onViewDetails(property)}
          className="w-full btn-gold flex items-center justify-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
};