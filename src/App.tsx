
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// User pages
import UserDashboard from "./pages/user/UserDashboard";
import StoresListing from "./pages/user/StoresListing";
import StoreDetails from "./pages/user/StoreDetails";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersManagement from "./pages/admin/UsersManagement";
import StoresManagement from "./pages/admin/StoresManagement";

// Store owner pages
import StoreDashboard from "./pages/store/StoreDashboard";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

// Auth guard component to protect routes
const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole: string }) => {
  // Get user from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  
  // Check if user exists and has the required role
  if (!user || user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User routes */}
          <Route path="/user" element={
            <ProtectedRoute requiredRole="user">
              <DashboardLayout role="user" />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="stores" element={<StoresListing />} />
            <Route path="stores/:id" element={<StoreDetails />} />
            <Route path="ratings" element={<div>My Ratings</div>} />
            <Route path="profile" element={<div>User Profile</div>} />
            <Route index element={<Navigate to="/user/dashboard" replace />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout role="admin" />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="stores" element={<StoresManagement />} />
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
          </Route>

          {/* Store owner routes */}
          <Route path="/store" element={
            <ProtectedRoute requiredRole="store_owner">
              <DashboardLayout role="store_owner" />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<StoreDashboard />} />
            <Route path="profile" element={<div>Store Profile</div>} />
            <Route path="settings" element={<div>Store Settings</div>} />
            <Route index element={<Navigate to="/store/dashboard" replace />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
