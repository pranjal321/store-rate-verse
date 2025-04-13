
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from '@/components/ui/dialog';

type StoreFormProps = {
  formData: {
    name: string;
    address: string;
    category: string;
    phone: string;
    website: string;
    ownerId: string;
  };
  errors: Record<string, string>;
  storeCategories: string[];
  storeOwners: any[];
  isAddMode: boolean;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { value: string, name: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const StoreForm = ({
  formData,
  errors,
  storeCategories,
  storeOwners,
  isAddMode,
  onClose,
  onChange,
  onSubmit
}: StoreFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Store Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter store name"
          value={formData.name}
          onChange={onChange}
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
          onValueChange={(value) => onChange({ name: 'category', value })}
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
          onChange={onChange}
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
          onChange={onChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          placeholder="Enter website URL"
          value={formData.website}
          onChange={onChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ownerId">Store Owner</Label>
        <Select 
          value={formData.ownerId} 
          onValueChange={(value) => onChange({ name: 'ownerId', value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select store owner" />
          </SelectTrigger>
          <SelectContent>
            {storeOwners.map((owner) => (
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
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit">
          {isAddMode ? 'Add Store' : 'Save Changes'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default StoreForm;
