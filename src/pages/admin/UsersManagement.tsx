import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Users, 
  PlusCircle, 
  Search, 
  Edit, 
  Trash2,
  Store,
  Eye
} from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St, Anytown, CA 94111', role: 'user', storesRated: 5 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', address: '456 Oak Ave, Somewhere, NY 10001', role: 'user', storesRated: 8 },
  { id: 3, name: 'Tech Gadgets Inc.', email: 'info@techgadgets.com', address: '789 Tech Blvd, Silicon Valley, CA 94043', role: 'store_owner', storesRated: 0 },
  { id: 4, name: 'Michael Johnson', email: 'michael.j@example.com', address: '101 Pine Rd, Elsewhere, TX 75001', role: 'admin', storesRated: 0 },
  { id: 5, name: 'Sarah Williams', email: 'sarah.w@example.com', address: '202 Cedar St, Nowhere, WA 98001', role: 'user', storesRated: 12 },
  { id: 6, name: 'Gourmet Foods', email: 'contact@gourmetfoods.com', address: '303 Culinary Ave, Foodtown, IL 60007', role: 'store_owner', storesRated: 0 },
  { id: 7, name: 'Robert Martinez', email: 'robert.m@example.com', address: '404 Elm St, Someplace, FL 33101', role: 'user', storesRated: 3 },
  { id: 8, name: 'Emily Brown', email: 'emily.b@example.com', address: '505 Maple Dr, Anywhere, CO 80001', role: 'user', storesRated: 7 },
];

const UsersManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewUserOpen, setIsViewUserOpen] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    role: 'user',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = users.filter(
        user => 
          user.name.toLowerCase().includes(term) || 
          user.email.toLowerCase().includes(term) ||
          user.address.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.name.length < 20) {
      newErrors.name = 'Name must be at least 20 characters';
    } else if (formData.name.length > 60) {
      newErrors.name = 'Name cannot exceed 60 characters';
    }

    if (formData.address.length > 400) {
      newErrors.address = 'Address cannot exceed 400 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!isEditUserOpen && formData.password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'Password must be 8-16 characters with at least one uppercase letter and one special character';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = () => {
    setFormData({
      name: '',
      email: '',
      address: '',
      role: 'user',
      password: '',
    });
    setErrors({});
    setIsAddUserOpen(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      password: '',
    });
    setErrors({});
    setIsEditUserOpen(true);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsViewUserOpen(true);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitUser = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (isAddUserOpen) {
      const newUser = {
        id: users.length + 1,
        ...formData,
        storesRated: 0,
      };
      setUsers([...users, newUser]);
      toast({ title: 'Success', description: 'User has been added successfully' });
    } else if (isEditUserOpen && selectedUser) {
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
      toast({ title: 'Success', description: 'User has been updated successfully' });
    }

    setIsAddUserOpen(false);
    setIsEditUserOpen(false);
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      setIsDeleteDialogOpen(false);
      toast({ title: 'Success', description: 'User has been deleted successfully' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { value: string, name: string }) => {
    const { name, value } = 'target' in e ? e.target : e;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Admin</Badge>;
      case 'store_owner':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Store Owner</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">User</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Button onClick={handleAddUser}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search users by name, email, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Address</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Stores Rated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                      {user.address}
                    </TableCell>
                    <TableCell>
                      {getRoleBadge(user.role)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {user.storesRated}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewUser(user)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500">No users found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={isAddUserOpen || isEditUserOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddUserOpen(false);
          setIsEditUserOpen(false);
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isAddUserOpen ? 'Add New User' : 'Edit User'}</DialogTitle>
            <DialogDescription>
              {isAddUserOpen 
                ? 'Fill in the details to create a new user.' 
                : 'Update the user details.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && (
                <div className="text-sm text-red-500">{errors.name}</div>
              )}
              <div className="text-xs text-gray-500">
                Must be between 20 and 60 characters
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <div className="text-sm text-red-500">{errors.email}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
              />
              {errors.address && (
                <div className="text-sm text-red-500">{errors.address}</div>
              )}
              <div className="text-xs text-gray-500">
                Maximum 400 characters
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => handleChange({ name: 'role', value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="store_owner">Store Owner</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {isAddUserOpen && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required={isAddUserOpen}
                />
                {errors.password && (
                  <div className="text-sm text-red-500">{errors.password}</div>
                )}
                <div className="text-xs text-gray-500">
                  8-16 characters with at least one uppercase letter and one special character
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsAddUserOpen(false);
                  setIsEditUserOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isAddUserOpen ? 'Add User' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewUserOpen} onOpenChange={setIsViewUserOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex flex-col items-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full mb-3">
                  {selectedUser.role === 'store_owner' ? (
                    <Store className="h-12 w-12 text-blue-700" />
                  ) : (
                    <User className="h-12 w-12 text-blue-700" />
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                  {getRoleBadge(selectedUser.role)}
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Address</h4>
                  <p>{selectedUser.address}</p>
                </div>
                {selectedUser.role === 'user' && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Stores Rated</h4>
                    <p>{selectedUser.storesRated}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsViewUserOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setIsViewUserOpen(false);
                  handleEditUser(selectedUser);
                }}>
                  Edit User
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user
              {selectedUser && <span className="font-medium"> {selectedUser.name}</span>} and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteUser} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UsersManagement;
