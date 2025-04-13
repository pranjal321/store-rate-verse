
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { Star, TrendingUp, Users, CalendarDays, BarChart3 } from 'lucide-react';

// Mock data for the store dashboard
const mockStoreData = {
  id: 1,
  name: "Bright Electronics",
  address: "123 Tech Drive, Innovation City, 94103",
  avgRating: 4.2,
  totalRatings: 87,
  totalRaters: 73,
};

// Mock data for rating distribution
const mockRatingDistribution = [
  { name: '5 Stars', value: 32 },
  { name: '4 Stars', value: 28 },
  { name: '3 Stars', value: 15 },
  { name: '2 Stars', value: 7 },
  { name: '1 Star', value: 5 },
];

// Colors for the pie chart
const COLORS = ['#22c55e', '#3b82f6', '#eab308', '#f97316', '#ef4444'];

// Mock data for monthly ratings
const mockMonthlyRatings = [
  { name: 'Jan', value: 7 },
  { name: 'Feb', value: 5 },
  { name: 'Mar', value: 9 },
  { name: 'Apr', value: 12 },
  { name: 'May', value: 8 },
  { name: 'Jun', value: 15 },
];

// Mock recent raters
const mockRecentRaters = [
  { id: 1, name: 'John Smith', rating: 5, comment: 'Excellent service and product quality!', date: '2 days ago' },
  { id: 2, name: 'Emma Wilson', rating: 4, comment: 'Very good selection of products.', date: '3 days ago' },
  { id: 3, name: 'Michael Brown', rating: 3, comment: 'Average experience, could improve customer service.', date: '5 days ago' },
  { id: 4, name: 'Sophia Davis', rating: 5, comment: 'Always find what I need here. Great store!', date: '1 week ago' },
  { id: 5, name: 'James Johnson', rating: 4, comment: 'Good prices and friendly staff.', date: '1 week ago' },
];

const StoreDashboard = () => {
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Store Dashboard</h1>

      {/* Store Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Store className="h-8 w-8 text-blue-700" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{mockStoreData.name}</h2>
              <p className="text-gray-500">{mockStoreData.address}</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{mockStoreData.avgRating}</span>
                <div className="flex">
                  {renderStars(Math.round(mockStoreData.avgRating))}
                </div>
              </div>
              <p className="text-sm text-gray-500">{mockStoreData.totalRatings} ratings from {mockStoreData.totalRaters} users</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <h3 className="text-2xl font-bold">{mockStoreData.avgRating}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Raters</p>
                <h3 className="text-2xl font-bold">{mockStoreData.totalRaters}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rating Trend</p>
                <h3 className="text-2xl font-bold">+12%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Recent Raters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Rating Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockRatingDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {mockRatingDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Ratings Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" />
              Monthly Ratings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockMonthlyRatings} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" name="Ratings" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Raters */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Raters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-72 overflow-y-auto">
              {mockRecentRaters.map((rater) => (
                <div key={rater.id} className="flex items-start space-x-3 border-b pb-3 last:border-b-0">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {rater.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{rater.name}</p>
                      <div className="flex">
                        {renderStars(rater.rating)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{rater.comment}</p>
                    <p className="text-xs text-gray-500 mt-1">{rater.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreDashboard;
