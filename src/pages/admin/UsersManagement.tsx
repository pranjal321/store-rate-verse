
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Search, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { mockUsers, User } from '@/data/mockUserData';
import UserList from '@/components/users/UserList';
import UserForm from '@/components/users/UserForm';
import UserDetails from '@/components/users/UserDetails';
import DeleteUserDialog from '@/components/users/DeleteUserDialog';

const UsersManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewUserOpen, setIsViewUserOpen] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  const handleAddUser = () => {
    setIsAddUserOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewUserOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitUser = (formData: any) => {
    if (isAddUserOpen) {
      const newUser = {
        id: users.length + 1,
        ...formData,
        storesRated: 0,
      };
      setUsers([...users, newUser]);
      toast({ title: 'Success', description: 'User has been added successfully' });
      setIsAddUserOpen(false);
    } else if (isEditUserOpen && selectedUser) {
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
      toast({ title: 'Success', description: 'User has been updated successfully' });
      setIsEditUserOpen(false);
    }
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      setIsDeleteDialogOpen(false);
      toast({ title: 'Success', description: 'User has been deleted successfully' });
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

      <UserList 
        users={filteredUsers}
        onView={handleViewUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      <Dialog 
        open={isAddUserOpen} 
        onOpenChange={(open) => {
          if (!open) setIsAddUserOpen(false);
        }}
      >
        <UserForm
          onSubmit={handleSubmitUser}
          onCancel={() => setIsAddUserOpen(false)}
        />
      </Dialog>

      <Dialog 
        open={isEditUserOpen} 
        onOpenChange={(open) => {
          if (!open) setIsEditUserOpen(false);
        }}
      >
        {selectedUser && (
          <UserForm
            user={selectedUser}
            onSubmit={handleSubmitUser}
            onCancel={() => setIsEditUserOpen(false)}
          />
        )}
      </Dialog>

      <Dialog 
        open={isViewUserOpen} 
        onOpenChange={setIsViewUserOpen}
      >
        {selectedUser && (
          <UserDetails
            user={selectedUser}
            onClose={() => setIsViewUserOpen(false)}
            onEdit={(user) => {
              setIsViewUserOpen(false);
              handleEditUser(user);
            }}
          />
        )}
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          {selectedUser && (
            <DeleteUserDialog
              userName={selectedUser.name}
              onConfirm={confirmDeleteUser}
            />
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UsersManagement;
