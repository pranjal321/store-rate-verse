
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store, MapPin, Phone, Globe, Star } from 'lucide-react';
import StarHalf from '@/components/StarHalf';

type StoreDetailsProps = {
  store: any;
  onClose: () => void;
  onEdit: () => void;
  getStoreOwnerName: (ownerId: number) => string;
};

const StoreDetails = ({ store, onClose, onEdit, getStoreOwnerName }: StoreDetailsProps) => {
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center mb-4">
        <div className="bg-blue-100 p-4 rounded-full mb-3">
          <Store className="h-12 w-12 text-blue-700" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold">{store.name}</h3>
          <Badge variant="secondary" className="mt-1">
            {store.category}
          </Badge>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
          <span>{store.address}</span>
        </div>
        
        <div className="flex items-center">
          <Phone className="h-5 w-5 text-gray-500 mr-2" />
          <span>{store.phone}</span>
        </div>
        
        <div className="flex items-center">
          <Globe className="h-5 w-5 text-gray-500 mr-2" />
          <span>{store.website}</span>
        </div>
      </div>
      
      <div className="border-t border-b py-3 my-3">
        <div className="flex justify-between items-center">
          <span className="font-medium">Rating</span>
          <div className="flex items-center">
            <span className="font-medium mr-2">{store.avgRating.toFixed(1)}</span>
            <div className="flex">
              {renderStars(store.avgRating)}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({store.totalRatings} ratings)
            </span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-500">Store Owner</h4>
        <p className="font-medium">{getStoreOwnerName(store.ownerId)}</p>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={onEdit}>
          Edit Store
        </Button>
      </div>
    </div>
  );
};

export default StoreDetails;
