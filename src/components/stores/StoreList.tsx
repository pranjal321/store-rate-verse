
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store, Eye, Edit, Trash2, Star } from 'lucide-react';

type StoreListProps = {
  stores: any[];
  searchTerm: string;
  onView: (store: any) => void;
  onEdit: (store: any) => void;
  onDelete: (store: any) => void;
  getStoreOwnerName: (ownerId: number) => string;
};

const StoreList = ({ 
  stores, 
  searchTerm,
  onView, 
  onEdit, 
  onDelete,
  getStoreOwnerName
}: StoreListProps) => {
  return (
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
          {stores.length > 0 ? (
            stores.map((store) => (
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
                    <Button variant="ghost" size="sm" onClick={() => onView(store)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onEdit(store)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(store)}>
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
  );
};

export default StoreList;
