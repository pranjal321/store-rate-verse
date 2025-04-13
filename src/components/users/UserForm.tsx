
import React, { useState } from 'react';
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User } from '@/data/mockUserData';

type FormData = {
  name: string;
  email: string;
  address: string;
  role: string;
  password: string;
};

type UserFormProps = {
  user?: User;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
};

const UserForm = ({ user, onSubmit, onCancel }: UserFormProps) => {
  const isEditing = !!user;
  
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    role: user?.role || 'user',
    password: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
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

    if (!isEditing && formData.password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'Password must be 8-16 characters with at least one uppercase letter and one special character';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { value: string, name: string }) => {
    const { name, value } = 'target' in e ? e.target : e;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogDescription>
          {isEditing 
            ? 'Update the user details.' 
            : 'Fill in the details to create a new user.'}
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
        
        {!isEditing && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required={!isEditing}
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
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Save Changes' : 'Add User'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default UserForm;
