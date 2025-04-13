
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Search, Store } from 'lucide-react';

// Import components
import StoreList from '@/components/stores/StoreList';
import StoreForm from '@/components/stores/StoreForm';
import StoreDetails from '@/components/stores/StoreDetails';
import DeleteStoreDialog from '@/components/stores/DeleteStoreDialog';

// Import mock data
import { mockStores, storeCategories, mockStoreOwners } from '@/data/mockStoreData';

const StoresManagement = () => {
  const { toast } = useToast();
  const [stores, setStores] = useState(mockStores);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStores, setFilteredStores] = useState(stores);
  
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false);
  const [isEditStoreOpen, setIsEditStoreOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewStoreOpen, setIsViewStoreOpen] = useState(false);
  
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    category: '',
    phone: '',
    website: '',
    ownerId: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter stores based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredStores(stores);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = stores.filter(
        store => 
          store.name.toLowerCase().includes(term) || 
          store.address.toLowerCase().includes(term) ||
          store.category.toLowerCase().includes(term)
      );
      setFilteredStores(filtered);
    }
  }, [searchTerm, stores]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation: 20-60 characters
    if (formData.name.length < 20) {
      newErrors.name = 'Name must be at least 20 characters';
    } else if (formData.name.length > 60) {
      newErrors.name = 'Name cannot exceed 60 characters';
    }

    // Address validation: Max 400 characters
    if (formData.address.length > 400) {
      newErrors.address = 'Address cannot exceed 400 characters';
    }

    // Basic validation for other fields
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.ownerId) {
      newErrors.ownerId = 'Please select a store owner';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddStore = () => {
    setFormData({
      name: '',
      address: '',
      category: '',
      phone: '',
      website: '',
      ownerId: '',
    });
    setErrors({});
    setIsAddStoreOpen(true);
  };

  const handleEditStore = (store: any) => {
    setSelectedStore(store);
    setFormData({
      name: store.name,
      address: store.address,
      category: store.category,
      phone: store.phone,
      website: store.website,
      ownerId: store.ownerId.toString(),
    });
    setErrors({});
    setIsEditStoreOpen(true);
  };

  const handleViewStore = (store: any) => {
    setSelectedStore(store);
    setIsViewStoreOpen(true);
  };

  const handleDeleteStore = (store: any) => {
    setSelectedStore(store);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitStore = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (isAddStoreOpen) {
      // Add new store
      const newStore = {
        id: stores.length + 1,
        ...formData,
        ownerId: parseInt(formData.ownerId),
        avgRating: 0,
        totalRatings: 0,
      };
      setStores([...stores, newStore]);
      toast({ title: 'Success', description: 'Store has been added successfully' });
    } else if (isEditStoreOpen && selectedStore) {
      // Update existing store
      const updatedStores = stores.map(store => 
        store.id === selectedStore.id ? { 
          ...store, 
          ...formData,
          ownerId: parseInt(formData.ownerId)
        } : store
      );
      setStores(updatedStores);
      toast({ title: 'Success', description: 'Store has been updated successfully' });
    }

    // Close dialogs
    setIsAddStoreOpen(false);
    setIsEditStoreOpen(false);
  };

  const confirmDeleteStore = () => {
    if (selectedStore) {
      const updatedStores = stores.filter(store => store.id !== selectedStore.id);
      setStores(updatedStores);
      setIsDeleteDialogOpen(false);
      toast({ title: 'Success', description: 'Store has been deleted successfully' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { value: string, name: string }) => {
    const { name, value } = 'target' in e ? e.target : e;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getStoreOwnerName = (ownerId: number) => {
    const owner = mockStoreOwners.find(owner => owner.id === ownerId);
    return owner ? owner.name : 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Stores Management</h1>
        <Button onClick={handleAddStore}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Store
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search stores by name, address, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stores Table */}
      <Card className="overflow-hidden">
        <StoreList
          stores={filteredStores}
          searchTerm={searchTerm}
          onView={handleViewStore}
          onEdit={handleEditStore}
          onDelete={handleDeleteStore}
          getStoreOwnerName={getStoreOwnerName}
        />
      </Card>

      {/* Add/Edit Store Dialog */}
      <Dialog open={isAddStoreOpen || isEditStoreOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddStoreOpen(false);
          setIsEditStoreOpen(false);
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isAddStoreOpen ? 'Add New Store' : 'Edit Store'}</DialogTitle>
            <DialogDescription>
              {isAddStoreOpen 
                ? 'Fill in the details to create a new store.' 
                : 'Update the store details.'}
            </DialogDescription>
          </DialogHeader>
          
          <StoreForm
            formData={formData}
            errors={errors}
            storeCategories={storeCategories}
            storeOwners={mockStoreOwners}
            isAddMode={isAddStoreOpen}
            onClose={() => {
              setIsAddStoreOpen(false);
              setIsEditStoreOpen(false);
            }}
            onChange={handleChange}
            onSubmit={handleSubmitStore}
          />
        </DialogContent>
      </Dialog>

      {/* View Store Dialog */}
      <Dialog open={isViewStoreOpen} onOpenChange={setIsViewStoreOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Store Details</DialogTitle>
          </DialogHeader>
          
          {selectedStore && (
            <StoreDetails
              store={selectedStore}
              onClose={() => setIsViewStoreOpen(false)}
              onEdit={() => {
                setIsViewStoreOpen(false);
                handleEditStore(selectedStore);
              }}
              getStoreOwnerName={getStoreOwnerName}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          {selectedStore && (
            <DeleteStoreDialog
              storeName={selectedStore.name}
              onConfirm={confirmDeleteStore}
            />
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StoresManagement;
