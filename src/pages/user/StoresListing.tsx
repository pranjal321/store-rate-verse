import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Search, MapPin } from 'lucide-react';
import StarHalf from '@/components/StarHalf';

// Mock data for stores
const mockStores = [
  { 
    id: 1, 
    name: 'Tech Haven', 
    address: '123 Innovation Drive, Silicon Valley, CA', 
    category: 'Electronics',
    avgRating: 4.5, 
    totalRatings: 120,
    userRating: 4
  },
  { 
    id: 2, 
    name: 'Fresh Market', 
    address: '456 Garden Avenue, Greenville, TX', 
    category: 'Grocery',
    avgRating: 4.2, 
    totalRatings: 85,
    userRating: null
  },
  { 
    id: 3, 
    name: 'Fashion Forward', 
    address: '789 Style Street, Trendy Town, NY', 
    category: 'Clothing',
    avgRating: 4.7, 
    totalRatings: 150,
    userRating: 5
  },
  { 
    id: 4, 
    name: 'Home Essentials', 
    address: '101 Comfort Lane, Homely Hills, FL', 
    category: 'Home Goods',
    avgRating: 3.9, 
    totalRatings: 70,
    userRating: 3
  },
  { 
    id: 5, 
    name: 'Bookworm Paradise', 
    address: '202 Reading Road, Literary Lane, WA', 
    category: 'Books',
    avgRating: 4.8, 
    totalRatings: 95,
    userRating: null
  },
  { 
    id: 6, 
    name: 'Sports Zone', 
    address: '303 Athletic Avenue, Fitness Field, CO', 
    category: 'Sporting Goods',
    avgRating: 4.3, 
    totalRatings: 65,
    userRating: null
  },
  { 
    id: 7, 
    name: 'Pet Palace', 
    address: '404 Furry Friends Blvd, Petville, OR', 
    category: 'Pet Supplies',
    avgRating: 4.6, 
    totalRatings: 78,
    userRating: 4
  },
  { 
    id: 8, 
    name: 'Gourmet Delights', 
    address: '505 Flavor Drive, Tastetown, IL', 
    category: 'Food & Dining',
    avgRating: 4.9, 
    totalRatings: 200,
    userRating: 5
  }
];

const StoresListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStores, setFilteredStores] = useState(mockStores);

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-amber-500 text-amber-500" />);
    }
    
    // Half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-amber-500 text-amber-500" />);
    }
    
    // Empty stars
    const emptyStars = 5 - (fullStars + (hasHalfStar ? 1 : 0));
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  // Filter stores based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredStores(mockStores);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = mockStores.filter(
        store => 
          store.name.toLowerCase().includes(term) || 
          store.address.toLowerCase().includes(term)
      );
      setFilteredStores(filtered);
    }
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Explore Stores</h1>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search by store name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stores Grid */}
      {filteredStores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStores.map((store) => (
            <Link key={store.id} to={`/user/stores/${store.id}`}>
              <Card className="h-full hover:border-blue-200 transition-colors cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex flex-col h-full">
                    <div className="mb-2 flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{store.name}</h3>
                      <Badge variant="outline">{store.category}</Badge>
                    </div>
                    
                    <div className="flex items-start mt-1 text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                      <span>{store.address}</span>
                    </div>
                    
                    <div className="flex justify-between items-end mt-auto pt-4">
                      <div className="flex items-center">
                        <span className="font-medium mr-1">{store.avgRating}</span>
                        <div className="flex">
                          {renderStars(store.avgRating)}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">({store.totalRatings})</span>
                      </div>
                      
                      {store.userRating !== null && (
                        <div className="flex items-center bg-blue-50 px-2 py-1 rounded-md">
                          <span className="text-xs text-blue-700 font-medium">Your rating: {store.userRating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <h3 className="text-lg font-medium">No stores found</h3>
          <p className="text-gray-500">Try a different search term</p>
        </div>
      )}
    </div>
  );
};

export default StoresListing;
