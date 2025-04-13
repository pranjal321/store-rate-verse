
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Store, Star, TrendingUp } from 'lucide-react';

// Mock data for the dashboard
const mockStats = {
  totalUsers: 234,
  totalStores: 152,
  totalRatings: 1863,
  recentActivity: 27,
};

const mockChartData = [
  { name: 'Jan', users: 4, stores: 5, ratings: 24 },
  { name: 'Feb', users: 6, stores: 3, ratings: 28 },
  { name: 'Mar', users: 8, stores: 7, ratings: 30 },
  { name: 'Apr', users: 12, stores: 8, ratings: 48 },
  { name: 'May', users: 18, stores: 12, ratings: 56 },
  { name: 'Jun', users: 24, stores: 16, ratings: 87 },
];

const mockRecentActivity = [
  { id: 1, type: 'user', action: 'New user registered', time: '2 hours ago' },
  { id: 2, type: 'store', action: 'New store added', time: '4 hours ago' },
  { id: 3, type: 'rating', action: 'New rating submitted', time: '6 hours ago' },
  { id: 4, type: 'user', action: 'User profile updated', time: '1 day ago' },
  { id: 5, type: 'store', action: 'Store information updated', time: '1 day ago' },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-bold">{mockStats.totalUsers}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Store className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Stores</p>
                <h3 className="text-2xl font-bold">{mockStats.totalStores}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Ratings</p>
                <h3 className="text-2xl font-bold">{mockStats.totalRatings}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recent Activity</p>
                <h3 className="text-2xl font-bold">{mockStats.recentActivity}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Growth Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" stackId="a" fill="#3b82f6" name="Users" />
                  <Bar dataKey="stores" stackId="a" fill="#10b981" name="Stores" />
                  <Bar dataKey="ratings" stackId="a" fill="#f59e0b" name="Ratings" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 border-b pb-3 last:border-b-0">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'user' ? 'bg-blue-100' : 
                    activity.type === 'store' ? 'bg-green-100' : 'bg-amber-100'
                  }`}>
                    {activity.type === 'user' && <Users className="h-4 w-4 text-blue-700" />}
                    {activity.type === 'store' && <Store className="h-4 w-4 text-green-700" />}
                    {activity.type === 'rating' && <Star className="h-4 w-4 text-amber-700" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
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

export default AdminDashboard;
