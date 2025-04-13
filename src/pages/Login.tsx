
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login authentication
    setTimeout(() => {
      // In a real app, you would validate credentials against your API
      // For now, we'll use some demo accounts to simulate different roles
      
      if (email === 'admin@example.com' && password === 'Admin@123') {
        // Admin login
        localStorage.setItem('user', JSON.stringify({ 
          id: '1', 
          name: 'Admin User', 
          email, 
          role: 'admin' 
        }));
        toast({ title: 'Success', description: 'Logged in as administrator' });
        navigate('/admin/dashboard');
      } else if (email === 'store@example.com' && password === 'Store@123') {
        // Store owner login
        localStorage.setItem('user', JSON.stringify({ 
          id: '2', 
          name: 'Store Owner', 
          email, 
          role: 'store_owner',
          storeId: '1' 
        }));
        toast({ title: 'Success', description: 'Logged in as store owner' });
        navigate('/store/dashboard');
      } else if (email === 'user@example.com' && password === 'User@123') {
        // Normal user login
        localStorage.setItem('user', JSON.stringify({ 
          id: '3', 
          name: 'Normal User', 
          email, 
          role: 'user' 
        }));
        toast({ title: 'Success', description: 'Logged in successfully' });
        navigate('/user/dashboard');
      } else {
        toast({ 
          title: 'Login Failed', 
          description: 'Invalid email or password. Try the demo accounts shown below.', 
          variant: 'destructive' 
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-teal-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h4 className="text-sm font-medium mb-2">Demo Accounts:</h4>
            <div className="text-xs space-y-1 text-gray-500">
              <p><span className="font-medium">Admin:</span> admin@example.com / Admin@123</p>
              <p><span className="font-medium">Store Owner:</span> store@example.com / Store@123</p>
              <p><span className="font-medium">User:</span> user@example.com / User@123</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 text-center">
            Back to home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
