import { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { FilterState } from '@/types/property';

interface FilterSectionProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const FilterSection = ({ filters, onFiltersChange }: FilterSectionProps) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'plot', label: 'Plot' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'office', label: 'Office' }
  ];

  const locations = [
    { value: '', label: 'All Locations' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' }
  ];

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="filter-section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Find Your Perfect Property</h2>
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="btn-glass flex items-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Property Type</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            {propertyTypes.map(type => (
              <option key={type.value} value={type.value} className="bg-input text-foreground">
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Location</label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            {locations.map(location => (
              <option key={location.value} value={location.value} className="bg-input text-foreground">
                {location.label}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Min Price (₹)</label>
          <input
            type="number"
            value={filters.minPrice || ''}
            onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || 0)}
            placeholder="0"
            className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Max Price (₹)</label>
          <input
            type="number"
            value={filters.maxPrice || ''}
            onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || 0)}
            placeholder="No limit"
            className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mt-6 pt-6 border-t border-border animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Min Area (sq ft)</label>
              <input
                type="number"
                placeholder="e.g. 1000"
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Bedrooms</label>
              <select className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                <option value="" className="bg-input text-foreground">Any</option>
                <option value="1" className="bg-input text-foreground">1 BHK</option>
                <option value="2" className="bg-input text-foreground">2 BHK</option>
                <option value="3" className="bg-input text-foreground">3 BHK</option>
                <option value="4" className="bg-input text-foreground">4+ BHK</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Bathrooms</label>
              <select className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                <option value="" className="bg-input text-foreground">Any</option>
                <option value="1" className="bg-input text-foreground">1</option>
                <option value="2" className="bg-input text-foreground">2</option>
                <option value="3" className="bg-input text-foreground">3+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Parking</label>
              <select className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                <option value="" className="bg-input text-foreground">Any</option>
                <option value="yes" className="bg-input text-foreground">Required</option>
                <option value="no" className="bg-input text-foreground">Not Required</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};