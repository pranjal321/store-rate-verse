import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Star, MapPin, Phone, Globe, CalendarDays, Store as StoreIcon, ArrowLeft } from 'lucide-react';
import StarHalf from '@/components/StarHalf';

const mockStoreDetails = {
  id: 1,
  name: 'Tech Haven',
  description: 'Your one-stop shop for all things technology. From the latest smartphones to cutting-edge laptops and smart home devices, we have everything a tech enthusiast could want.',
  category: 'Electronics',
  address: '123 Innovation Drive, Silicon Valley, CA',
  phone: '(555) 123-4567',
  website: 'www.techhaven.com',
  hours: 'Mon-Sat: 9AM-9PM, Sun: 10AM-6PM',
  avgRating: 4.5,
  totalRatings: 120,
  userRating: 4
};

const mockReviews = [
  { id: 1, userName: 'John Smith', rating: 5, comment: 'Great selection of products and excellent customer service!', date: '2 weeks ago' },
  { id: 2, userName: 'Emma Johnson', rating: 4, comment: 'Very good store, but prices are a bit high.', date: '1 month ago' },
  { id: 3, userName: 'Michael Davis', rating: 5, comment: 'The staff is incredibly knowledgeable and helpful. Always my go-to place for tech needs.', date: '2 months ago' },
  { id: 4, userName: 'Sophia Brown', rating: 3, comment: 'Decent store but they were out of stock on what I needed.', date: '3 months ago' },
  { id: 5, userName: 'James Wilson', rating: 5, comment: 'Best tech store in the area! I always find what I need here.', date: '3 months ago' },
];

const StoreDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [store, setStore] = useState(mockStoreDetails);
  const [reviews, setReviews] = useState(mockReviews);
  const [userRating, setUserRating] = useState<number | null>(store.userRating);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(userRating || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'sm') => {
    const sizePx = size === 'sm' ? 4 : size === 'md' ? 5 : 6;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className={`w-${sizePx} h-${sizePx} fill-amber-500 text-amber-500`} />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className={`w-${sizePx} h-${sizePx} fill-amber-500 text-amber-500`} />);
    }
    
    const emptyStars = 5 - (fullStars + (hasHalfStar ? 1 : 0));
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className={`w-${sizePx} h-${sizePx} text-gray-300`} />);
    }
    
    return stars;
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmitRating = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setUserRating(selectedRating);
      setIsRatingDialogOpen(false);
      setIsSubmitting(false);
      
      setStore(prev => ({ ...prev, userRating: selectedRating }));
      
      toast({ 
        title: 'Rating Submitted', 
        description: `You've rated ${store.name} ${selectedRating} stars!` 
      });
    }, 1000);
  };

  return (
    <div>
      <Button 
        variant="ghost" 
        className="mb-4 p-0 h-auto font-normal" 
        onClick={() => navigate('/user/stores')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Stores
      </Button>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="bg-blue-100 p-6 rounded-lg">
              <StoreIcon className="h-16 w-16 text-blue-700" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{store.name}</h1>
                  <div className="mt-1 flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {store.address}
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end">
                  <div className="flex items-center">
                    <span className="text-xl font-bold mr-2">{store.avgRating}</span>
                    <div className="flex">
                      {renderStars(store.avgRating, 'md')}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{store.totalRatings} ratings</p>
                </div>
              </div>

              <p className="mt-4 text-gray-700">{store.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{store.website}</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{store.hours}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
                {userRating ? (
                  <div className="flex items-center bg-blue-50 px-4 py-2 rounded-md">
                    <div className="mr-2">
                      <span className="text-blue-700 font-medium">Your rating:</span>
                    </div>
                    <div className="flex">
                      {renderStars(userRating, 'md')}
                    </div>
                  </div>
                ) : null}
                
                <Button 
                  variant={userRating ? "outline" : "default"}
                  onClick={() => setIsRatingDialogOpen(true)}
                >
                  {userRating ? 'Update Rating' : 'Rate This Store'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="pb-4 border-b border-gray-100 last:border-none">
                <div className="flex items-start space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {review.userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{review.userName}</p>
                        <div className="flex mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate {store.name}</DialogTitle>
            <DialogDescription>
              Share your experience with this store. Your rating helps others make informed decisions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex flex-col items-center">
              <div className="flex space-x-2 mb-6">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRatingClick(rating)}
                    className="p-1 rounded-full focus:outline-none"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        rating <= selectedRating 
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center font-medium">
                {selectedRating === 1 && 'Poor'}
                {selectedRating === 2 && 'Fair'}
                {selectedRating === 3 && 'Good'}
                {selectedRating === 4 && 'Very Good'}
                {selectedRating === 5 && 'Excellent'}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRatingDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitRating}
              disabled={selectedRating === 0 || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Rating'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoreDetails;
