
import React from 'react';
import { User, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DialogHeader, DialogTitle, DialogContent } from '@/components/ui/dialog';
import { User as UserType } from '@/data/mockUserData';

type UserDetailsProps = {
  user: UserType;
  onClose: () => void;
  onEdit: (user: UserType) => void;
};

const UserDetails = ({ user, onClose, onEdit }: UserDetailsProps) => {
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
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>User Details</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4">
        <div className="flex flex-col items-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full mb-3">
            {user.role === 'store_owner' ? (
              <Store className="h-12 w-12 text-blue-700" />
            ) : (
              <User className="h-12 w-12 text-blue-700" />
            )}
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold">{user.name}</h3>
            {getRoleBadge(user.role)}
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Address</h4>
            <p>{user.address}</p>
          </div>
          {user.role === 'user' && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Stores Rated</h4>
              <p>{user.storesRated}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onEdit(user)}>
            Edit User
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default UserDetails;
