import { useState } from 'react';
import { X, Star, Bed, Bath, Car, MapPin, Share, MessageCircle } from 'lucide-react';
import { Property } from '@/types/property';

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onRatingSubmit: (propertyId: string, rating: number) => void;
  userRating?: number;
}

export const PropertyModal = ({ 
  property, 
  isOpen, 
  onClose, 
  onRatingSubmit, 
  userRating = 0 
}: PropertyModalProps) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !property) return null;

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Crore`;
    }
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lakh`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const handleStarClick = (rating: number) => {
    onRatingSubmit(property.id, rating);
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
        size={20}
        onClick={interactive ? () => handleStarClick(i + 1) : undefined}
        onMouseEnter={interactive ? () => setHoveredStar(i + 1) : undefined}
        onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
      />
    ));
  };

  const handleWhatsAppShare = () => {
    const message = `Check out this property: ${property.title} - ${formatPrice(property.price)} at ${property.location}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleContactWhatsApp = () => {
    const message = `Hi! I'm interested in the property: ${property.title} located at ${property.location}. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-luxury rounded-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 btn-glass p-2 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Property Image */}
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
          />
          <div className="absolute bottom-4 left-4 glass px-4 py-2 rounded-lg">
            <span className="text-white font-bold text-xl">
              {formatPrice(property.price)}
            </span>
            {property.category === 'rent' && (
              <span className="text-white/80 text-sm ml-1">/month</span>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* Property Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {property.title}
                </h2>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="text-lg">{property.location}</span>
                </div>
              </div>
              <div className="btn-gold px-4 py-2 rounded-full text-sm font-semibold">
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </div>
            </div>

            {/* Property Features */}
            <div className="flex items-center space-x-6 text-muted-foreground">
              {property.bedrooms && (
                <div className="flex items-center space-x-2">
                  <Bed className="w-5 h-5" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center space-x-2">
                  <Bath className="w-5 h-5" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
              )}
              {property.parking && (
                <div className="flex items-center space-x-2">
                  <Car className="w-5 h-5" />
                  <span>Parking Available</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <span>{property.area} sq ft</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Features & Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="glass px-3 py-2 rounded-lg text-sm text-foreground">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rating Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Rating</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="star-rating">
                    {renderStars(property.rating)}
                  </div>
                  <span className="text-foreground font-semibold">
                    {property.rating.toFixed(1)} out of 5
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Rate this property:</p>
                <div className="star-rating">
                  {renderStars(userRating, true)}
                </div>
                {userRating > 0 && (
                  <p className="text-sm text-primary mt-2">
                    You rated this property {userRating} star{userRating > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleContactWhatsApp}
              className="btn-gold flex items-center justify-center space-x-2 flex-1"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contact on WhatsApp</span>
            </button>
            
            <button
              onClick={handleWhatsAppShare}
              className="btn-glass flex items-center justify-center space-x-2 flex-1"
            >
              <Share className="w-5 h-5" />
              <span>Share Property</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};