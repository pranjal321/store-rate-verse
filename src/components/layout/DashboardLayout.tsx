
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  LayoutDashboard, Users, Store, Star, LogOut, Menu, X, User, Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type UserRole = 'admin' | 'store_owner' | 'user';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const DashboardLayout = ({ role }: { role: UserRole }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Define navigation items based on user role
  const getNavItems = (): NavItem[] => {
    if (role === 'admin') {
      return [
        { title: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { title: 'Users', path: '/admin/users', icon: <Users size={20} /> },
        { title: 'Stores', path: '/admin/stores', icon: <Store size={20} /> },
      ];
    } else if (role === 'store_owner') {
      return [
        { title: 'Dashboard', path: '/store/dashboard', icon: <LayoutDashboard size={20} /> },
        { title: 'Profile', path: '/store/profile', icon: <User size={20} /> },
        { title: 'Settings', path: '/store/settings', icon: <Settings size={20} /> },
      ];
    } else {
      return [
        { title: 'Dashboard', path: '/user/dashboard', icon: <LayoutDashboard size={20} /> },
        { title: 'Stores', path: '/user/stores', icon: <Store size={20} /> },
        { title: 'My Ratings', path: '/user/ratings', icon: <Star size={20} /> },
        { title: 'Profile', path: '/user/profile', icon: <User size={20} /> },
      ];
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }

    // Verify user has correct role
    const userData = JSON.parse(userStr) as User;
    if (userData.role !== role) {
      toast({ 
        title: 'Access Denied', 
        description: 'You do not have permission to access this page', 
        variant: 'destructive' 
      });
      navigate('/login');
      return;
    }

    setUser(userData);

    // Handle mobile responsiveness
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate, role, toast]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({ title: 'Logged out', description: 'You have been logged out successfully' });
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) return null;

  const navItems = getNavItems();
  const currentPath = window.location.pathname;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <button onClick={toggleSidebar} className="text-gray-700">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="text-lg font-semibold text-blue-700">StoreRateVerse</div>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-blue-600 text-white">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 flex-shrink-0 md:w-64 fixed md:static inset-y-0 left-0 z-10 transition-transform duration-300 ease-in-out",
          isMobile && !isSidebarOpen && "-translate-x-full md:translate-x-0"
        )}
        style={{ 
          width: '16rem',
          maxWidth: '100%',
          top: isMobile ? '60px' : '0',
          height: isMobile ? 'calc(100% - 60px)' : '100%',
        }}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Sidebar Header (only on desktop) */}
          <div className="p-6 border-b border-gray-200 hidden md:block">
            <Link to="/" className="text-xl font-bold text-blue-700">StoreRateVerse</Link>
          </div>
          
          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-blue-600 text-white">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">
                  {role === 'admin' ? 'Administrator' : role === 'store_owner' ? 'Store Owner' : 'User'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                      currentPath === item.path
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              className="w-full flex items-center space-x-2 justify-center" 
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isMobile && isSidebarOpen && "opacity-50 md:opacity-100"
      )}>
        {/* Optional overlay for mobile */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-0"
            onClick={toggleSidebar}
          />
        )}
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
