import { Property } from '@/types/property';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';
import property4 from '@/assets/property-4.jpg';
import property5 from '@/assets/property-5.jpg';
import property6 from '@/assets/property-6.jpg';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury Modern Villa with Pool',
    description: 'Stunning contemporary villa featuring floor-to-ceiling windows, open-plan living, private swimming pool, and beautifully manicured gardens. Perfect for luxury living with premium finishes throughout.',
    price: 45000000,
    location: 'Bandra West, Mumbai',
    type: 'villa',
    category: 'buy',
    image: property1,
    bedrooms: 4,
    bathrooms: 3,
    area: 3500,
    parking: true,
    rating: 4.8,
    features: [
      'Swimming Pool',
      'Garden',
      'Modern Kitchen',
      'Floor-to-ceiling Windows',
      'Security System',
      'Garage',
      'Air Conditioning',
      'High-speed Internet'
    ]
  },
  {
    id: '2',
    title: 'Premium Apartment with City Views',
    description: 'Elegant apartment in a prestigious building with panoramic city views. Features marble finishes, modern amenities, and access to building facilities including gym and rooftop garden.',
    price: 85000,
    location: 'Powai, Mumbai',
    type: 'apartment',
    category: 'rent',
    image: property2,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    parking: true,
    rating: 4.6,
    features: [
      'City Views',
      'Gym Access',
      'Rooftop Garden',
      'Marble Finishes',
      'Modern Kitchen',
      'Balcony',
      'Swimming Pool Access',
      'Security'
    ]
  },
  {
    id: '3',
    title: 'Commercial Office Building',
    description: 'Modern commercial office space in prime business district. Ideal for corporate headquarters with contemporary design, high-speed elevators, and excellent connectivity to transportation.',
    price: 120000000,
    location: 'BKC, Mumbai',
    type: 'commercial',
    category: 'buy',
    image: property3,
    area: 15000,
    parking: true,
    rating: 4.5,
    features: [
      'Prime Location',
      'High-speed Elevators',
      'Modern Design',
      'Conference Rooms',
      'Reception Area',
      'Parking Facility',
      'Security System',
      'Business Center'
    ]
  },
  {
    id: '4',
    title: 'Penthouse with Terrace',
    description: 'Exclusive penthouse with private terrace offering spectacular city skyline views. Features luxury finishes, spacious layouts, and premium amenities for the discerning buyer.',
    price: 180000,
    location: 'Worli, Mumbai',
    type: 'apartment',
    category: 'rent',
    image: property4,
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    parking: true,
    rating: 4.9,
    features: [
      'Private Terrace',
      'City Skyline Views',
      'Luxury Finishes',
      'Spacious Layout',
      'Premium Kitchen',
      'Master Suite',
      'Parking',
      'Concierge Service'
    ]
  },
  {
    id: '5',
    title: 'Grand Villa with Driveway',
    description: 'Impressive villa with grand entrance, circular driveway, and mature landscaping. Perfect for entertaining with multiple living areas, formal dining, and extensive outdoor spaces.',
    price: 65000000,
    location: 'Juhu, Mumbai',
    type: 'villa',
    category: 'buy',
    image: property5,
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    parking: true,
    rating: 4.7,
    features: [
      'Circular Driveway',
      'Mature Landscaping',
      'Multiple Living Areas',
      'Formal Dining',
      'Outdoor Spaces',
      'Security Gate',
      'Staff Quarters',
      'Entertainment Area'
    ]
  },
  {
    id: '6',
    title: 'Modern Residential Complex',
    description: 'Contemporary apartment in a well-designed residential complex with modern amenities. Features include clubhouse, swimming pool, and 24/7 security in a family-friendly environment.',
    price: 25000000,
    location: 'Thane, Mumbai',
    type: 'apartment',
    category: 'buy',
    image: property6,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    parking: true,
    rating: 4.4,
    features: [
      'Clubhouse',
      'Swimming Pool',
      '24/7 Security',
      'Kids Play Area',
      'Gym Facility',
      'Garden',
      'Power Backup',
      'Water Supply'
    ]
  },
  // Additional properties for rent category
  {
    id: '7',
    title: 'Serviced Executive Suite',
    description: 'Fully furnished executive suite in premium location with hotel-like services. Perfect for corporate executives and business professionals seeking luxury accommodation.',
    price: 120000,
    location: 'Andheri East, Mumbai',
    type: 'apartment',
    category: 'rent',
    image: property2,
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    parking: true,
    rating: 4.3,
    features: [
      'Fully Furnished',
      'Hotel Services',
      'Business Center',
      'Housekeeping',
      'WiFi',
      'Concierge',
      'Laundry Service',
      'Kitchen'
    ]
  },
  {
    id: '8',
    title: 'Co-working Office Space',
    description: 'Modern co-working space with flexible lease terms. Includes meeting rooms, high-speed internet, and professional environment perfect for startups and small businesses.',
    price: 45000,
    location: 'Lower Parel, Mumbai',
    type: 'office',
    category: 'rent',
    image: property3,
    area: 500,
    parking: false,
    rating: 4.2,
    features: [
      'Flexible Terms',
      'Meeting Rooms',
      'High-speed Internet',
      'Professional Environment',
      'Reception Services',
      'Coffee Bar',
      'Printing Facility',
      'Storage'
    ]
  }
];