
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-teal-50">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">StoreRateVerse</h1>
          <div className="space-x-2">
            <Link to="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                Discover and Rate Your Favorite Stores
              </h2>
              <p className="text-xl text-gray-600">
                Join our community to share your experiences and help others find the best stores around.
              </p>
              <div className="pt-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 mt-8 md:mt-0">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80" 
                  alt="Store ratings" 
                  className="w-full h-auto rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <Card>
              <CardHeader>
                <CardTitle>Find Stores</CardTitle>
                <CardDescription>Discover new places to shop and explore</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Browse through our extensive catalog of stores from various categories and locations.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Rate & Review</CardTitle>
                <CardDescription>Share your experience with the community</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Rate stores from 1 to 5 stars and help others make informed decisions.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Store Insights</CardTitle>
                <CardDescription>For store owners and administrators</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Access detailed analytics about your store's performance and customer feedback.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">© 2025 StoreRateVerse. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex gap-4">
              <a href="#" className="text-gray-300 hover:text-white">Terms</a>
              <a href="#" className="text-gray-300 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
