
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, StarHalf, Store, Map, Search } from 'lucide-react';

// Mock data for recent ratings
const mockRecentRatings = [
  { id: 1, storeName: 'Coffee Hub', address: '123 Main Street, Cityville', rating: 4, date: '2 days ago' },
  { id: 2, storeName: 'Tech Gadgets Plus', address: '456 Market Avenue, Townsburg', rating: 5, date: '1 week ago' },
  { id: 3, storeName: 'Fresh Grocery', address: '789 Park Road, Villageton', rating: 3, date: '2 weeks ago' },
];

// Mock data for recommended stores
const mockRecommendedStores = [
  { id: 1, name: 'Bookworm Paradise', category: 'Bookstore', avgRating: 4.8, totalRatings: 124 },
  { id: 2, name: 'Gourmet Delights', category: 'Restaurant', avgRating: 4.6, totalRatings: 98 },
  { id: 3, name: 'Fashion Forward', category: 'Clothing', avgRating: 4.5, totalRatings: 87 },
  { id: 4, name: 'Home Essentials', category: 'Home Goods', avgRating: 4.3, totalRatings: 65 },
];

const UserDashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Fetch user information from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-amber-500 text-amber-500" />);
    }
    
    // Half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-amber-500 text-amber-500" />);
    }
    
    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
        <Link to="/user/stores">
          <Button className="mt-3 sm:mt-0">
            <Search className="mr-2 h-4 w-4" />
            Find Stores
          </Button>
        </Link>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Your Recent Ratings */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5 text-amber-500" />
              Your Recent Ratings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockRecentRatings.length > 0 ? (
              <div className="space-y-4">
                {mockRecentRatings.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.storeName}</h3>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <Map className="h-3 w-3 mr-1" />
                          {item.address}
                        </div>
                      </div>
                      <div className="flex">
                        {renderStars(item.rating)}
                      </div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <span className="text-xs text-gray-500">{item.date}</span>
                      <Link to={`/user/ratings/${item.id}`}>
                        <Button variant="link" size="sm" className="h-6 p-0">
                          Edit Rating
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Star className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>You haven't rated any stores yet.</p>
                <Link to="/user/stores">
                  <Button variant="link">Find stores to rate</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Stores */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Store className="mr-2 h-5 w-5 text-blue-500" />
              Recommended Stores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecommendedStores.map((store) => (
                <Link key={store.id} to={`/user/stores/${store.id}`}>
                  <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{store.name}</h3>
                        <Badge variant="secondary" className="mt-1">
                          {store.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end">
                          <span className="font-medium text-amber-500 mr-1">{store.avgRating}</span>
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        </div>
                        <div className="text-xs text-gray-500">
                          {store.totalRatings} ratings
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="pt-2 text-center">
                <Link to="/user/stores">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Stores
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
