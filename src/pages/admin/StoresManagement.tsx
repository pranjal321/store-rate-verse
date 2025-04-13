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
  Store, 
  PlusCircle, 
  Search, 
  Edit, 
  Trash2,
  Eye,
  MapPin,
  Phone,
  Globe,
  Star
} from 'lucide-react';
import StarHalf from '@/components/StarHalf';

// Mock stores data
const mockStores = [
  { id: 1, name: 'Tech Gadgets Plus', address: '123 Tech Boulevard, Silicon Valley, CA 94025', category: 'Electronics', phone: '(555) 123-4567', website: 'www.techgadgetsplus.com', avgRating: 4.5, totalRatings: 120, ownerId: 3 },
  { id: 2, name: 'Fresh Grocery Market', address: '456 Farmer Lane, Greenfield, OR 97403', category: 'Grocery', phone: '(555) 234-5678', website: 'www.freshgrocerymarket.com', avgRating: 4.2, totalRatings: 85, ownerId: 6 },
  { id: 3, name: 'Fashion Forward', address: '789 Style Street, Trendy Town, NY 10001', category: 'Clothing', phone: '(555) 345-6789', website: 'www.fashionforward.com', avgRating: 4.7, totalRatings: 150, ownerId: 9 },
  { id: 4, name: 'Home Essentials', address: '101 Comfort Lane, Homely Hills, FL 33101', category: 'Home Goods', phone: '(555) 456-7890', website: 'www.homeessentials.com', avgRating: 3.9, totalRatings: 70, ownerId: 12 },
  { id: 5, name: 'Bookworm Paradise', address: '202 Reading Road, Literary Lane, WA 98001', category: 'Books', phone: '(555) 567-8901', website: 'www.bookwormparadise.com', avgRating: 4.8, totalRatings: 95, ownerId: 15 },
  { id: 6, name: 'Sports Zone', address: '303 Athletic Avenue, Fitness Field, CO 80001', category: 'Sporting Goods', phone: '(555) 678-9012', website: 'www.sportszone.com', avgRating: 4.3, totalRatings: 65, ownerId: 18 },
  { id: 7, name: 'Pet Palace', address: '404 Furry Friends Blvd, Petville, OR 97401', category: 'Pet Supplies', phone: '(555) 789-0123', website: 'www.petpalace.com', avgRating: 4.6, totalRatings: 78, ownerId: 21 },
  { id: 8, name: 'Gourmet Delights', address: '505 Flavor Drive, Tastetown, IL 60007', category: 'Food & Dining', phone: '(555) 890-1234', website: 'www.gourmetdelights.com', avgRating: 4.9, totalRatings: 200, ownerId: 24 },
];

// Store categories
const storeCategories = [
  'Electronics',
  'Grocery',
  'Clothing',
  'Home Goods',
  'Books',
  'Sporting Goods',
  'Pet Supplies',
  'Food & Dining',
  'Health & Beauty',
  'Toys & Games',
  'Furniture',
  'Automotive',
  'Jewelry',
  'Office Supplies',
  'Other'
];

// Mock store owners (a subset of users with role 'store_owner')
const mockStoreOwners = [
  { id: 3, name: 'Tech Gadgets Inc.', email: 'info@techgadgets.com' },
  { id: 6, name: 'Gourmet Foods', email: 'contact@gourmetfoods.com' },
  { id: 9, name: 'Style Masters', email: 'support@stylemasters.com' },
  { id: 12, name: 'Home Living LLC', email: 'info@homeliving.com' },
  { id: 15, name: 'Book Haven', email: 'hello@bookhaven.com' },
  { id: 18, name: 'Active Sports Co.', email: 'contact@activesports.com' },
  { id: 21, name: 'Pet Lovers Inc.', email: 'care@petlovers.com' },
  { id: 24, name: 'Taste Creators', email: 'hello@tastecreators.com' },
];

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

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-amber-500 text-amber-500" />);
    }
    
    // Half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-amber-500 text-amber-500" />);
    }
    
    // Empty stars
    const emptyStars = 5 - (fullStars + (hasHalfStar ? 1 : 0));
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
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
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Address</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStores.length > 0 ? (
                filteredStores.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell className="font-medium">{store.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="secondary">{store.category}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                      {store.address}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">{store.avgRating.toFixed(1)}</span>
                        <Star className="h-4 w-4 text-amber-500" />
                        <span className="text-xs text-gray-500 ml-1">({store.totalRatings})</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStoreOwnerName(store.ownerId)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewStore(store)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditStore(store)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteStore(store)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Store className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500">No stores found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
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
          
          <form onSubmit={handleSubmitStore} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Store Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter store name"
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
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleChange({ name: 'category', value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {storeCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <div className="text-sm text-red-500">{errors.category}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter store address"
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
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                placeholder="Enter website URL"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ownerId">Store Owner</Label>
              <Select 
                value={formData.ownerId} 
                onValueChange={(value) => handleChange({ name: 'ownerId', value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select store owner" />
                </SelectTrigger>
                <SelectContent>
                  {mockStoreOwners.map((owner) => (
                    <SelectItem key={owner.id} value={owner.id.toString()}>
                      {owner.name} ({owner.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.ownerId && (
                <div className="text-sm text-red-500">{errors.ownerId}</div>
              )}
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsAddStoreOpen(false);
                  setIsEditStoreOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isAddStoreOpen ? 'Add Store' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Store Dialog */}
      <Dialog open={isViewStoreOpen} onOpenChange={setIsViewStoreOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Store Details</DialogTitle>
          </DialogHeader>
          
          {selectedStore && (
            <div className="space-y-4">
              <div className="flex flex-col items-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full mb-3">
                  <Store className="h-12 w-12 text-blue-700" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">{selectedStore.name}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {selectedStore.category}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <span>{selectedStore.address}</span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{selectedStore.phone}</span>
                </div>
                
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{selectedStore.website}</span>
                </div>
              </div>
              
              <div className="border-t border-b py-3 my-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Rating</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{selectedStore.avgRating.toFixed(1)}</span>
                    <div className="flex">
                      {renderStars(selectedStore.avgRating)}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      ({selectedStore.totalRatings} ratings)
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Store Owner</h4>
                <p className="font-medium">{getStoreOwnerName(selectedStore.ownerId)}</p>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsViewStoreOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setIsViewStoreOpen(false);
                  handleEditStore(selectedStore);
                }}>
                  Edit Store
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the store
              {selectedStore && <span className="font-medium"> {selectedStore.name}</span>} and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteStore} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StoresManagement;
